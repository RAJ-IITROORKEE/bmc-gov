type Listener = () => void;

const listeners = new Set<Listener>();

export const startProgress = () => {
  for (const listener of Array.from(listeners)) {
    try {
      listener();
    } catch {
      // noop
    }
  }
};

export const onProgressStart = (callback: Listener) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};
