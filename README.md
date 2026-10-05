# vibe-git-practice

A throwaway static web page, built for the sole purpose of practising the
`git init -> add -> commit -> push` loop against GitHub.

## What's in here

| File         | Purpose                                              |
| ------------ | ---------------------------------------------------- |
| `index.html` | The page markup: 4 self-contained demo sections      |
| `style.css`  | Dark-theme styling, no framework needed              |
| `app.js`     | Counter, todo list (localStorage), random colour     |
| `.gitignore` | Things that must never be committed                  |

## Run it

No build step and no dependencies. Either:

```powershell
start index.html
```

or serve it, so `localStorage` behaves normally:

```powershell
python -m http.server 8000
```

## The practice loop

```powershell
git status                       # what changed?
git diff                         # exactly what changed
git add index.html               # stage only this file
git commit -m "Update heading"
git push                         # ship it
```

Edit section 4 of `index.html`, then run the loop above and watch the diff.
