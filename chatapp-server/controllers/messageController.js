const { format } = require("date-fns");
const fsPromises = require("fs").promises;
const path = require("path");

const messagesDB = {
  messages: require("../models/messages.json"),
  setMessages: function (data) {
    this.messages = data;
  },
};

const handleNewMessage = async (req, res) => {
  const date = `${format(new Date(), "yyyyMMdd")}`;
  const time = `${format(new Date(), "HH:mm")}`;

  try {
    const newMessage = {
      id: messagesDB.messages?.length
        ? messagesDB.messages[messagesDB.messages.length - 1].id + 1
        : 1,
      user: req.body.user,
      date: date,
      time: time,
      content: req.body.content,
    };

    messagesDB.setMessages([...messagesDB.messages, newMessage]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "messages.json"),
      JSON.stringify(messagesDB.messages)
    );

    res.status(201).json({ success: "Message sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllMessages = async (req, res) => {
  res.status(200).json(messagesDB.messages);
};

const deleteMessage = async (req, res) => {
  // Hitta medelandet med rätt id
  const message = messagesDB.messages.find((msg) => msg.id === req.body.id);
  if (!message) {
    return res.status(400).json({ message: "No message found with that id" });
  }

  try {
    // Ta bort den ur datan
    const filteredArray = messagesDB.messages.filter(
      (msg) => msg.id !== req.body.id
    );

    messagesDB.setMessages([...filteredArray]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "messages.json"),
      JSON.stringify(messagesDB.messages)
    );

    // Svara med code 204
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleNewMessage, getAllMessages, deleteMessage };
