import React from "react";

const TopBar = ({
  setSelectedUserId,
  selectedUserId,
  offlinePeople,
  onlinePeople,
}) => {
  if (!selectedUserId) return null; // Nothing selected

  const onlineUser = onlinePeople[selectedUserId];
  const offlineUser = offlinePeople[selectedUserId];

  return (
    <div className="absolute top-0 right-0 w-full py-4 px-6 bg-gray-800 text-white flex items-center gap-4 shadow-md">
      {/* Back button */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer"
        onClick={() => setSelectedUserId(null)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5L3 12l7.5-7.5M3 12h18"
        />
      </svg>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <span className="font-semibold text-lg">
          {onlineUser
            ? onlineUser.username
            : offlineUser
            ? `${offlineUser.firstName} ${offlineUser.lastName}`
            : "Unknown User"}
        </span>

        {/* Online status indicator */}
        {onlineUser ? (
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        ) : offlineUser ? (
          <span className="h-3 w-3 rounded-full bg-gray-500"></span>
        ) : null}
      </div>
    </div>
  );
};

export default TopBar;
