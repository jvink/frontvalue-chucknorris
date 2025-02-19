import JokesList from "./components/JokeList";
import type { Joke } from "./types";

async function getInitialJokes(): Promise<Joke[]> {
  const jokes = await Promise.all(
    Array(10)
      .fill(null)
      .map(async () => {
        const { signal } = new AbortController();
        const response = await fetch(
          "https://api.chucknorris.io/jokes/random",
          { signal }
        );
        return response.json();
      })
  );
  return jokes;
}

export default async function Home() {
  const initialJokes = await getInitialJokes();

  return <JokesList initialJokes={initialJokes} />;
}
