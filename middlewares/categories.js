const categories = require("../models/category")

const findAllCategories = async (req, res, next) => {
  console.log("GET /categories");
  req.categoriesArray = await categories.find({});
  next();
};

const checkIsCategoryExists = async (req, res, next) => {
  // Среди существующих в базе категорий пытаемся найти категорию с тем же именем,
  // с которым хотим создать новую категорию
  const isInArray = req.categoriesArray.find((category) => {
    return req.body.name === category.name;
  });
  // Если нашли совпадение, то отвечаем кодом 400 и сообщением
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "A category with that name already exists" }));
  } else {
  // Если категория, которую хотим создать, действительно новая, то передаём управление дальше
    next();
  }
}; 

const checkEmptyName = async (req, res, next) => {
  if (!req.body.name) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Enter the name of the category" }));
  } else {
    next();
  }
}; 

const findCategoryById = async(req, res, next) => {
  console.log(`GET/categories/${req.params.id}`);
  try{
    req.category = await categories.findById(req.params.id);
    next();
  }catch(error){
    console.log(error);
    res.status(404).send({message:"Category not found"});
  }
}
const createCategory = async (req, res, next) => {
  console.log("POST /categories");
  try {
      console.log(req.body);
    req.category = await categories.create(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Error creating category" }));
  }
};
const deleteCategory = async (req, res, next) => {
  console.log(`DELETE /categories/${req.params.id}`);
  try {
    req.category = await categories.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
      console.log(error);
      res.status(400).send({ message: "Error deleting category" });
  };
}; 

const updateCategory = async(req, res, next) => {
  console.log (`PUT/categories/${req.params.id}`);
  try{
    req.category = await categories.findByIdAndUpdate(req.params.id, req.body);
    next();
  }catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error updating category" });
  };
};


module.exports = {findAllCategories, 
                  checkIsCategoryExists ,
                  findCategoryById,
                  createCategory,
                  deleteCategory,
                  updateCategory,
                  checkEmptyName,
                  };
