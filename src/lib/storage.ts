import { useEffect, useState } from 'react';

export function useSaved<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => {
    try { return JSON.parse(sessionStorage.getItem(`herizon:${key}`) || 'null') ?? fallback; }
    catch { return fallback; }
  });
  useEffect(() => { try { sessionStorage.setItem(`herizon:${key}`, JSON.stringify(value)); } catch { /* Private browsing may disable storage. */ } }, [key, value]);
  return [value, setValue] as const;
}
