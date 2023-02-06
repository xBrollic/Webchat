const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const getUserPic = async (req, res) => {
  try {
    for (let i = 0; i < usersDB.users.length; i++) {
      if (usersDB.users[i].username === req.body.username) {
        res.status(201).json(usersDB.users[i].pic);
      }
    }
    return res.status(404);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getUserPic };
