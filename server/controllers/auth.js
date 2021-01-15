const userDao = require("../dao/userDao");

const middleware = {
  checkLogin: async (req, res, next) => {
    const token = req.session.token;
    const id = req.session.id;
    const users = await userDao.getUsers();
    const user = users.filter((user) => user.token === token && user.id === id);

    user.length === 0 ? res.status(403).send({ message: "Forbidden" }) : next();
  },
};

const controller = {
  login: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const users = await userDao.getUsers();

      const user = users.filter(
        (user) => user.password === password && user.email === email
      );

      if (user.length === 0) {
        res.status(403).send({ message: "Incorrect email/password" });
      } else {
        if (req.session.id) {
          res.status(202).send({ message: "Already logged in" });
        } else {
          req.session.id = user[0].id;
          req.session.token = user[0].token;
          res.status(200).send({ message: "Login successfully" });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  register: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      if (
        !email.match(
          "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"
        )
      )
        res.status(400).send({ message: "Invalid Email" });
      else if (!password.length > 4)
        res.status(400).send({ message: "Invalid password" });

      const users = await userDao.getUsers();
      const user = users.filter(
        (user) => user.password === password && user.email === email
      );

      if (user.length !== 0) {
        res
          .status(400)
          .send({ message: `Email ${user[0].email} have already an account.` });
      } else {
        await userDao.addUser({
          email: email,
          token: Math.random().toString(36).substring(2),
          password: password,
        });
        res.status(201).send({ message: "Success registered" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  logout: (req, res) => {
    req.session.reset();
    res.status(200).send({ message: "You've been logged out" });
  },
  middleware,
};

module.exports = controller;
