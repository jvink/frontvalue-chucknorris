"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Joke } from "../types";
import JokeCard from "./JokeCard";
import Button from "./Button";
import { useFavorites } from "../context/FavoritesContext";

export default function JokesList({ initialJokes }: { initialJokes: Joke[] }) {
  const [jokes, setJokes] = useState<Joke[]>(initialJokes);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive) {
      interval = setInterval(fetchNewJoke, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerActive]);

  const fetchNewJoke = async () => {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const newJoke = await response.json();
    setJokes((prev) => [newJoke, ...prev.slice(0, -1)]);
  };

  const toggleTimer = () => {
    setIsTimerActive((prev) => !prev);
  };

  const toggleFavorite = (joke: Joke) => {
    if (isFavorite(joke.id)) {
      removeFavorite(joke.id);
    } else {
      addFavorite(joke);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Chuck Norris jokes</h1>
          <p className="text-sm text-gray-500">Just a bunch of jokes</p>
        </div>
        <div className="space-x-4">
          <Button
            onClick={toggleTimer}
            variant={isTimerActive ? "destructive" : "default"}
          >
            {isTimerActive ? "Stop Timer" : "Start Timer"}
          </Button>
          <Button variant="outline">
            <Link href="/favorites">View Favorites ({favorites.length})</Link>
          </Button>
        </div>
      </div>

      <div className="grid bg-[#0A0A0A] border border-[#282828] rounded-lg">
        {jokes.map((joke) => (
          <JokeCard
            key={joke.id}
            joke={joke}
            isFavorite={isFavorite(joke.id)}
            onToggleFavorite={() => toggleFavorite(joke)}
          />
        ))}
      </div>
    </main>
  );
}
