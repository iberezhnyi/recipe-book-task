import { useState, useEffect } from "react";

interface RecipeFiltersProps {
  onFilterChange: (type: string, value: string) => void;
  initialFilter: { type: string; value: string };
}

export const RecipeFilters = ({
  onFilterChange,
  initialFilter,
}: RecipeFiltersProps) => {
  const [activeFilter, setActiveFilter] = useState<{
    type: string;
    value: string;
  }>(initialFilter);

  useEffect(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  const handleFilterClick = (type: string, value: string) => {
    setActiveFilter({ type, value });
    onFilterChange(type, value);
  };

  const isActive = (type: string, value: string) => {
    return (
      activeFilter.type === type &&
      (type === "all" || activeFilter.value === value)
    );
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <button
        onClick={() => handleFilterClick("all", "")}
        className={`px-4 py-2 rounded-full cursor-pointer ${
          isActive("all", "")
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        All Recipes
      </button>
      <button
        onClick={() => handleFilterClick("category", "Beef")}
        className={`px-4 py-2 rounded-full cursor-pointer ${
          isActive("category", "Beef")
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Beef
      </button>
      <button
        onClick={() => handleFilterClick("category", "Chicken")}
        className={`px-4 py-2 rounded-full cursor-pointer ${
          isActive("category", "Chicken")
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Chicken
      </button>
      <button
        onClick={() => handleFilterClick("category", "Seafood")}
        className={`px-4 py-2 rounded-full cursor-pointer ${
          isActive("category", "Seafood")
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Seafood
      </button>
      <button
        onClick={() => handleFilterClick("area", "Italian")}
        className={`px-4 py-2 rounded-full cursor-pointer ${
          isActive("area", "Italian")
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Italian
      </button>
      <button
        onClick={() => handleFilterClick("area", "Japanese")}
        className={`px-4 py-2 rounded-full cursor-pointer ${
          isActive("area", "Japanese")
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Japanese
      </button>
    </div>
  );
};
