import React, { useEffect, useState } from "react";
import { useProfile } from "../context/profileContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Nav from "../components/Chat/Nav";
import OnlineUsersList from "../components/Chat/OnlineUsersList";
import TopBar from "../components/Chat/TopBar";
import ChatMessages from "../components/Chat/ChatMessages";
import MessageInputForm from "../components/Chat/MessageInputForm";

import { socketUrl } from "../../apiConfig";

const ChatHome = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { userDetails } = useProfile();
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  // Connect to WebSocket
  const connectToWebSocket = () => {
    const socket = new WebSocket(socketUrl);

    socket.addEventListener("message", handleMessage);
    socket.addEventListener("close", () => {
      setTimeout(connectToWebSocket, 1000); // retry on disconnect
    });

    setWs(socket);
  };

  useEffect(() => {
    connectToWebSocket();
    checkAuth();
    if (!isAuthenticated) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUserId) return;
      try {
        const res = await axios.get(`/api/user/messages/${selectedUserId}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [selectedUserId]);

  // Fetch offline users
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await axios.get("/api/user/people");
        const offlineArr = res.data
          .filter((p) => p._id !== userDetails?._id)
          .filter((p) => !onlinePeople[p._id]);

        const offlineMap = offlineArr.reduce((acc, p) => {
          acc[p._id] = p;
          return acc;
        }, {});

        setOfflinePeople(offlineMap);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPeople();
  }, [onlinePeople, userDetails]);

  // Handle WebSocket messages
  const handleMessage = (ev) => {
    const data = JSON.parse(ev.data);
    if (data.online) {
      const people = {};
      data.online.forEach(({ userId, username, avatarLink }) => {
        if (userId !== userDetails?._id) {
          people[userId] = { username, avatarLink };
        }
      });
      setOnlinePeople(people);
    } else if (data.text && data.sender === selectedUserId) {
      setMessages((prev) => [...prev, data]);
    }
  };

  const sendMessage = (ev) => {
    if (ev) ev.preventDefault();
    if (!ws || !selectedUserId || !newMessage) return;

    const messageObj = {
      text: newMessage,
      recipient: selectedUserId,
    };

    ws.send(JSON.stringify(messageObj));

    setMessages((prev) => [
      ...prev,
      { ...messageObj, sender: userDetails._id, _id: Date.now() },
    ]);

    setNewMessage("");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Nav />
      <OnlineUsersList
        onlinePeople={onlinePeople}
        offlinePeople={offlinePeople}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />

      <section className="w-[71%] lg:w-[62%] relative pb-10">
        {selectedUserId && (
          <TopBar
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            offlinePeople={offlinePeople}
            onlinePeople={onlinePeople}
          />
        )}

        <ChatMessages
          messages={messages}
          userDetails={userDetails}
          selectedUserId={selectedUserId}
        />

        <div className="absolute w-full bottom-0 flex justify-center">
          <MessageInputForm
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            selectedUserId={selectedUserId}
          />
        </div>
      </section>
    </div>
  );
};

export default ChatHome;
