"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/types/recipe";
import { api } from "@/services/api";

export default function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await api.getRecipeById(resolvedParams.id);
        if (response.meals && response.meals[0]) {
          setRecipe(response.meals[0]);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        setError("Error loading recipe");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  const ingredients = Array.from({ length: 20 }, (_, i) => ({
    ingredient: recipe[`strIngredient${i + 1}` as keyof Recipe],
    measure: recipe[`strMeasure${i + 1}` as keyof Recipe],
  })).filter(({ ingredient }) => ingredient && ingredient.trim());

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-96 w-full mb-8">
            <Image
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-400 mb-4">
            {recipe.strMeal}
          </h1>
          <div className="flex items-center space-x-4 mb-8">
            <Link
              href={`/?type=area&value=${recipe.strArea}`}
              className="text-blue-500 hover:text-blue-700"
            >
              {recipe.strArea}
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href={`/?type=category&value=${recipe.strCategory}`}
              className="text-blue-500 hover:text-blue-700"
            >
              {recipe.strCategory}
            </Link>
          </div>
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
            <p className="whitespace-pre-line">{recipe.strInstructions}</p>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl text-gray-800 font-semibold mb-4">
              Ingredients
            </h2>
            <ul className="space-y-2">
              {ingredients.map(({ ingredient, measure }, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Link
                    href={`/?type=ingredient&value=${ingredient}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {ingredient}
                  </Link>
                  <span className="text-gray-500">-</span>
                  <span className="text-gray-700">{measure}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
