import React, { useRef, useEffect, useState } from "react";

const CANVAS_W = 800;
const CANVAS_H = 400;
const GRAVITY = 0.55;
const JUMP_VEL = -13;
const MOVE_SPEED = 4;

const SKIN_COLOURS = {
  light:  "#FDDBB4",
  medium: "#E8AC72",
  tan:    "#C68642",
  dark:   "#8D5524",
  deep:   "#4A2912",
};

// checks if the player's bottom edge crossed the platform's top edge between the previous and current frame
// this sweep avoids clipping through thin platforms at high downward velocity
function resolveGroundCollision(player, platform) {
  const prevBottom = player.y + player.height - player.vy;
  const curBottom  = player.y + player.height;
  const withinX = player.x + player.width > platform.x && player.x < platform.x + platform.w;
  const crossedTop = prevBottom <= platform.y && curBottom >= platform.y;
  if (withinX && crossedTop) {
    player.y  = platform.y - player.height;
    player.vy = 0;
    return true;
  }
  return false;
}

function overlaps(player, rect) {
  return (
    player.x < rect.x + rect.w &&
    player.x + player.width > rect.x &&
    player.y < rect.y + rect.h &&
    player.y + player.height > rect.y
  );
}

// centre-to-centre distance check for collecting items (16 = half player width, 8 = half collectible width)
function overlapsPoint(player, point, radius) {
  const dx = (player.x + 16) - (point.x + 8);
  const dy = (player.y + 16) - (point.y + 8);
  return Math.sqrt(dx * dx + dy * dy) < radius + 16;
}

function respawn(gs) {
  gs.lives--;
  gs._onLifeLost && gs._onLifeLost(gs.lives);
  if (gs.lives <= 0) {
    gs._onDie && gs._onDie();
    return;
  }
  Object.assign(gs.player, { x: 40, y: 310, vx: 0, vy: 0, onGround: false });
}

function update(gs, level) {
  if (gs.finished) return;
  const p = gs.player;
  const isLeft  = gs.keys.left  || gs.touchButtons.left;
  const isRight = gs.keys.right || gs.touchButtons.right;
  const isJump  = gs.keys.up    || gs.touchButtons.jump;

  if (isLeft)       p.vx = -MOVE_SPEED;
  else if (isRight) p.vx =  MOVE_SPEED;
  else              p.vx = 0;

  if (isJump && p.onGround) {
    p.vy = JUMP_VEL;
    p.onGround = false;
    // consume the jump input so holding the key doesn't trigger a new jump every frame
    gs.keys.up = false;
    gs.touchButtons.jump = false;
  }

  p.vy += GRAVITY;
  p.x  += p.vx;
  p.y  += p.vy;

  if (p.x < 0) p.x = 0;

  p.onGround = false;
  for (const plat of level.platforms) {
    if (resolveGroundCollision(p, plat)) p.onGround = true;
  }

  if (p.y > CANVAS_H + 50) {
    respawn(gs);
    return;
  }

  for (const hz of level.hazards) {
    if (overlaps(p, hz)) {
      respawn(gs);
      return;
    }
  }

  for (const c of gs.collectibles) {
    if (!c.collected && overlapsPoint(p, c, 16)) {
      c.collected = true;
      gs.heartsCollected++;
      gs._onCollect && gs._onCollect(gs.heartsCollected);
    }
  }

  if (p.x + p.width >= level.goalX && Math.abs((p.y + p.height) - (level.goalY + 32)) < 60) {
    gs.finished = true;
    gs._onComplete && gs._onComplete(gs.heartsCollected);
  }
}

// manual roundRect polyfill because ctx.roundRect is only available in Chrome 99+ / Firefox 112+ / Safari 15.4+
function fillRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

function draw(gs, level, ctx, playerColor) {
  // Background
  ctx.fillStyle = level.bgColor;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Platforms
  for (const plat of level.platforms) {
    ctx.fillStyle = plat.color || "#8BC34A";
    fillRoundRect(ctx, plat.x, plat.y, plat.w, plat.h, 4);
    // grass highlight on top
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(plat.x + 4, plat.y, plat.w - 8, 4);
  }

  // Hazards (overwhelm clouds)
  ctx.font = "28px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const hz of level.hazards) {
    ctx.fillText("😟", hz.x + hz.w / 2, hz.y + hz.h / 2);
  }

  // Collectibles
  ctx.font = "18px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const c of gs.collectibles) {
    if (c.collected) continue;
    ctx.fillText(c.type == "heart" ? "❤️" : "⭐", c.x + 8, c.y + 8);
  }

  // Goal flag
  ctx.font = "28px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🏠", level.goalX + 16, level.goalY + 14);

  // Player body
  const p = gs.player;
  ctx.fillStyle = playerColor;
  fillRoundRect(ctx, p.x, p.y, p.width, p.height, 8);

  // Eyes
  ctx.fillStyle = "#2D2D2D";
  ctx.beginPath();
  ctx.arc(p.x + 10, p.y + 12, 3, 0, Math.PI * 2);
  ctx.arc(p.x + 22, p.y + 12, 3, 0, Math.PI * 2);
  ctx.fill();

  // Smile
  ctx.strokeStyle = "#2D2D2D";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(p.x + 16, p.y + 20, 6, 0.1 * Math.PI, 0.9 * Math.PI);
  ctx.stroke();
}

