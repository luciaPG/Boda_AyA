import { useState, useEffect } from 'react';
import { useWindowStore } from '../../store/windowStore';
import { WINDOW_DEFS } from '../../data/windows';
import styles from './Taskbar.module.css';

export default function Taskbar() {
  const [time, setTime] = useState(new Date());
  const { windows, activeId, openWindow, toggleWindowFromTaskbar } = useWindowStore();

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 10000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={styles.taskbar}>
      <button className={styles.startBtn} onClick={() => openWindow(WINDOW_DEFS.boda)}>
        <span className={styles.startFlag}>🪟</span>
        inicio
      </button>

      <div className={styles.tasks}>
        {windows.map((win) => (
          <button
            key={win.id}
            className={`${styles.task} ${activeId === win.id && !win.minimized ? styles.activeTask : ''}`}
            onClick={() => toggleWindowFromTaskbar(win.id)}
          >
            {win.icon} {win.title.replace(' - Bloc de notas', '').replace('.exe', '')}
          </button>
        ))}
      </div>

      <div className={styles.tray}>{timeStr}</div>
    </div>
  );
}