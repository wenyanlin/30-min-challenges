import { useEffect, useState } from "react";

type UseFetchReturn<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

export function useFetch<T>(url: string): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;

    const abortController = new AbortController();

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setData(null);
        const res = await fetch(url, { signal: abortController.signal });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);
        setData(json);
      } catch (error: unknown) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    if (url) load();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, isLoading, error };
}
