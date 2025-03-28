import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link href={`/recipe/${recipe.idMeal}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {recipe.strMeal}
          </h3>
          {(recipe.strCategory || recipe.strArea) && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              {recipe.strCategory && <span>{recipe.strCategory}</span>}
              {recipe.strCategory && recipe.strArea && <span>•</span>}
              {recipe.strArea && <span>{recipe.strArea}</span>}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