function PlatformerGame({ level, avatar, onComplete, onDie }) {
  const canvasRef = useRef(null);
  // game state lives in a ref rather than useState so the 60fps loop never triggers React re-renders
  // only the HUD values (livesDisplay, heartsDisplay) use useState because those need to update the UI
  const gameStateRef = useRef({
    player: { x: 40, y: 310, vx: 0, vy: 0, onGround: false, width: 32, height: 32 },
    collectibles: [],
    lives: 3,
    heartsCollected: 0,
    keys: { left: false, right: false, up: false },
    touchButtons: { left: false, right: false, jump: false },
    frameId: null,
    finished: false,
    _onComplete: null,
    _onDie: null,
    _onCollect: null,
    _onLifeLost: null,
  });

  const [livesDisplay, setLivesDisplay]   = useState(3);
  const [heartsDisplay, setHeartsDisplay] = useState(0);
  const totalHearts = level.collectibles.length;

  const playerColor = SKIN_COLOURS[avatar?.skin_tone] || SKIN_COLOURS.medium;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const gs     = gameStateRef.current;

      // reset all mutable game state for the incoming level
    gs.player = { x: 40, y: 310, vx: 0, vy: 0, onGround: false, width: 32, height: 32 };
    gs.collectibles = level.collectibles.map(c => ({ ...c, collected: false }));
    gs.lives = 3;
    gs.heartsCollected = 0;
    gs.finished = false;
    setLivesDisplay(3);
    setHeartsDisplay(0);

    // store callbacks on the ref so the game loop closure always calls the latest version
    // without this, the loop would capture stale props/state from the render it was created in
    gs._onCollect  = (count) => setHeartsDisplay(count);
    gs._onLifeLost = (lives) => setLivesDisplay(lives);
    gs._onComplete = (hearts) => {
      cancelAnimationFrame(gs.frameId);
      onComplete(hearts);
    };
    gs._onDie = () => {
      cancelAnimationFrame(gs.frameId);
      onDie();
    };

    const handleKeyDown = (e) => {
      // prevent the browser scrolling the page when the player presses arrow keys or space
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key == "ArrowLeft")               gs.keys.left = true;
      if (e.key == "ArrowRight")              gs.keys.right = true;
      if (e.key == "ArrowUp" || e.key == " ") gs.keys.up = true;
    };
    const handleKeyUp = (e) => {
      if (e.key == "ArrowLeft")               gs.keys.left  = false;
      if (e.key == "ArrowRight")              gs.keys.right = false;
      if (e.key == "ArrowUp" || e.key == " ") gs.keys.up    = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup",   handleKeyUp);

    const loop = () => {
      update(gs, level);
      draw(gs, level, ctx, playerColor);
      gs.frameId = requestAnimationFrame(loop);
    };
    gs.frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(gs.frameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup",   handleKeyUp);
    };
  }, [level]);

  const tb = gameStateRef.current.touchButtons;

  return (
    <div className="platformer-game-wrap">
      <div className="platformer-hud">
        <span className="hud-lives">{"❤️".repeat(Math.max(0, livesDisplay))} {livesDisplay > 0 ? "" : "💀"}</span>
        <span className="hud-collect">{heartsDisplay} / {totalHearts} collected</span>
      </div>
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="platformer-canvas"
        tabIndex={0}
        aria-label="Platformer game — use arrow keys to move and jump"
      />
      <div className="platformer-touch-controls">
        <div className="touch-dpad">
          <button
            className="touch-btn touch-left"
            onPointerDown={() => { gameStateRef.current.touchButtons.left = true; }}
            onPointerUp={()   => { gameStateRef.current.touchButtons.left = false; }}
            onPointerLeave={()=> { gameStateRef.current.touchButtons.left = false; }}
            aria-label="Move left"
          >◀</button>
          <button
            className="touch-btn touch-right"
            onPointerDown={() => { gameStateRef.current.touchButtons.right = true; }}
            onPointerUp={()   => { gameStateRef.current.touchButtons.right = false; }}
            onPointerLeave={()=> { gameStateRef.current.touchButtons.right = false; }}
            aria-label="Move right"
          >▶</button>
        </div>
        <button
          className="touch-btn touch-jump"
          onPointerDown={() => { gameStateRef.current.touchButtons.jump = true; }}
          onPointerUp={()   => { gameStateRef.current.touchButtons.jump = false; }}
          onPointerLeave={()=> { gameStateRef.current.touchButtons.jump = false; }}
          aria-label="Jump"
        >▲</button>
      </div>
      <p className="platformer-hint">Arrow keys or on-screen buttons to move · Space / ▲ to jump</p>
    </div>
  );
}

export default PlatformerGame;
