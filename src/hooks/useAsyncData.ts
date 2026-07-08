import { useEffect, useRef, useState } from "react";
import type { DependencyList } from "react";
import type { AsyncState } from "@/types/common";

export function useAsyncData<T>(fetcher: () => Promise<T>, deps: DependencyList = []): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ data: null, isLoading: true, error: null });
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let isMounted = true;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    fetcherRef
      .current()
      .then((data) => {
        if (isMounted) setState({ data, isLoading: false, error: null });
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const message = err instanceof Error ? err.message : "Something went wrong.";
          setState({ data: null, isLoading: false, error: message });
        }
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
