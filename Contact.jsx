import React from "react";
import Avatar from "./Avatar";

const Contact = ({
  userId,
  username,
  selectedUserId,
  setSelectedUserId,
  isOnline,
  avatarLink,
}) => {
  return (
    <li
      key={userId}
      className={`flex items-center gap-3 cursor-pointer capitalize py-2 lg:py-3 px-4 lg:px-5 rounded-[1.3rem] ${
        selectedUserId === userId ? "bg-primary" : "hover:bg-primary/20"
      }`}
      onClick={() => {
        setSelectedUserId(userId);
        console.log("Selected User:", userId);
      }}
    >
      <Avatar
        userId={userId}
        username={username}
        isOnline={isOnline}
        avatarLink={avatarLink}
      />
      <div className="flex flex-col">
        <span className="text-xs lg:text-base font-medium">{username}</span>
        {isOnline && (
          <span className="text-xs rounded-full bg-green-500 px-2 py-0.5 text-white w-max mt-1">
            Active
          </span>
        )}
      </div>
    </li>
  );
};

export default Contact;
