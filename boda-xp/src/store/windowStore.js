import { useSyncExternalStore } from 'react';

let state = {
  windows: [],
  activeId: null,
  nextZ: 10,
};

const listeners = new Set();

function emit() {
  listeners.forEach((listener) => listener());
}

function setState(updater) {
  state = typeof updater === 'function' ? updater(state) : updater;
  emit();
}

function openWindow(win) {
  setState((current) => {
    const existing = current.windows.find((item) => item.id === win.id);
    if (existing) {
      return {
        ...current,
        windows: current.windows.map((item) => (
          item.id === win.id
            ? { ...item, minimized: false, zIndex: current.nextZ }
            : item
        )),
        activeId: win.id,
        nextZ: current.nextZ + 1,
      };
    }

    return {
      ...current,
      windows: [
        ...current.windows,
        {
          ...win,
          minimized: false,
          maximized: false,
          zIndex: current.nextZ,
        },
      ],
      activeId: win.id,
      nextZ: current.nextZ + 1,
    };
  });
}

function closeWindow(id) {
  setState((current) => ({
    ...current,
    windows: current.windows.filter((win) => win.id !== id),
    activeId: current.activeId === id ? null : current.activeId,
  }));
}

function minimizeWindow(id) {
  setState((current) => ({
    ...current,
    windows: current.windows.map((win) => (
      win.id === id ? { ...win, minimized: true } : win
    )),
    activeId: current.activeId === id ? null : current.activeId,
  }));
}

function focusWindow(id) {
  setState((current) => ({
    ...current,
    windows: current.windows.map((win) => (
      win.id === id ? { ...win, minimized: false, zIndex: current.nextZ } : win
    )),
    activeId: id,
    nextZ: current.nextZ + 1,
  }));
}

function toggleWindowFromTaskbar(id) {
  const currentWindow = state.windows.find((win) => win.id === id);
  if (!currentWindow) {
    return;
  }

  if (currentWindow.minimized) {
    focusWindow(id);
    return;
  }

  minimizeWindow(id);
}

function useWindowStore() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => state,
    () => state,
  );
}

state = {
  ...state,
  openWindow,
  closeWindow,
  minimizeWindow,
  focusWindow,
  toggleWindowFromTaskbar,
};

export { useWindowStore };