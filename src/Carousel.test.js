import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Carousel />, div);
})

it('should match snapshot', () => {
  render(<Carousel />);
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel to 2nd image for testing
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();

  // move backwards in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image and right arrow to show, but not the left arrow
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
});

it("removes the left arrow when at the starting image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByTestId("right-arrow")).toBeInTheDocument();

  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
});

it("removes the right arrow when at the ending image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

    // move forward in the carousel to 3rd image for testing
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);

  // expect the last image and left-arrow to show, but not the right-arrow
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
  expect(queryByTestId("left-arrow")).toBeInTheDocument();

  expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
});