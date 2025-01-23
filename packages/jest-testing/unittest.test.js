const myFunctions = require("./SampleFuncs.js");
test("Testing div -- success", () => {
  const target = 5;
  const result = myFunctions.div(30, 6);
  expect(target).toBe(result);
});

test("Testing div -- divide by 1", () => {
  const target = 5;
  const result = myFunctions.div(5, 1);
  expect(target).toBe(result);
});

test("Testing containsNumber -- false", () => {
    const target = false;
    const result = myFunctions.containsNumbers("notnumber");
    expect(target).toBe(result);
  });

  test("Testing containsNumber -- true", () => {
    const target = true;
    const result = myFunctions.containsNumbers("This contains numbers : 7 8 9 10.");
    expect(target).toBe(result);
  });

  test("Testing containsNumber -- empty", () => {
    const target = false;
    const result = myFunctions.containsNumbers("");
    expect(target).toBe(result);
  });

  test("Testing containsNumber -- with spaces", () => {
    const target = false;
    const result = myFunctions.containsNumbers("notnumber with spaces");
    expect(target).toBe(result);
  }); 