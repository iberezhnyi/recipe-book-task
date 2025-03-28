import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RecipesService {
  private readonly baseUrl =
    process.env.MEALDB_API_BASE_URL || 'https://www.themealdb.com/api/json/v1/1';

  async getAllRecipes() {
    const response = await axios.get(`${this.baseUrl}/search.php?s=`);
    return response.data;
  }

  async getRecipesByIngredient(ingredient: string) {
    const response = await axios.get(`${this.baseUrl}/filter.php?i=${ingredient}`);
    return response.data;
  }

  async getRecipesByCountry(country: string) {
    const response = await axios.get(`${this.baseUrl}/filter.php?a=${country}`);
    return response.data;
  }

  async getRecipesByCategory(category: string) {
    const response = await axios.get(`${this.baseUrl}/filter.php?c=${category}`);
    return response.data;
  }

  async getRecipeById(id: string) {
    const response = await axios.get(`${this.baseUrl}/lookup.php?i=${id}`);
    return response.data;
  }
}
