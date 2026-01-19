import { add } from "./main.ts";
import { it, expect } from "vitest";

it("addTest", () => {
  expect(add(2, 3)).toBe(5);
});
