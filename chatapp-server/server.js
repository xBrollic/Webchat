const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://192.168.56.1:5173",
    credentials: true,
  },
});

const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandeler = require("./middleware/errorHandeler");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const IP = process.env.IP || "localhost";
const PORT = process.env.PORT || 3500;

// Socekt io
io.on("connection", (socket) => {
  socket.on("chat message", ({ msg, time, user }) => {
    io.emit("chat message", { msg, time, user });
  });
});

// middleware
app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

// Built in middleware for json
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

// Serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/get-messages", require("./routes/getAllMessages"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));
app.use("/del-message", require("./routes/deleteMessage"));
app.use("/send-message", require("./routes/sendMessage"));

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandeler);

server.listen(PORT, IP, () => console.log(`Server running on ${IP}:${PORT}`));
