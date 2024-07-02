#!/usr/bin/env node

/*
 * scrif
 * to use scrif, add it to npm scripts, e.g.
 * "start": "scrif dev ? npm run dev : npm run production"
 * then, you can pass strings that match the args in scrif to run the branch, e.g.
 * npm run start dev
 */

var spawn = require("child_process").spawn;
var search = [],
  c1 = [],
  c2 = [],
  phase = 0,
  extra = [];
var args = process.argv.slice(2);

// Get a list of search terms before ?
for (var i = 0; i < args.length; i++) {
  if (args[i] === "?") {
    phase++;
    args = args.slice(i + 1);
    break;
  } else {
    search.push(args[i]);
  }
}
if (phase < 1) {
  console.error("scrif: no ? found.");
  process.exit(1);
}
if (search.length === 0) {
  console.error("scrif: no search term found.");
  process.exit(1);
}

// Get a list of commands separated by :
for (var i = 0; i < args.length; i++) {
  if (args[i] === ":") {
    phase++;
    continue;
  } else if (args[i] === "?") {
    phase++;
    continue;
  }
  if (phase === 3) {
    extra.push(args[i]);
  } else {
    var a = args[i];
    // handle a last question mark without a space before it
    if (a[a.length - 1] === "?") {
      phase++;
    }
    (phase === 2 ? c1 : c2).push(a);
  }
}

console.log(search, extra);

// Look through our extra args and if we find conditions, remove them.
for (var i = 0; i < extra.length; i++) {
  for (var s = 0; s < search.length; s++) {
    if (extra[i] === search[s]) {
      // When we find a search term, remove it from both sets.
      search = search.slice(0, s).concat(search.slice(s + 1));
      extra = extra.slice(0, i).concat(extra.slice(i + 1));
      break;
    }
  }
  if (search.length === 0) {
    phase++;
    break;
  }
}
console.log(search, extra);
console.log(c1);
console.log(c2);

// If we found all the terms, phase will be 4.
var ex = (phase === 4 ? c1 : c2).concat(extra);
spawn(ex[0], ex.slice(1), {
  stdio: "inherit",
});
