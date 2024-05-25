
const {createGame,
      findAllGames,
      findGameById, 
      deleteGame,
      updateGame,
      checkEmptyFields,
      checkIfUsersAreSafe,
      checkIfCategoriesAvaliable,
      checkIsGameExists,
} = require ("../middlewares/games");
const {sendGameCreated, 
       sendAllGames,
       sendGameById, 
       sendGameDeleted,
       sendGameUpdated,
} = require ("../controllers/games");
const { checkAuth } = require("../middlewares/auth");

const gamesRouter = require ("express").Router();

gamesRouter.get("/games",findAllGames,sendAllGames);
gamesRouter.get("/games/:id",findGameById, sendGameById)
gamesRouter.post("/games", 
              findAllGames,
              checkIsGameExists,
              checkIfCategoriesAvaliable, 
              checkEmptyFields, 
              checkAuth,
              createGame, 
              sendGameCreated,
              );
gamesRouter.delete("/games/:id", checkAuth, deleteGame, sendGameDeleted);
gamesRouter.put("/games/:id",
              findGameById,
              checkIfUsersAreSafe,
              checkIfCategoriesAvaliable,
              checkEmptyFields, 
              checkAuth,
              updateGame, 
              sendGameUpdated,
       );

module.exports = gamesRouter;