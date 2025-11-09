import React, { useEffect, useRef } from "react";

const ChatMessages = ({ messages, userDetails, selectedUserId }) => {
  const messagesContainerRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      ref={messagesContainerRef}
      className="absolute bottom-24 w-full px-7 lg:px-20 left-0 overflow-y-auto max-h-[calc(100vh-6rem)]"
    >
      {selectedUserId && messages.length > 0 ? (
        <div className="flex flex-col gap-2">
          {messages.map((message) => {
            const isSender = message.sender === userDetails._id;
            return (
              <div
                key={message._id}
                className={`relative group px-5 py-3 max-w-[500px] break-words ${
                  isSender
                    ? "bg-primarySecond self-end rounded-l-2xl rounded-b-2xl"
                    : "bg-primary self-start rounded-r-2xl rounded-b-2xl"
                } text-white`}
              >
                <div>{message.text}</div>
                {/* Triangle pointer for messages */}
                <div
                  className={`absolute top-0 w-0 h-0 border-b-[20px] border-b-transparent ${
                    isSender
                      ? "border-l-primarySecond -right-4"
                      : "border-r-primary -left-4"
                  }`}
                ></div>
              </div>
            );
          })}
        </div>
      ) : (
        selectedUserId && (
          <div className="text-gray-500 flex items-end justify-center mt-4">
            Start a conversation
          </div>
        )
      )}
    </div>
  );
};

export default ChatMessages;
