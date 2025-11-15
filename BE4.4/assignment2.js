const express = require("express");
const app = express();
app.use(express.json());
// 1. Create a Mongoose model for a Recipe
const Recipes = require("../BE1.1/models/recipes.model");
// 2. Create your db connection
const { initializeDatabase } = require("../db/db.connect");
initializeDatabase();
// 3. Create an API with route "/recipes" to create a new recipe in the recipes database. Make sure to handle errors properly. Test your API with Postman. Add the following recipe:
async function createRecipe(newRecipe){
    try{
        const recipe = new Recipes(newRecipe);
        const saveRecipe = await recipe.save();
        return(saveRecipe);
    } catch(error){
        throw error;
    }
}
app.post("/recipes", async (req, res) =>{
    try{
        const recipeToAdd = await createRecipe(req.body);
        res.status(201).json({message: "Recipe Added Successfully.", recipeAdded: recipeToAdd});

    } catch(error){
        res.status(500).json({error: "Failed to Add Recipe."});
    }
});
// 4,5. Run your API and create another recipe data in the database
// 6. Create an API to get all the recipes in the database as a response. Make sure to handle errors properly.
async function readAllRecipes(){
    try{
        const allRecipes = await Recipes.find();
        return(allRecipes);
    } catch(error){
        throw error;
    }
}
app.get("/recipes", async (req, res) => {
    try{
        const recipes = await readAllRecipes();
        if(recipes.length != 0){
            res.json(recipes);
        } else {
            res.status(404).json({error: "Recipes Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch Recipes."});
    }
})
// 7. Create an API to get a recipe's details by its title. Make sure to handle errors properly.
async function readRecipeByTitle(titleName){
    try{
        const recipe = await Recipes.findOne({ title: titleName});
        return(recipe);
    } catch(error){
        throw error;
    }
}
app.get("/recipes/title/:title", async (req, res) => {
    try{
        const title = req.params.title;
        const recipe = await readRecipeByTitle(title);
        if(recipe){
            res.json(recipe);
        } else {
            res.status(404).json({error: `No Recipes FOund with title '${title}`});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Fetch Recipes."});
    }
})
// 8. Create an API to get details of all the recipes by an author. Make sure to handle errors properly.
async function readRecipesByAuthor(authorName){
    try{
        const recipes = await Recipes.find({author: authorName});
        return(recipes);
    } catch(error){
        throw error;
    }
}
app.get("/recipes/author/:author", async(req, res) => {
    try{
        const author = req.params.author;
        const recipes = await readRecipesByAuthor(author);
        if(recipes){
            res.json(recipes);
        } else {
            res.status(404).json({error: `No Recipe found with author: ${author}.`});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Fetch Recipes."});
    }
})
// 9. Create an API to get all the recipes that are of "Easy" difficulty level.
async function readRecipesByDifficulty(difficultyLevel){
    try{
        const recipes = await Recipes.find({difficulty: difficultyLevel});
        return(recipes);
    } catch(error){
        throw error;
    }
}
app.get("/recipes/difficulty/:difficulty", async (req, res) => {
    try{
        const difficulty = req.params.difficulty;
        const recipes = await readRecipesByDifficulty(difficulty);
        if(recipes){
            res.json(recipes);
        } else {
            res.status(404).json({error: `No Recipes found with ${difficulty} Level.`});
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch Easy Difficult level Recipes."});
    }
});
// 10. Create an API to update a recipe's difficulty level with the help of its id. Update the difficulty of "Spaghetti Carbonara" from "Intermediate" to "Easy". Send an error message "Recipe not found" if the recipe is not found. Make sure to handle errors properly.
async function updateRecipeDifficultyLevel(recipeId, difficultyLevel){
    try{
        const recipe = await Recipes.findByIdAndUpdate(recipeId, {
            difficulty: difficultyLevel}, {new: true});
        if(!recipe){
            return -1;
        }
        return(recipe);
    } catch(error){
        throw error;
    }
}
app.post("/recipes/:id/difficulty", async (req, res) => {
    try{
        const recipeId = req.params.id;
        const difficultyLevel = req.body.difficulty;
        // const { difficultyLevel } = req.body;
        const updatedRecipe = await updateRecipeDifficultyLevel(recipeId, difficultyLevel);
        if(updatedRecipe === -1){
            return res.status(404).json({error: "Recipe not found."});
        }
        res.json({message: "Recipe Difficulty Level Updated Successfully.", updatedRecipes: updatedRecipe,});
    } catch(error){
        res.status(500).json({error: "Failed to update Recipe Difficulty Level"});
    }
})
// 11. Create an API to update a recipe's prep time and cook time with the help of its title. Update the details of the recipe "Chicken Tikka Masala". Send an error message "Recipe not found" if the recipe is not found. Make sure to handle errors properly.
// Updated recipe data: { "prepTime": 40, "cookTime": 45 }
async function updateRecipeTimesByTitle(title, prepTime, cookTime) {
    try {
        const updatedRecipe = await Recipes.findOneAndUpdate({ title: title },{ prepTime, cookTime },{ new: true });
        if (!updatedRecipe) {
            return null; 
        }
        return updatedRecipe;
    } catch (error) {
        throw error;
    }
}
app.post("/recipes/updateTime/:title", async (req, res) => {
    try {
        const { title } = req.params;
        const { prepTime, cookTime } = req.body;
        const updatedRecipe = await updateRecipeTimesByTitle(title, prepTime, cookTime);
        if (!updatedRecipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }
        res.json({message: "Recipe prep and cook time Updated Successfully.",updatedRecipe: updatedRecipe,});
    } catch (error) {
        res.status(500).json({ error: "Failed to Update Recipe Times" });
    }
});
// 12. Create an API to delete a recipe with the help of a recipe id. Send an error message "Recipe not found" if the recipe does not exist. Make sure to handle errors properly.
async function deleteRecipeById(recipeId){
    try {
        const deletedRecipe = await Recipes.findByIdAndDelete(recipeId);
        if (!deletedRecipe) {
            return null; 
        }
        return deletedRecipe;
    } catch (error) {
        throw error;
    }
}
app.delete("/recipes/:id", async (req, res) => {
    try{
        const recipeId = req.params.id;
        const deletedRecipe = await deleteRecipeById(recipeId);
         if (!deletedRecipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }
        res.json({message: "Recipe deleted successfully.",deletedRecipe
        });
    } catch(error){
        res.status(500).json({ error: "Failed to Delete Recipe." });
    }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Running on PORT", PORT);
});
