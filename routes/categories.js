const categoriesRouter = require ("express").Router();
const {findAllCategories,
       checkEmptyName,
       findCategoryById,
       createCategory,
       deleteCategory,
       updateCategory,
       checkIsCategoryExists,
} = require ("../middlewares/categories");

const {sendAllCategories,
       sendCategoryById,
       sendCategoryCreated,
       sendCategoryDeleted,
       sendCategoryUpdated,
} = require ("../controllers/categories");
const {checkAuth} = require ("../middlewares/auth");

categoriesRouter.get(
       "/categories",
       findAllCategories,
       sendAllCategories
);
categoriesRouter.get(
    "/categories/:id",
    findCategoryById,
    sendCategoryById
);
categoriesRouter.post(
       "/categories",
       findAllCategories,
       checkIsCategoryExists,
       checkEmptyName,
       checkAuth,
       createCategory,
       sendCategoryCreated
);
categoriesRouter.delete(
       "/categories/:id",
        checkAuth,
        deleteCategory,
        sendCategoryDeleted,
);
categoriesRouter.put(
       "/categories/:id",
        findCategoryById,
        checkEmptyName,
        checkAuth,
        updateCategory,
        sendCategoryUpdated,
       );
   

module.exports = categoriesRouter;