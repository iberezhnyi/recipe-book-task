import { RecipeResponse } from "@/types/recipe";

const API_BASE_URL = "http://localhost:3000/recipes";

export const api = {
  async getAllRecipes(): Promise<RecipeResponse> {
    const response = await fetch(API_BASE_URL);
    return response.json();
  },

  async getRecipesByIngredient(ingredient: string): Promise<RecipeResponse> {
    const response = await fetch(`${API_BASE_URL}/ingredient/${ingredient}`);
    return response.json();
  },

  async getRecipesByCountry(country: string): Promise<RecipeResponse> {
    const response = await fetch(`${API_BASE_URL}/country/${country}`);
    return response.json();
  },

  async getRecipesByCategory(category: string): Promise<RecipeResponse> {
    const response = await fetch(`${API_BASE_URL}/category/${category}`);
    return response.json();
  },

  async getRecipeById(id: string): Promise<RecipeResponse> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    return response.json();
  },
};
