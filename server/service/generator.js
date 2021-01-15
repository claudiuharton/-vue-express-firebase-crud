const movieDao = require("../dao/movieDao");
const userDao = require("../dao/userDao");

const mock = require("../../MOCK_DATA-300.json");

const generator = async () => {
  try {
    const movies = await movieDao.getMoviesFromAll();
    const users = await userDao.getUsers();

    if (movies.length < 500 && users.length < 200) {
      console.info("Data started genereating...");

      await Promise.all(
        mock.map(async (u, index) => {
          const user = await userDao.addUser({
            email: u.email,
            token: u.token,
            password: u.password,
          });

          await Promise.all(
            u.movies.map(async (m) => {
              await movieDao.addMovie({ ...m, userId: user.id });
            })
          );
          console.info(index + 1 + " / " + mock.length + " completed.");
        })
      );
      console.info("Data was generated");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = generator;
