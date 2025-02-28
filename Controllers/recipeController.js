const Recipe = require("../Models/recipeModel");

const createRecipe = async (req, res) => {
    try {
        const recipe = new Recipe({
            ...req.body,
            // owner: req.user._id,
        });

        await recipe.save();

        res.status(201).send({ message: "Recipe created", recipe });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Controller pour get les products de l'utilisateur connecté
const getRecipeById = async (req, res) => {
    try {
        const { id } = req.params; // Récupère l'ID depuis les paramètres de l'URL
        const recipe = await Recipe.findById(id); // Utilise findById directement

        if (!recipe) {
            return res.status(404).json({ message: "Recette non trouvée" });
        }

        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );

        if (!recipe) {
            return res.status(404).send({ error: "Recipe not found" });
        }

        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findOneAndDelete({ _id: req.params.id });

        if (!recipe) {
            return res.status(404).send({ error: "Recipe not found" });
        }

        res.status(200).send({ message: "Recipe deleted", product });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getRecipes = async (req, res) => {
    try {
        const filters = {};

        if (req.query.name) {
            filters.name = new RegExp(req.query.name, "i");
        }

        if (req.query.category) {
            filters.category = new RegExp(req.query.category, "i");
        }

        const recipes = await Recipe.find(filters);

        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    getRecipes,
};
