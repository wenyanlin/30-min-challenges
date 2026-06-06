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
    let cancelled = false;
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(url);
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);
        if (!cancelled) setData(json);
      } catch (error) {
        if (!cancelled) setError(error as Error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    if (url) load();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, isLoading, error };
}
