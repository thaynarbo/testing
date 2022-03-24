const { sum } = require("./calculator");

it("should receive the result of a sum between two numbers", () => {
  expect(sum(2, 2)).toBe(4);
});

it("should sum strings as if they were numbers", () => {
  expect(sum("2", "1")).toBe(3);
});

it("should throw an Error if the input is NaN", () => {
  expect(() => {
    sum(2, "");
  }).toThrowError();

  expect(() => {
    sum(2);
  }).toThrowError();

  expect(() => {
    sum([2, 2]);
  }).toThrowError();

  expect(() => {
    sum({});
  }).toThrowError();

  expect(() => {
    sum();
  }).toThrowError();
});
