# Understanding Autism

An interactive educational website helping children aged 6–12 understand autism through stories, games, and simulations. Built as a final year project at Goldsmiths, University of London.

## What this Software Does

This is a web-based educational platform that teaches non-autistic children about autism in a positive manner. It uses interactive stories, empathy games, a sensory overload simulator, and a quiz with a printable certificate to promote understanding and inclusion.

## Core Features Implemented

- **Interactive Stories ("Walk in My Shoes")** – Three branching narratives where the child's choices affect the outcome, teaching empathy through relatable school scenarios
- **Empathy Game ("Be a Good Friend")** – Tap to select kind vs unkind responses to situations involving autistic classmates, with explanatory feedback
- **Educational Pages ("What is Autism?")** – Six illustrated step-by-step pages explaining autism in child-friendly language with fun facts
- **Sensory Overload Simulator** – A slider-controlled visual experience demonstrating what sensory overload feels like, with a reflection screen
- **Autism Ally Quiz** – Seven multiple-choice questions with immediate feedback; score ≥70% earns a printable certificate
- **Printable Certificate** – Personalised "Autism Ally" certificate with the child's name, date, and their avatar
- **Avatar System** – SVG-based customisable avatar (skin tone, hair, eyes, outfit, accessories) created on first visit and persisted in localStorage; avatar appears on the home page, quiz, empathy game, stories, and certificate
- **Calm Mode** – Accessibility toggle that reduces animations and uses muted colours
- **Responsive Design** – Works on desktop, tablet, and mobile
- **Backend API** – RESTful Express server with MySQL, prepared for session and progress tracking (not yet connected to the frontend — see Known Limitations)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6 |
| Styling | Custom CSS with CSS variables |
| Backend | Node.js, Express |
| Database | MySQL 8 |
| Security | express-rate-limit (100 req/15 min), CORS |
| Fonts | Fredoka (display), Nunito (body) — self-hosted woff2 |

## Project Structure

```
understanding-autism/
├── client/                     # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/         # Reusable UI components
│       │   ├── Navbar.js       # Navigation with calm mode toggle
│       │   ├── Footer.js       # Site footer with resource links
│       │   ├── ModuleCard.js   # Activity card for home page
│       │   ├── FeedbackBanner.js  # Feedback after choices
│       │   ├── ProgressBar.js  # Visual progress indicator
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
│       │   ├── EmpathyGamePage.js  # Kind response selection game
│       │   ├── SensorySim.js   # Sensory overload simulator
│       │   ├── QuizPage.js     # Multiple choice quiz
│       │   └── CertificatePage.js  # Printable certificate
│       ├── data/               # Static content data files
│       │   ├── stories.js      # Branching story data
│       │   ├── quizQuestions.js # Quiz questions and answers
│       │   ├── empathyScenarios.js  # Empathy game scenarios
│       │   ├── educationPages.js    # Learning page content
│       │   └── avatarAssets.js      # Avatar option definitions and defaults
│       ├── hooks/
│       │   └── useAvatar.js    # localStorage avatar persistence hook
│       ├── styles/
│       │   └── index.css       # Global styles and CSS variables
│       ├── api.js              # Axios API helper
│       ├── App.js              # Root component with routing
│       └── index.js            # React entry point
├── server/                     # Express backend
│   ├── config/
│   │   ├── db.js               # MySQL connection pool
│   │   └── schema.sql          # Database schema + seed data
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
│   ├── .env.example            # Environment variable template
│   ├── index.js                # Server entry point
│   └── package.json
├── package.json                # Root package.json
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

1. Open MySQL and create the database:

```bash
mysql -u root -p < server/config/schema.sql
```

This creates the `understanding_autism` database with all tables and seed data.

### Step 3: Configure Environment Variables

```bash
cd server
cp .env.example .env
```

The following environment variables are required in `server/.env`:

```
PORT=5000
DB_HOST=localhost
DB_USER=autism_app
DB_PASSWORD=MMZeroDeparture
DB_NAME=understanding_autism
DB_PORT=3306
CLIENT_URL=http://localhost:3000
```

> **Note:** `server/.env` contains sensitive credentials and should not be committed to version control. In a production deployment this file would be excluded via `.gitignore`.

Also create `client/.env` for the frontend API URL:

```
REACT_APP_API_URL=http://localhost:5000
```

### Step 4: Install Dependencies

From the project root:

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install

# Go back to root
cd ..
```

Or use the shortcut:

```bash
npm run install-all
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

No login is required. The system uses anonymous sessions. Simply open the website and start exploring the activities.

To test the quiz certificate: answer at least 5 out of 7 questions correctly (70% threshold).

## Known Limitations / What Is Not Yet Implemented

- **User sessions**: The session/progress API is built but not yet connected to the frontend (progress is currently tracked in component state only). This would be a future improvement.
- **Database-driven content**: Educational content (stories, quiz questions, education pages, empathy scenarios) is currently served from static JS data files in `client/src/data/`. The backend API and database schema are ready to serve this content once connected.
- **Empathy game interaction**: The empathy game uses click/tap selection, which was chosen for better mobile accessibility.
- **Audio narration**: Planned but not yet implemented. Would use the Web Speech API.
- **User testing with children**: Not conducted for ethical/safeguarding reasons at this stage.
- **WCAG audit**: Basic accessibility features are implemented (keyboard navigation, ARIA labels, calm mode, alt text). A Lighthouse audit has been run and colour contrast issues have been resolved, but a full manual accessibility audit has not yet been conducted.

## Accessibility Features

- Calm Mode toggle (reduces motion, softens colours)
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
