import { useState } from 'react';
import { useWindowStore } from '../../store/windowStore';
import { DESKTOP_ICON_IDS, WINDOW_DEFS } from '../../data/windows';
import styles from './Desktop.module.css';

export default function Desktop() {
  const { openWindow } = useWindowStore();
  const [selectedId, setSelectedId] = useState(null);
  const icons = DESKTOP_ICON_IDS.map((key) => WINDOW_DEFS[key]);

  return (
    <div className={styles.desktop}>
      {icons.map(icon => (
        <div
          key={icon.id}
          className={`${styles.icon} ${selectedId === icon.id ? styles.selected : ''}`}
          onClick={() => setSelectedId(icon.id)}
          onDoubleClick={() => openWindow(icon)}
        >
          <span className={styles.emoji}>{icon.icon}</span>
          <span className={styles.label}>{icon.label}</span>
        </div>
      ))}
    </div>
  );
}