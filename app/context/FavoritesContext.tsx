"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

import type { Joke } from "../types";

interface FavoritesContextType {
  favorites: Joke[];
  addFavorite: (joke: Joke) => void;
  removeFavorite: (jokeId: string) => void;
  isFavorite: (jokeId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Joke[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addFavorite = (joke: Joke) => {
    if (favorites.length >= 10) {
      alert("Maximum 10 favorites allowed!");
      return;
    }
    if (!favorites.some((fav) => fav.id === joke.id)) {
      const newFavorites = [...favorites, joke];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  const removeFavorite = (jokeId: string) => {
    const newFavorites = favorites.filter((joke) => joke.id !== jokeId);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const isFavorite = (jokeId: string) => {
    return favorites.some((fav) => fav.id === jokeId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
