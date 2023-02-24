import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppFunctional from "./AppFunctional.js";

// Write your tests here
test("render oluyormu", () => {
  render(<AppFunctional />);
});
