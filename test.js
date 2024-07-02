var test = require("tape");
var exec = require("child_process").execSync;
var spawn = require("child_process").spawnSync;

const eq = (t, a, b) => {
  t.equal(a, b, `Expected '${b}', got '${a}'`);
};

test("branch a", function (t) {
  t.plan(1);
  try {
    const o = exec("npm run test-scrif-1");
    eq(t, o.toString().split("\n").at(-2), "BRANCH B");
  } catch (e) {
    t.fail(e);
  }
});
test("branch b", function (t) {
  t.plan(1);
  try {
    const o = exec("npm run test-scrif-1 foo");
    eq(t, o.toString().split("\n").at(-2), "BRANCH A");
  } catch (e) {
    t.fail(e);
  }
});
test("passing args", function (t) {
  t.plan(1);
  try {
    const o = exec("npm run test-scrif-1 foo bar");
    eq(t, o.toString().split("\n").at(-2), "BRANCH A bar");
  } catch (e) {
    t.fail(e);
  }
});
test("arg order", function (t) {
  t.plan(1);
  try {
    const o = exec("npm run test-scrif-1 bar foo foo");
    eq(t, o.toString().split("\n").at(-2), "BRANCH A bar foo");
  } catch (e) {
    t.fail(e);
  }
});
test("trailing ? with no space", function (t) {
  t.plan(1);
  try {
    const o = exec("npm run test-scrif-2 bar foo foo");
    eq(t, o.toString().split("\n").at(-2), "BRANCH A bar foo");
  } catch (e) {
    t.fail(e);
  }
});
test("trailing ? with no space branch b", function (t) {
  t.plan(1);
  try {
    const o = exec("npm run test-scrif-2 bar");
    eq(t, o.toString().split("\n").at(-2), "BRANCH B bar");
  } catch (e) {
    t.fail(e);
  }
});
test("no trailing ?", function (t) {
  t.plan(2);
  const c = spawn("npm", "run test-scrif-3 foo".split(" "));
  eq(t, c.status, 1);
  eq(t, c.stderr.toString().trim(), "scrif: no final ? found.");
});
