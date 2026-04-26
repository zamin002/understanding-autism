-- Understanding Autism – Database Schema
-- MySQL 8.x
-- Run: mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS understanding_autism
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE understanding_autism;

-- EDUCATIONAL CONTENT

CREATE TABLE modules (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(120)  NOT NULL,
  slug        VARCHAR(60)   NOT NULL UNIQUE,
  description TEXT,
  icon        VARCHAR(10),              -- emoji icon for UI
  sort_order  INT           DEFAULT 0,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE content_pages (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  module_id   INT           NOT NULL,
  title       VARCHAR(200)  NOT NULL,
  body        TEXT          NOT NULL,   -- HTML or markdown content
  page_order  INT           DEFAULT 0,
  image_url   VARCHAR(500),
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

CREATE TABLE scenarios (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  module_id   INT           NOT NULL,
  title       VARCHAR(200)  NOT NULL,
  intro_text  TEXT          NOT NULL,
  scenario_order INT        DEFAULT 0,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

CREATE TABLE scenario_choices (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  scenario_id   INT           NOT NULL,
  choice_text   VARCHAR(300)  NOT NULL,
  is_correct    BOOLEAN       DEFAULT FALSE,
  choice_order  INT           DEFAULT 0,
  FOREIGN KEY (scenario_id) REFERENCES scenarios(id) ON DELETE CASCADE
);

CREATE TABLE feedback (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  choice_id   INT           NOT NULL UNIQUE,  -- 1 feedback per choice
  message     TEXT          NOT NULL,
  is_positive BOOLEAN       DEFAULT FALSE,
  FOREIGN KEY (choice_id) REFERENCES scenario_choices(id) ON DELETE CASCADE
);

-- SESSION & PROGRESS TRACKING (anonymous) 
CREATE TABLE user_sessions (
  id           VARCHAR(36)  PRIMARY KEY,  -- UUID
  display_name VARCHAR(60),               -- optional friendly name
  created_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  last_active  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE module_progress (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  session_id  VARCHAR(36)   NOT NULL,
  module_id   INT           NOT NULL,
  status      ENUM('not_started','in_progress','completed') DEFAULT 'not_started',
  score       INT           DEFAULT 0,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_session_module (session_id, module_id),
  FOREIGN KEY (session_id) REFERENCES user_sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (module_id)  REFERENCES modules(id) ON DELETE CASCADE
);

CREATE TABLE scenario_attempts (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  session_id    VARCHAR(36)   NOT NULL,
  scenario_id   INT           NOT NULL,
  choice_id     INT,
  is_completed  BOOLEAN       DEFAULT FALSE,
  attempted_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id)  REFERENCES user_sessions(id)     ON DELETE CASCADE,
  FOREIGN KEY (scenario_id) REFERENCES scenarios(id)          ON DELETE CASCADE,
  FOREIGN KEY (choice_id)   REFERENCES scenario_choices(id)   ON DELETE SET NULL
);

CREATE TABLE avatars (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  session_id  VARCHAR(36)  NOT NULL UNIQUE,
  skin_tone   VARCHAR(20)  NOT NULL DEFAULT 'medium',
  hair_style  VARCHAR(20)  NOT NULL DEFAULT 'short',
  hair_color  VARCHAR(20)  NOT NULL DEFAULT 'brown',
  eye_style   VARCHAR(20)  NOT NULL DEFAULT 'happy',
  mouth       VARCHAR(20)  NOT NULL DEFAULT 'smile',
  outfit      VARCHAR(20)  NOT NULL DEFAULT 'casual',
  accessory   VARCHAR(20)  NOT NULL DEFAULT 'none',
  skipped     TINYINT(1)   NOT NULL DEFAULT 0,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES user_sessions(id) ON DELETE CASCADE
);

-- APPLICATION USER (least-privilege, avoids running the app as root)
CREATE USER IF NOT EXISTS 'autism_app'@'localhost' IDENTIFIED BY 'MMZeroDeparture';
GRANT SELECT, INSERT, UPDATE ON understanding_autism.* TO 'autism_app'@'localhost';
FLUSH PRIVILEGES;

--SEED DATA

INSERT INTO modules (title, slug, description, icon, sort_order) VALUES
  ('What is Autism?',      'what-is-autism', 'Learn the basics about autism in a friendly, simple way.',              '📖', 1),
  ('Walk in My Shoes',     'story',          'Interactive stories where your choices matter.',                        '📚', 2),
  ('Be a Good Friend',     'empathy-game',   'A game about picking kind and helpful responses.',                      '🤝', 3),
  ('Sensory World',        'sensory-sim',    'Experience what sensory overload can feel like.',                       '🌊', 4),
  ('Autism Ally Quiz',     'quiz',           'Test what you have learned and earn your certificate!',                 '🏅', 5),
  ('Help Sam''s Journey',  'platformer',     'A platformer game where Sam navigates sensory and social challenges.',  '🎮', 6);
