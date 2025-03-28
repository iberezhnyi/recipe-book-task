import { Controller, Get, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getAllRecipes() {
    return this.recipesService.getAllRecipes();
  }

  @Get('ingredient/:ingredient')
  async getRecipesByIngredient(@Param('ingredient') ingredient: string) {
    return this.recipesService.getRecipesByIngredient(ingredient);
  }

  @Get('country/:country')
  async getRecipesByCountry(@Param('country') country: string) {
    return this.recipesService.getRecipesByCountry(country);
  }

  @Get('category/:category')
  async getRecipesByCategory(@Param('category') category: string) {
    return this.recipesService.getRecipesByCategory(category);
  }

  @Get(':id')
  async getRecipeById(@Param('id') id: string) {
    return this.recipesService.getRecipeById(id);
  }
}
