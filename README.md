# Understanding Autism

An interactive educational website helping children aged 6–12 understand autism through stories, games, and simulations. Built as a final year project at Goldsmiths, University of London.

## What this Software Does

This is a web-based educational platform that teaches non-autistic children about autism in a positive manner. It uses interactive stories, empathy games, a platformer game, a sensory overload simulator, and a quiz with a printable certificate to promote understanding and inclusion.

## Core Features Implemented

- **Interactive Stories ("Walk in My Shoes")** – Three branching narratives where the child's choices affect the outcome, teaching empathy through relatable school scenarios
- **Empathy Game ("Be a Good Friend")** – Four scenarios where the child selects kind vs unkind responses (multi-select then submit), with explanatory feedback after each scenario
- **Educational Pages ("What is Autism?")** – Six illustrated step-by-step pages explaining autism in child-friendly language with fun facts
- **Sensory Overload Simulator** – A slider-controlled visual experience demonstrating what sensory overload feels like, with a reflection screen
- **Platformer Game ("Help Sam's Journey")** – A three-level HTML5 Canvas platformer where the player navigates Sam through school environments (busy hallway, loud cafeteria, playground), collecting kindness hearts, avoiding overwhelm hazards, and unlocking an educational message between each level. Playable with keyboard arrow keys or on-screen touch controls
- **Autism Ally Quiz** – Seven multiple-choice questions with immediate feedback; score ≥70% (5/7) earns a printable certificate
- **Printable Certificate** – Personalised "Autism Ally" certificate with the child's name, date, and their avatar
- **Avatar System** – SVG-based customisable avatar (skin tone, hair, eyes, outfit, accessories) created on first visit and persisted in localStorage; avatar appears on the home page, quiz, empathy game, stories, and certificate
- **Audio Narration** – Optional text-to-speech narration (Web Speech API) that reads story scene text and quiz questions aloud; toggled via the 🔊/🔇 button in the navigation bar
- **Calm Mode** – Accessibility toggle that reduces animations and uses muted colours
- **Responsive Design** – Works on desktop, tablet, and mobile
- **Backend API** – RESTful Express server with MySQL handling anonymous sessions and per-module progress tracking, fully connected to the frontend

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6 |
| Styling | Custom CSS with CSS variables |
| Backend | Node.js, Express |
| Database | MySQL 8 |
| Security | express-rate-limit (100 req/15 min general; 10 req/15 min session creation), CORS |
| Fonts | Fredoka (display), Nunito (body) — self-hosted woff2 |

## Project Structure

```
understanding-autism/
├── client/                     # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/         # Reusable UI components
│       │   ├── Navbar.js       # Navigation with calm mode and narration toggles
│       │   ├── Footer.js       # Site footer with resource links
│       │   ├── ModuleCard.js   # Activity card for home page
│       │   ├── FeedbackBanner.js  # Feedback after choices
│       │   ├── ProgressBar.js  # Visual progress indicator
│       │   ├── PlatformerGame.js  # HTML5 Canvas game engine (physics, draw loop)
│       │   └── avatar/         # Avatar system
│       │       ├── AvatarDisplay.js       # SVG avatar renderer
│       │       ├── AvatarBuilder.js       # Full customisation UI
│       │       ├── AvatarCategory.js      # Single category row
│       │       ├── AvatarOnboardingModal.js  # First-visit + edit modal
│       │       └── Avatar.css             # Avatar component styles
│       ├── pages/              # Route-level page components
│       │   ├── HomePage.js     # Landing page with module grid
│       │   ├── LearnPage.js    # Educational content pages
│       │   ├── StoryPage.js    # Interactive branching stories
│       │   ├── EmpathyGamePage.js  # Kind response multi-select game
│       │   ├── SensorySim.js   # Sensory overload simulator
│       │   ├── PlatformerPage.js   # Platformer state machine (select → play → complete)
│       │   ├── QuizPage.js     # Multiple choice quiz
│       │   └── CertificatePage.js  # Printable certificate
│       ├── data/               # Static content data files
│       │   ├── stories.js           # Branching story data
│       │   ├── quizQuestions.js     # Quiz questions and answers
│       │   ├── empathyScenarios.js  # Empathy game scenarios
│       │   ├── educationPages.js    # Learning page content
│       │   ├── platformerLevels.js  # Platformer level definitions (platforms, hazards, collectibles)
│       │   ├── moduleIds.js         # Maps module slugs to database IDs
│       │   └── avatarAssets.js      # Avatar option definitions and defaults
│       ├── hooks/
│       │   ├── useAvatar.js    # localStorage avatar persistence hook
│       │   └── useSession.js   # Anonymous session creation and localStorage persistence hook
│       ├── utils/
│       │   └── narration.js    # Web Speech API speak/stop helpers
│       ├── styles/
│       │   └── index.css       # Global styles and CSS variables
│       ├── api.js              # Axios API helper (modules, sessions, progress, scenarios)
│       ├── App.js              # Root component with routing
│       └── index.js            # React entry point
├── server/                     # Express backend
│   ├── config/
│   │   ├── db.js               # MySQL connection pool
│   │   └── schema.sql          # Database schema + seed data (all 6 modules)
│   ├── models/                 # Database query functions
│   │   ├── ModuleModel.js
│   │   ├── SessionModel.js
│   │   ├── ProgressModel.js
│   │   └── ScenarioModel.js
│   ├── controllers/            # Request handling logic
│   │   ├── moduleController.js
│   │   ├── sessionController.js
│   │   ├── progressController.js
│   │   └── scenarioController.js
│   ├── routes/                 # Express route definitions
│   │   ├── moduleRoutes.js
│   │   ├── sessionRoutes.js
│   │   ├── progressRoutes.js
│   │   └── scenarioRoutes.js
│   ├── index.js                # Server entry point
│   └── package.json
├── package.json                # Root package.json (concurrently dev script)
└── README.md
```

