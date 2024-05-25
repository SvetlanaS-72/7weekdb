const users = require ("../models/user");
const bcrypt = require("bcryptjs"); 

const findAllUsers = async (req, res, next) => {
  req.usersArray = await users.find({});
  next();
};

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Пользователь с таким email уже существует" }));
  } else {
    next();
  }
}; 

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Enter your name, email and password" }));
  } else {
    next();
  }
}; 

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (!req.body.username || !req.body.email) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Enter your name and email address" }));
  } else {
    next();
  }
}; 

const findUserById = async(req, res, next) => {
  console.log(`GET/users/${req.params.id}`);
  try{
    req.user = await users.findById(req.params.id);
    next();
  }catch(error){
    res.status(404).send({message:"User not found"});
  };
};

const createUser = async (req, res, next) => {
    console.log("POST /user");
    try {
        console.log(req.body);
      req.user = await users.create(req.body);
      next();
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send({ message: "Error creating user" });
    };
  };
  const deleteUser = async (req, res, next) => {
    console.log(`DELETE /users/${req.params.id}`);
    try {
      req.user = await users.findByIdAndDelete(req.params.id);
      next();
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error deleting user" });
    };
  }; 

 
  const updateUser = async(req, res, next) => {
    console.log (`PUT/users/${req.params.id}`);
    try{
      req.user = await users.findByIdAndUpdate(req.params.id, req.body);
      next();
    }catch (error) {
      console.log(error);
      res.status(400).send({ message: "Error updating user" });
    };
  };

  const hashPassword = async (req, res, next) => {
    try {
      // Создаём случайную строку длиной в десять символов
      const salt = await bcrypt.genSalt(10);
      // Хешируем пароль
      const hash = await bcrypt.hash(req.body.password, salt);
      // Полученный в запросе пароль подменяем на хеш
      req.body.password = hash;
      next();
    } catch (error) {
      res.status(400).send({ message: "Ошибка хеширования пароля" });
    }
  }; 

  module.exports = {findAllUsers,
                    checkIsUserExists,
                    checkEmptyNameAndEmailAndPassword, 
                    checkEmptyNameAndEmail,
                    findUserById,
                    createUser,
                    deleteUser,
                    updateUser,
                    hashPassword,
                  };
  