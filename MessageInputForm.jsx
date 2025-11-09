import React from "react";

const MessageInputForm = ({
  selectedUserId,
  newMessage,
  setNewMessage,
  sendMessage,
}) => {
  return (
    <>
      {!!selectedUserId && (
        <form
          onSubmit={sendMessage}
          className="relative m-4 w-full flex items-center"
        >
          <input
            type="text"
            placeholder="Your Message"
            className="w-full px-4 py-3 rounded-xl bg-transparent border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            value={newMessage}
            onChange={(ev) => setNewMessage(ev.target.value)}
            required
          />
          <button
            type="submit"
            className="absolute right-3 aspect-square h-10 flex items-center justify-center text-white bg-primary rounded-full hover:bg-primaryDark transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10l9-4 9 4-9 4-9-4z"
              />
            </svg>
          </button>
        </form>
      )}
    </>
  );
};

export default MessageInputForm;
