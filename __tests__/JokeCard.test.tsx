import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import JokeCard from "@/app/components/JokeCard";

jest.mock("lucide-react", () => ({
  Heart: () => "HeartIcon",
  Trash2: () => "TrashIcon",
}));

const mockToggleFavorite = jest.fn();

describe("JokeCard", () => {
  it("renders a JokeCard", () => {
    render(
      <JokeCard
        joke={{ id: "1", value: "Chuck Norris can divide by zero" }}
        isFavorite={false}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    const jokeCard = document.querySelector("div");
    expect(jokeCard).toBeInTheDocument();
  });

  it("renders a favorite JokeCard", () => {
    const { debug } = render(
      <JokeCard
        joke={{ id: "1", value: "Chuck Norris can divide by zero" }}
        isFavorite={true}
        onToggleFavorite={mockToggleFavorite}
      />
    );
    const iconButton = document.querySelector("button")?.textContent;
    expect(iconButton).toBe("HeartIcon");
  });

  it("calls onToggleFavorite when clicking the favorite button", () => {
    const { getByRole } = render(
      <JokeCard
        joke={{ id: "1", value: "Chuck Norris can divide by zero" }}
        isFavorite={false}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    const favoriteButton = getByRole("button");
    favoriteButton.click();

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
  });
});
