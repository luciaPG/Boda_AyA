import './styles/xp.css';
import { useWindowStore } from './store/windowStore';
import Window from './components/Window/Window';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';
import ConfirmWindow from './windows/ConfirmWindow';
import PuebloWindow from './windows/PuebloWindow';
import BodaWindow from './windows/BodaWindow';
import FotosWindow from './windows/FotosWindow';
import SnakeWindow from './windows/SnakeWindow';
import { WINDOW_DEFS } from './data/windows';

const COMPONENTS = {
  confirm: ConfirmWindow,
  pueblo: PuebloWindow,
  boda: BodaWindow,
  fotos: FotosWindow,
  snake: SnakeWindow,
};

export default function App() {
  const store = useWindowStore();
  const { windows, activeId, closeWindow, minimizeWindow, focusWindow } = store;

  return (
    <div className="desktop-shell">
      <div className="hill hill-2" />
      <div className="hill hill-1" />
      <Desktop />

      {windows.map(win => {
        const Component = COMPONENTS[win.component];
        const def = WINDOW_DEFS[win.component];
        return (
          <Window
            key={win.id}
            id={win.id}
            title={def.title}
            icon={def.icon}
            isActive={activeId === win.id}
            isMinimized={win.minimized}
            zIndex={win.zIndex}
            initialPosition={def.initialPosition}
            initialSize={def.initialSize}
            menuItems={def.menuItems}
            statusBar={def.statusBar}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onFocus={() => focusWindow(win.id)}
          >
            <Component />
          </Window>
        );
      })}

      <Taskbar />
    </div>
  );
}