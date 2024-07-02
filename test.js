var test = require("tape");
var exec = require("child_process").execSync;

const eq = (t, a, b) => {
  t.equal(a, b, `Expected '${b}', got '${a}'`);
};

test("branch a", function (t) {
  t.plan(1);
  try {
    const o = exec("npm run test-scrif-1");
    eq(t, o.toString().split("\n").at(-2), "BRANCH A");
  } catch (e) {
    t.fail(e);
  }
});
test("branch b", function (t) {
  t.plan(1);
  try {
    const o = exec("npm run test-scrif-1 foo");
    eq(t, o.toString().split("\n").at(-2), "BRANCH B");
  } catch (e) {
    t.fail(e);
  }
});
test("passing args", function (t) {
  t.plan(1);
  try {
    const o = exec("npm run test-scrif-1 foo bar");
    eq(t, o.toString().split("\n").at(-2), "BRANCH B bar");
  } catch (e) {
    t.fail(e);
  }
});
test("arg order", function (t) {
  t.plan(1);
  try {
    const o = exec("npm run test-scrif-1 bar foo foo");
    eq(t, o.toString().split("\n").at(-2), "BRANCH B bar foo");
  } catch (e) {
    t.fail(e);
  }
});
