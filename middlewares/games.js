const games = require ("../models/game");


const findAllGames = async(req, res, next) => {
  req.gamesArray = await games.find({}).populate("categories").populate({
    path:"users",
    select: "-password",
  });
  next();
};

const checkIsGameExists = async (req, res, next) => {
  const isInArray = req.gamesArray.find((game) => {
    return req.body.title === game.title;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Игра с таким названием уже существует" }));
  } else {
    next();
  }
}; 

const findGameById = async(req, res, next) => {
  console.log(`GET/games/${req.params.id}`);
  try{
    req.game = await games.findById(req.params.id).populate("categories").populate({
      path:"users",
      select: "-password",
    });
    next();
  }catch(error){
    res.status(404).send({message:"Game not found"});
  }
}

const createGame = async (req, res, next) => {
    console.log("POST /games");
    try {
      console.log(req.body);
      req.game = await games.create(req.body)
      .populate("categories")
      .populate({
        path:"users",
        select: "-password",
      });
      next();
    } catch (error) {
        res.status(400).send({ message: "Error creating game" });
    }
  }; 

  const deleteGame = async (req, res, next) => {
    console.log(`DELETE /games/${req.params.id}`);
    try {
      req.game = await games.findByIdAndDelete(req.params.id);
      next();
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error deleting game" });
    }
  }; 
  const updateGame = async(req, res, next) => {
    console.log (`PUT/games/${req.params.id}`);
    try{
      req.game = await games
      .findByIdAndUpdate(req.params.id, req.body)
      .populate("categories")
      .populate({
        path:"users",
        select: "-password",
      });
      next();
    }catch (error) {
      console.log(error);
      res.status(400).send({ message: "Error updating game" });
    }
  };

  const checkEmptyFields = async (req, res, next) => {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.image ||
      !req.body.link ||
      !req.body.developer
    ) {
      // Если какое-то из полей отсутствует, то не будем обрабатывать запрос дальше,
      // а ответим кодом 400 — данные неверны.
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Fill in all the fields" }));
    } else {
      // Если всё в порядке, то передадим управление следующим миддлварам
      next();
    }
  };

  const checkIfCategoriesAvaliable = async (req, res, next) => {
    // Проверяем наличие жанра у игры
  if (!req.body.categories || req.body.categories.length === 0) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Choose at least one category" }));
  } else {
    next();
  }
}; 

// Файл middlewares/games.js

const checkIfUsersAreSafe = async (req, res, next) => {
  // Проверим, есть ли users в теле запроса
if (!req.body.users) {
  next();
  return;
}
// Cверим, на сколько изменился массив пользователей в запросе
// с актуальным значением пользователей в объекте game
// Если больше чем на единицу, вернём статус ошибки 400 с сообщением
if (req.body.users.length - 1 === req.game.users.length) {
  next();
  return;
} else {
  res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ message: "You cannot delete users or add more than one user" }));
}
};
module.exports = {findAllGames,
                   checkIsGameExists,
                   findGameById, 
                   createGame, 
                   deleteGame, 
                   updateGame, 
                   checkEmptyFields,
                   checkIfCategoriesAvaliable,
                   checkIfUsersAreSafe,
                  };  


