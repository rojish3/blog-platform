import { test, expect } from "vitest";
import NavBar from "../components/NavBar";

test("Navbar renders without errors", () => {
  expect(NavBar).not.toBeNull();
});