## Setup & Run Instructions

### Prerequisites

- **Node.js** v18 or later – [download here](https://nodejs.org/)
- **MySQL** 8.x – [download here](https://dev.mysql.com/downloads/)
- **npm** (comes with Node.js)

### Step 1: Clone the Repository

```bash
git clone https://github.com/zamin002/understanding-autism.git
cd understanding-autism
```

### Step 2: Set Up the Database

Open a terminal in the project root and run the schema file.

**macOS / Linux / Git Bash:**
```bash
mysql -u root -p < server/config/schema.sql
```

**Windows PowerShell:**
```powershell
Get-Content server/config/schema.sql | mysql -u root -p
```

**Windows Command Prompt:**
```cmd
mysql -u root -p < server\config\schema.sql
```

> **Windows users:** If `mysql` is not recognised as a command, add MySQL to your PATH or use the full executable path, e.g. `"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < server\config\schema.sql`

This creates the `understanding_autism` database (with `utf8mb4` charset for emoji support), all tables, the `autism_app` database user, and seeds all six modules.

### Step 3: Configure Environment Variables

Create `server/.env` with the following contents:

```
PORT=5000
DB_HOST=localhost
DB_USER=autism_app
DB_PASSWORD=MMZeroDeparture
DB_NAME=understanding_autism
DB_PORT=3306
CLIENT_URL=http://localhost:3000
```

Create `client/.env` with the following contents:

```
REACT_APP_API_URL=http://localhost:5000/api
```

> **Note:** Both `.env` files contain credentials and are excluded from version control via `.gitignore`. I would never commit them normally.

### Step 4: Install Dependencies

From the project root, run these commands in order:

**macOS / Linux / Git Bash:**
```bash
npm install
cd server && npm install
cd ../client && npm install && cd ..
```

**Windows PowerShell or Command Prompt:**
```powershell
npm install
cd server
npm install
cd ..\client
npm install
cd ..
```

### Step 5: Run the Application

**Option A – Run both together (recommended):**

```bash
npm run dev
```

**Option B – Run separately:**

```bash
# Terminal 1 – backend
cd server && npm start

# Terminal 2 – frontend
cd client && npm start
```

### Step 6: Open in Browser

The app opens automatically at **http://localhost:3000**

The backend API runs on **http://localhost:5000**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/modules` | List all learning modules |
| GET | `/api/modules/:slug` | Get a module with its content pages |
| POST | `/api/sessions` | Create anonymous session |
| GET | `/api/sessions/:id` | Get session info |
| GET | `/api/progress/:sessionId` | Get progress for a session |
| POST | `/api/progress` | Update module progress |
| GET | `/api/scenarios/module/:moduleId` | Get scenarios for a module |
| GET | `/api/scenarios/:id/choices` | Get choices for a scenario |
| POST | `/api/scenarios/attempt` | Record a scenario attempt |
| GET | `/api/health` | Health check |

## Test Credentials / Sample Inputs

No login is required. The system uses anonymous sessions stored in localStorage. Simply open the website and start exploring the activities.

To test the quiz certificate: answer at least 5 out of 7 questions correctly (70% threshold).

## Known Limitations / What Is Not Yet Implemented

- **Database-driven content**: Stories, quiz questions, education pages, and platformer levels are served from static JS data files in `client/src/data/`. The empathy game scenarios are fully database-driven, served via `/api/scenarios`.
- **Audio narration browser support**: The Web Speech API is available in all modern browsers but voice quality and available voices vary by operating system. There is no fallback for browsers that do not support it.
- **User testing with children**: Not conducted for ethical/safeguarding reasons at this stage.
- **WCAG audit**: Basic accessibility features are implemented (keyboard navigation, ARIA labels, calm mode, alt text). A Lighthouse audit has been run and colour contrast issues have been resolved, but a full manual accessibility audit has not yet been conducted.

## Accessibility Features

- Calm Mode toggle (reduces motion, softens colours)
- Audio narration toggle (reads story scenes and quiz questions aloud via Web Speech API)
- Keyboard-navigable throughout
- ARIA labels on interactive elements
- Semantic HTML structure
- Consistent navigation from every page
- "Back to home" accessible from all pages
- No text input required for children's activities (FR3)
- Skip/continue options on all activities (FR4)
- Print-friendly certificate page

## Author

**Zahir Amin** – Student ID: 33828942
Goldsmiths, University of London – BSc Computer Science
Final Year Project 2025–2026
