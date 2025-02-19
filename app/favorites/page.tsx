"use client";

import Link from "next/link";
import { useFavorites } from "../context/FavoritesContext";
import Button from "../components/Button";
import JokeCard from "../components/JokeCard";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <main className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Favorites</h1>
          <p className="text-sm text-gray-500">Your all time favorite Chuck Norris jokes</p>
        </div>
        <Button variant="outline">
          <Link href="/">Back to Jokes</Link>
        </Button>
      </div>

      {favorites.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          No favorite jokes yet!
        </p>
      ) : (
        <div className="grid bg-[#0A0A0A] border border-[#282828] rounded-lg">
          {favorites.map((joke) => (
            <JokeCard
              key={joke.id}
              joke={joke}
              isFavorite={true}
              onToggleFavorite={() => removeFavorite(joke.id)}
              showDeleteButton={true}
              onDelete={() => removeFavorite(joke.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
