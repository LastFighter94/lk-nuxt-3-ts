export interface UseLocalStorageResponse<T> {
  value: T;
  set: (value: T) => void;
  remove: () => void;
}

export function getLocaleStorage<T>(key: string, initialValue: T) {
  const valueLS = process.client ? localStorage.getItem(key) : null;
  let value: T;

  try {
    value = valueLS ? JSON.parse(valueLS) : initialValue;
  } catch {
    value = initialValue;
  }

  return value;
}

function getSessionStorage<T>(key: string, initialValue: T) {
  const valueLS = process.client ? sessionStorage.getItem(key) : null;
  let value: T;

  try {
    value = valueLS ? JSON.parse(valueLS) : initialValue;
  } catch {
    value = initialValue;
  }

  return value;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): UseLocalStorageResponse<T> {
  return {
    value: getLocaleStorage(key, initialValue),
    set: (value: T) => localStorage.setItem(key, JSON.stringify(value)),
    remove: () => localStorage.removeItem(key),
  };
}

export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): UseLocalStorageResponse<T> {
  return {
    value: getSessionStorage(key, initialValue),
    set: (value: T) => sessionStorage.setItem(key, JSON.stringify(value)),
    remove: () => sessionStorage.removeItem(key),
  };
}
