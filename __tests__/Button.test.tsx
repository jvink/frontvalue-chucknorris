import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Button from "@/app/components/Button";

describe("Button", () => {
  it("renders a Button", () => {
    render(<Button>Click me</Button>);

    const button = document.querySelector("button");
    expect(button).toBeInTheDocument();

    expect(button).toHaveTextContent("Click me");
  });


  it("renders a destructive Button", () => {
    render(<Button variant="destructive">Don't click me</Button>);

    const button = document.querySelector("button");
    expect(button).toBeInTheDocument();

    expect(button).toHaveTextContent("Don't click me");
    expect(button).toHaveClass("bg-red-500 text-white");
  });

  it("renders an outlined Button", () => {
    render(<Button variant="outline">Outline</Button>);

    const button = document.querySelector("button");
    expect(button).toBeInTheDocument();

    expect(button).toHaveTextContent("Outline");
    expect(button).toHaveClass("bg-[#0A0A0A] border border-[#282828]");
  });
});
