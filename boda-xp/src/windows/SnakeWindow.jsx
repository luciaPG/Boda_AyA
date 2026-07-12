import { useEffect, useRef, useState } from 'react';

export default function SnakeWindow() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const loopRef = useRef(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('Pulsa una flecha para empezar');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const grid = 14;
    const cols = canvas.width / grid;
    const rows = canvas.height / grid;

    function placeFood(state) {
      let food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
      while (state.snake.some((segment) => segment.x === food.x && segment.y === food.y)) {
        food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
      }
      state.food = food;
    }

    function draw(state) {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ff4747';
      ctx.fillRect(state.food.x * grid, state.food.y * grid, grid - 1, grid - 1);
      state.snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#7fff5a' : '#3fbf2f';
        ctx.fillRect(segment.x * grid, segment.y * grid, grid - 1, grid - 1);
      });
    }

    function reset() {
      const nextState = {
        snake: [{ x: 6, y: 7 }, { x: 5, y: 7 }, { x: 4, y: 7 }],
        dir: { x: 1, y: 0 },
        food: { x: 0, y: 0 },
        score: 0,
        alive: true,
        started: false,
      };
      placeFood(nextState);
      stateRef.current = nextState;
      setScore(0);
      setStatus('Pulsa una flecha para empezar');
      draw(nextState);
    }

    function step() {
      const state = stateRef.current;
      if (!state?.alive) {
        return;
      }

      const head = { x: state.snake[0].x + state.dir.x, y: state.snake[0].y + state.dir.y };
      const hitWall = head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows;
      const hitSelf = state.snake.some((segment) => segment.x === head.x && segment.y === head.y);

      if (hitWall || hitSelf) {
        state.alive = false;
        setStatus('Game over — pulsa una flecha para reiniciar');
        return;
      }

      state.snake.unshift(head);
      if (head.x === state.food.x && head.y === state.food.y) {
        state.score += 10;
        setScore(state.score);
        placeFood(state);
      } else {
        state.snake.pop();
      }
      draw(state);
    }

    function loop() {
      step();
      if (stateRef.current?.alive) {
        loopRef.current = window.setTimeout(loop, 110);
      }
    }

    function handleKey(event) {
      const map = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };
      const nextDirection = map[event.key];
      if (!nextDirection) {
        return;
      }

      event.preventDefault();

      if (!stateRef.current?.alive) {
        reset();
      }

      const state = stateRef.current;
      if (!state.started) {
        state.started = true;
        setStatus('¡A por él!');
        loop();
      }

      if (state.snake.length > 1 && nextDirection.x === -state.dir.x && nextDirection.y === -state.dir.y) {
        return;
      }

      state.dir = nextDirection;
    }

    reset();
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
      if (loopRef.current) {
        window.clearTimeout(loopRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div className="snake-hud"><span>Puntos: {score}</span><span>{status}</span></div>
      <canvas ref={canvasRef} id="snakeCanvas" width="280" height="280" />
      <div className="snake-help">Usa las flechas del teclado · haz clic en el juego primero</div>
    </div>
  );
}