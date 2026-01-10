# 🎯 Trivia Trail

A fun, interactive quiz web app with a welcome screen, countdown timer, sound effects, and score tracking. Test your knowledge and see how many questions you can get right!

---

## 🚀 Features
- Welcome page with **Start Quiz** button
- Multiple-choice trivia questions
- 10-second countdown timer per question
- Visual timer animation with warning when time is low
- Correct & wrong answer sound effects
- Score summary at the end
- Play Again functionality
- Mobile-friendly layout (responsive design)

---

## 🧠 How the App Works

### 1. Welcome Page
- Shown when the app loadds
- User clicks **Start Quiz** to begin
- Quiz logic does **not** start until the button is clicked

📍**Code location:**
- HTML: `index.html` -> `<div id="welcome-page">`
- JavaScript: `startBtn.addEventListener(...)` in `script.js`

---

### 2. Quiz Logic
- Questions are stored in an array (`ALL_QUESTIONS`)
- One question is displayed at a time
- Answers are dynamically generated as buttons

📍 **Code location:**
- JavaScript: `ALL_QUESTIONS` array
- Function: `showQuestion()` in `script.js`

---

### 3. Timer System
- Each question has 10 seconds
- Timer updates every second
- Auto-reveals correct answer when time runs out
- Visual warning (animation) when <= 3 seconds remain

📍 **Code location:**
- Function: `startTimer()`

---

### 4. Answer Handling
- Clicking an answer checks correctness
- Correct answers turn **green**
- Wrong answers turn **red**
- All buttons disable after a selection
- Score increments on correct answers

📍 **Code location:**
- Function: `selectAnswer()`
- Function: `showCorrectAnswer()`

---

### 5. Sound Effects
- Correct answer sound plays on correct selection
- Wrong answer sound plays on incorrect selection
- Sounds may briefly continue if user clicks quickly (expected behavior)

📍 **Code location:**
- JavaScript audio objects: `correctSound`, `wrongSound`
- Audio files stored in `sounds/` folder

---

### 6. Score & Restart
- Final score is displayed after the last question
- **Play Again** button restarts the quiz

📍 **Code location:**
- Function: `showScore()`
- Function: `startQuiz()`

---