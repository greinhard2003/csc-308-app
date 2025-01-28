const src = require("./tddsrc.js");

test("Create portfolio", () => {
  const target = new src.Portfolio();
  const result = new src.Portfolio();
  expect(target).toStrictEqual(result);
});

test("Check is empty", () => {
  const myport = new src.Portfolio();
  const target = true;
  const result = myport.isEmpty();
  expect(target).toBe(result);
});

test("Check is not empty", () => {
  const myport = new src.Portfolio();
  myport.portlist.push({ ticker: "abc", shares: 7 });
  const target = false;
  const result = myport.isEmpty();
  expect(target).toBe(result);
});

test("Purchase non-existing", () => {
  const myport = new src.Portfolio();
  myport.purchase("abc", 7);
  const result = myport.portlist[0];
  const target = { ticker: "abc", shares: 7 };
  expect(target).toStrictEqual(result);
});

test("Purchase existing", () => {
  const myport = new src.Portfolio();
  myport.purchase("abc", 7);
  myport.purchase("abc", 7);
  const result = myport.portlist[0];
  const target = { ticker: "abc", shares: 14 };
  expect(target).toStrictEqual(result);
});

test("Sell all", () => {
  const myport = new src.Portfolio();
  myport.purchase("abc", 7);
  myport.sell("abc", 7);
  const result = myport.isEmpty();
  const target = true;
  expect(target).toBe(result);
});

test("Sell some", () => {
  const myport = new src.Portfolio();
  myport.purchase("abc", 7);
  myport.sell("abc", 6);
  const idx = myport.getindex("abc");
  const result = myport.portlist[idx];
  const target = { ticker: "abc", shares: 1 };
  expect(target).toStrictEqual(result);
});

test("Sell not in portfolio", () => {
  const myport = new src.Portfolio();
  expect(() => myport.sell("a", 1)).toThrow(
    "Not possible to sell this number of shares."
  );
});

test("Sell too many", () => {
  const myport = new src.Portfolio();
  myport.purchase("a", 1);
  expect(() => myport.sell("a", 2)).toThrow(
    "Not possible to sell this number of shares."
  );
});

test("Empty portfolio", () => {
  const myport = new src.Portfolio();
  const result = myport.stocks();
  const target = 0;
  expect(target).toBe(result);
});

test("One stock", () => {
  const myport = new src.Portfolio();
  myport.purchase("abc", 10);
  const result = myport.stocks();
  const target = 1;
  expect(target).toBe(result);
});

test("Two stocks", () => {
  const myport = new src.Portfolio();
  myport.purchase("abc", 10);
  myport.purchase("GME", 15);
  const result = myport.stocks();
  const target = 2;
  expect(target).toBe(result);
});

test("Numshares exists", () => {
  const myport = new src.Portfolio();
  myport.purchase("abc", 10);
  const result = myport.numshares("abc");
  const target = 10;
  expect(target).toBe(result);
});

test("Numshares doesn't exist", () => {
  const myport = new src.Portfolio();
  const result = myport.numshares("abc");
  const target = 0;
  expect(target).toBe(result);
});


// I was able to follow the test first approach pretty easily because its how I go about writing
// my code in normally. The red-green-refactor cycle is a little more difficult for me to follow
// because implementing the bare minimum to pass a test case ends up being more work to fix and 
// hit every edge case afterwards in my opinion. I run the test cases multiple times while 
// implementing but I usually skip that one step. I'll keep using TDD because thats how I've 
// trained myself to work on projects and its become second nature//
