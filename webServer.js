const ws = require("ws");
const jwt = require("jsonwebtoken");
const Message = require("./models/messageModel");
const { User } = require("./models/userModel");

const createWebSocketServer = (server) => {
  const wss = new ws.WebSocketServer({ server });

  // Helper: notify all clients about currently online users
  const notifyAboutOnlinePeople = async () => {
    const onlineUsers = await Promise.all(
      Array.from(wss.clients)
        .filter((client) => client.readyState === ws.OPEN && client.userId)
        .map(async (client) => {
          const user = await User.findById(client.userId);
          return {
            userId: client.userId,
            username: client.username,
            avatarLink: user?.avatarLink || null,
          };
        })
    );

    // Broadcast list of online users
    for (const client of wss.clients) {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify({ online: onlineUsers }));
      }
    }
  };

  // Handle new WebSocket connections
  wss.on("connection", (connection, req) => {
    connection.isAlive = true;

    // Heartbeat check (keep connection alive)
    connection.timer = setInterval(() => {
      connection.ping();
      connection.deathTimer = setTimeout(() => {
        connection.isAlive = false;
        clearInterval(connection.timer);
        connection.terminate();
        notifyAboutOnlinePeople();
        console.log("A connection was terminated (dead).");
      }, 1000);
    }, 5000);

    connection.on("pong", () => clearTimeout(connection.deathTimer));

    // Authenticate user via JWT from cookies
    const cookies = req.headers.cookie;
    if (cookies) {
      const tokenString = cookies.split(";").find((str) => str.trim().startsWith("authToken="));
      if (tokenString) {
        const token = tokenString.split("=")[1];
        jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
          if (err) {
            console.error("JWT verification failed:", err);
            return;
          }
          const { _id, firstName, lastName } = userData;
          connection.userId = _id;
          connection.username = `${firstName} ${lastName}`;
          notifyAboutOnlinePeople();
        });
      }
    }

    // Handle incoming chat messages
    connection.on("message", async (message) => {
      try {
        const messageData = JSON.parse(message.toString());
        const { recipient, text } = messageData;

        if (!recipient || !text) return;

        const msgDoc = await Message.create({
          sender: connection.userId,
          recipient,
          text,
        });

        // Send message to recipient (real-time)
        for (const client of wss.clients) {
          if (client.userId === recipient && client.readyState === ws.OPEN) {
            client.send(
              JSON.stringify({
                sender: connection.username,
                text,
                id: msgDoc._id,
              })
            );
          }
        }
      } catch (err) {
        console.error("Error handling message:", err);
      }
    });

    // Log online users periodically
    console.log("New client connected.");
  });
};

module.exports = createWebSocketServer;
