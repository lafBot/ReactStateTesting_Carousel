import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Card />, div);
});

it('should match snapshot', () => {
    render(<Card />);
});