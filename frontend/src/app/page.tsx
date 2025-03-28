"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Recipe, RecipeResponse } from "@/types/recipe";
import { api } from "@/services/api";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeFilters } from "@/components/RecipeFilters";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentFilter = {
    type: searchParams.get("type") || "all",
    value: searchParams.get("value") || "",
  };

  const fetchRecipes = async (type: string = "all", value: string = "") => {
    try {
      setLoading(true);
      let response: RecipeResponse;

      switch (type) {
        case "category":
          response = await api.getRecipesByCategory(value);
          break;
        case "area":
          response = await api.getRecipesByCountry(value);
          break;
        default:
          response = await api.getAllRecipes();
      }

      if (response.meals) {
        setRecipes(response.meals);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      setError("Error loading recipes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(currentFilter.type, currentFilter.value);
  }, [currentFilter.type, currentFilter.value]);

  const handleFilterChange = (type: string, value: string) => {
    const params = new URLSearchParams();
    if (type !== "all") {
      params.set("type", type);
      params.set("value", value);
    }
    router.push(`/?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-400 mb-8">Recipe Book</h1>
      <RecipeFilters
        onFilterChange={handleFilterChange}
        initialFilter={currentFilter}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
