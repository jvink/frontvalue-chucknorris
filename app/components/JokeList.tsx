"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Joke } from "../types";
import JokeCard from "./JokeCard";
import Button from "./Button";
import { useFavorites } from "../context/FavoritesContext";

export default function JokesList({ initialJokes }: { initialJokes: Joke[] }) {
  const [jokes, setJokes] = useState<Joke[]>(initialJokes);
  const [timerValue, setTimerValue] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    let intervalTimerValue: NodeJS.Timeout;

    if (isTimerActive) {
      intervalTimerValue = setInterval(() => {
        setTimerValue((prev) => prev + 1);
      }, 1000);
    }

    // reset timer value when it reaches 5
    if (timerValue === 5) {
      setTimerValue(0);
    }

    return () => clearInterval(intervalTimerValue);
  }, [timerValue, isTimerActive]);

  useEffect(() => {
    let intervalTimerActive: NodeJS.Timeout;

    if (isTimerActive) {
      intervalTimerActive = setInterval(fetchNewJoke, 5000);
    }

    return () => {
      if (intervalTimerActive) {
        clearInterval(intervalTimerActive);
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
    setTimerValue(0);
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

      {isTimerActive && (
        <div className="relative">
          <div className="absolute w-full px-2 rounded-full overflow-hidden opacity-50">
            <div
              className="h-[1px] transition-all duration-1000 bg-blue-800"
              style={{ width: timerValue * 25 + "%" }}
            />
          </div>
        </div>
      )}
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
