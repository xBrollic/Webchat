const { format } = require("date-fns");

const messagesDB = {
  messages: require("../models/messages.json"),
  setMessages: function (data) {
    this.messages = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleNewMessage = async (req, res) => {
  const dateTime = `${format(new Date(), "yyyyMMdd HH:mm:ss")}`;

  try {
    const newMessage = {
      id: messagesDB.messages?.length
        ? messagesDB.messages[messagesDB.messages.length - 1].id + 1
        : 1,
      user: req.body.user,
      time: dateTime,
      content: req.body.content,
    };

    messagesDB.setMessages([...messagesDB.messages, newMessage]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "messages.json"),
      JSON.stringify(messagesDB.messages)
    );

    console.log(messagesDB.messages);
    res.status(201).json({ success: "Message sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllMessages = async (req, res) => {
  console.log(messagesDB.messages);
  try {
    res.status(201).json(messagesDB.messages);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleNewMessage, getAllMessages };
