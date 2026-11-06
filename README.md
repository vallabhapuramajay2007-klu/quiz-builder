# Quiz Builder (Modular React + Vite)

## Project modules
- `index.html` — main HTML page.
- `src/main.jsx` — React entry point.
- `src/App.jsx` — app state and page navigation.
- `src/styles.css` — all CSS styling.
- `src/components/Header.jsx` — navigation header.
- `src/components/Dashboard.jsx` — dashboard and quiz list.
- `src/components/QuizEditor.jsx` — create and remove quiz questions.
- `src/components/QuizAttempt.jsx` — attempt questions and submit answers.
- `src/components/Reports.jsx` — score reports.
- `src/data/sampleQuizzes.js` — starter quiz data.
- `src/utils/storage.js` — Local Storage helper functions.

## Run
1. Install Node.js.
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the localhost URL shown in the terminal.

## Build
Run `npm run build`. Vite creates the production website in the `dist` folder.

## Note
This is a frontend project. Local Storage is specific to the current browser/device. True multi-device live quiz rooms need a backend and real-time database.
