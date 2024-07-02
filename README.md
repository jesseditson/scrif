# `scrif`

simple ternaries in npm scripts

## install

`npm i -D scrif`

## use

to use scrif, add it to npm scripts, e.g.

```json
"start": "scrif dev ? npm run dev : npm run production ?"
```

then, you can pass strings that match the args in scrif to run the branch, e.g.

```bash
npm run start dev
```

## syntax

```
scrif [conditions] ? [branch a] : [branch b] ?
```

Note that the trailing question mark is required.

## complexity

**You can use any number of search terms but all must match**

```json
"cmd": "scrif arg1 arg2 ? ./script-a.sh : ./script-b.sh ?"
```

will run branch a with: `npm run cmd arg1 arg2` but not `npm run cmd arg1`

**You can pass additional args and they will be passed along to both branches**

given

```json
"cmd": "scrif a ? ./script-a.sh : ./script-b.sh ?"
```

```bash
npm run cmd foo bar a
```

will execute `./script-a.sh foo bar`

Order doesn't matter, conditions will be removed from args one time. So for instance:

```bash
npm run cmd a a
```

will execute `./script-a.sh a`
