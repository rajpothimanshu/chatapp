import React from "react";

export default function Avatar({ username, userId, isOnline = false, avatarLink }) {
  // Define a palette of colors for fallback avatars
  const colors = [
    "#90CDF4", "#F56565", "#D6BCFA", "#BC85E0",
    "#7F9CF5", "#F6AD55", "#F687B3", "#68D391",
    "#FBBF24", "#4299E1",
  ];

  // Generate a consistent color based on userId
  const userIdBase10 = parseInt(userId.substring(0, 8), 16); // use first 8 chars to avoid huge numbers
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];

  const squircleStyles = {
    "--squircle-bg-color": color,
  };

  return (
    <div className="squircle relative" style={squircleStyles}>
      <div
        className="squircle__inline text-xl text-white uppercase"
        style={{ textShadow: "0.4px 0.4px 1px gray" }}
      >
        {username && avatarLink ? (
          <img
            src={avatarLink}
            className="h-10 w-10 object-cover rounded"
            alt={username}
          />
        ) : (
          <span>{username ? username[0] : "?"}</span>
        )}
      </div>

      {/* Online indicator */}
      {isOnline && (
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
      )}

      <style>
        {`
          .squircle {
            --squircle-size: 44px;
            --squircle-radii: 50% / 10%;
            aspect-ratio: 1;
            display: grid;
            grid-template-columns: 1fr;
            max-width: 80%;
            width: var(--squircle-size);
          }
          .squircle::before,
          .squircle::after {
            align-self: center;
            background-color: var(--squircle-bg-color, #6B8AFD); 
            content: "";
            grid-column: 1;
            grid-row: 1;
            justify-self: center;
            border-radius: var(--squircle-radii);
            height: 115%;
            width: 100%;
          }
          .squircle::after {
            transform: rotate(90deg);
          }
          .squircle__inline {
            border-radius: 7%;
            display: grid;
            inset-block: 5%;
            inset-inline: 5%;
            place-content: center;
            position: absolute;
            z-index: 1;
          }
        `}
      </style>
    </div>
  );
}
