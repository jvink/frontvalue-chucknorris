'use client';

import { Heart, Trash2 } from "lucide-react";
import type { Joke } from "../types";

interface JokeCardProps {
  joke: Joke;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  showDeleteButton?: boolean;
  onDelete?: () => void;
}

export default function JokeCard({
  joke,
  isFavorite,
  onToggleFavorite,
  showDeleteButton = false,
  onDelete,
}: JokeCardProps) {
  return (
    <div className="shadow-md p-3 flex items-start justify-between [&:not(:last-child)]:border-b border-[#282828]">
      <div className="flex shrink-0 mr-4">
        {showDeleteButton ? (
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-600 focus:outline-none"
            aria-label="Delete favorite"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={onToggleFavorite}
            className="focus:outline-none"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-500 hover:text-red-500"
              }`}
            />
          </button>
        )}
      </div>
      <p className="flex-grow">{joke.value}</p>
    </div>
  );
}
