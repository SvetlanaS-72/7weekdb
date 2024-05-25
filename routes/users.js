const usersRouter = require ("express").Router();
const {findAllUsers,
       checkIsUserExists,
       checkEmptyNameAndEmailAndPassword, 
       findUserById,
       hashPassword,
       createUser,
       deleteUser,
       checkEmptyNameAndEmail,
       updateUser,
} = require ("../middlewares/users");
const {sendAllUsers,
       sendUserById,
       sendUserCreated,
       sendUserDeleted,
       sendUserUpdated,
       sendMe,
} = require ("../controllers/users");
const {checkAuth} = require("../middlewares/auth");

usersRouter.get("/users",findAllUsers,sendAllUsers);
usersRouter.get(
    "/users/:id",
    findUserById,
    sendUserById
);
usersRouter.get("/me",checkAuth,sendMe);
usersRouter.post(
    "/users",
    findAllUsers,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword, 
    checkAuth,
    hashPassword,
    createUser,
    sendUserCreated,
);
usersRouter.delete(
    "/users/:id",
     checkAuth,
     deleteUser,
     sendUserDeleted,
);
usersRouter.put(
    "/users/:id",
     findUserById,
     checkEmptyNameAndEmail,
     checkAuth,
     updateUser,
     sendUserUpdated
);

module.exports = usersRouter;