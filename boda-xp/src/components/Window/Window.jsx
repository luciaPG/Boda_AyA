import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styles from './Window.module.css';

const TASKBAR_HEIGHT = 38;
const EDGE_GAP = 4;
const MIN_WIDTH = 320;
const MIN_HEIGHT = 220;

function clampRect(position, size) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const maxWidth = Math.max(MIN_WIDTH, viewportWidth - EDGE_GAP * 2);
  const maxHeight = Math.max(MIN_HEIGHT, viewportHeight - TASKBAR_HEIGHT - EDGE_GAP * 2);
  const width = Math.min(Math.max(Number(size.width) || MIN_WIDTH, MIN_WIDTH), maxWidth);
  const height = Math.min(Math.max(Number(size.height) || MIN_HEIGHT, MIN_HEIGHT), maxHeight);
  const x = Math.min(Math.max(Number(position.x) || EDGE_GAP, EDGE_GAP), Math.max(EDGE_GAP, viewportWidth - width - EDGE_GAP));
  const y = Math.min(Math.max(Number(position.y) || EDGE_GAP, EDGE_GAP), Math.max(EDGE_GAP, viewportHeight - TASKBAR_HEIGHT - height - EDGE_GAP));

  return {
    position: { x, y },
    size: { width, height },
  };
}

export default function Window({
  id,
  title,
  icon,
  children,
  initialPosition = { x: 80, y: 60 },
  initialSize = { width: 520, height: 420 },
  isActive,
  isMinimized,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
  menuItems = ['Archivo', 'Editar', 'Ver', 'Ayuda'],
  statusBar,
}) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const previousRect = useRef(null);
  const dragRef = useRef({ isDragging: false, offsetX: 0, offsetY: 0 });
  const resizeRef = useRef({ isResizing: false, startX: 0, startY: 0, startWidth: 0, startHeight: 0 });
  const positionRef = useRef(position);
  const sizeRef = useRef(size);

  useLayoutEffect(() => {
    positionRef.current = position;
    sizeRef.current = size;
  }, [position, size]);

  useLayoutEffect(() => {
    if (isMaximized) {
      return;
    }

    const fitted = clampRect(initialPosition, initialSize);
    setPosition(fitted.position);
    setSize(fitted.size);
  }, [initialPosition, initialSize, isMaximized]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (dragRef.current.isDragging) {
        const nextPosition = {
          x: event.clientX - dragRef.current.offsetX,
          y: event.clientY - dragRef.current.offsetY,
        };
        const fitted = clampRect(nextPosition, sizeRef.current);
        setPosition(fitted.position);
      }

      if (resizeRef.current.isResizing) {
        const nextSize = {
          width: resizeRef.current.startWidth + (event.clientX - resizeRef.current.startX),
          height: resizeRef.current.startHeight + (event.clientY - resizeRef.current.startY),
        };
        const fitted = clampRect(positionRef.current, nextSize);
        setSize(fitted.size);
      }
    };

    const handleMouseUp = () => {
      dragRef.current.isDragging = false;
      resizeRef.current.isResizing = false;
    };

    const handleViewportResize = () => {
      if (isMaximized) {
        return;
      }

      const fitted = clampRect(positionRef.current, sizeRef.current);
      setPosition(fitted.position);
      setSize(fitted.size);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleViewportResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleViewportResize);
    };
  }, [isMaximized]);

  const handleDragStart = (event) => {
    if (isMaximized) return;
    onFocus?.();
    dragRef.current = {
      isDragging: true,
      offsetX: event.clientX - positionRef.current.x,
      offsetY: event.clientY - positionRef.current.y,
    };
  };

  const toggleMaximized = () => {
    if (isMaximized) {
      if (previousRect.current) {
        setPosition(previousRect.current.position);
        setSize(previousRect.current.size);
      }
      setIsMaximized(false);
      return;
    }

    previousRect.current = { position: positionRef.current, size: sizeRef.current };
    setPosition({ x: EDGE_GAP, y: EDGE_GAP });
    setSize({
      width: window.innerWidth - EDGE_GAP * 2,
      height: window.innerHeight - TASKBAR_HEIGHT - EDGE_GAP * 2,
    });
    setIsMaximized(true);
  };

  const style = isMaximized
    ? {
      top: EDGE_GAP,
      left: EDGE_GAP,
      width: `calc(100vw - ${EDGE_GAP * 2}px)`,
      height: `calc(100vh - ${TASKBAR_HEIGHT + EDGE_GAP * 2}px)`,
      zIndex,
    }
    : {
      top: position.y,
      left: position.x,
      width: size.width,
      height: size.height,
      zIndex,
      display: isMinimized ? 'none' : 'flex',
    };

  return (
    <div
      id={`win-${id}`}
      className={`${styles.window} ${isActive ? styles.active : ''}`}
      style={style}
      onMouseDown={() => onFocus?.()}
      data-min={isMinimized ? '1' : '0'}
      data-maxed={isMaximized ? '1' : '0'}
    >
      <div className={styles.titleBar} onMouseDown={handleDragStart}>
        <div className={styles.titleLeft}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.buttons}>
          <button type="button" className={styles.btn} onClick={onMinimize}>_</button>
          <button type="button" className={styles.btn} onClick={toggleMaximized}>□</button>
          <button type="button" className={`${styles.btn} ${styles.close}`} onClick={onClose}>×</button>
        </div>
      </div>
      <div className={styles.menuBar}>
        {menuItems.map((item) => <span key={item}>{item}</span>)}
      </div>
      <div className={styles.content}>{children}</div>
      {statusBar ? <div className={styles.statusBar}>{statusBar}</div> : null}
      <div
        className={styles.resizeHandle}
        onMouseDown={(event) => {
          if (isMaximized) return;
          event.preventDefault();
          event.stopPropagation();
          onFocus?.();
          resizeRef.current = {
            isResizing: true,
            startX: event.clientX,
            startY: event.clientY,
            startWidth: sizeRef.current.width,
            startHeight: sizeRef.current.height,
          };
        }}
      />
    </div>
  );
}