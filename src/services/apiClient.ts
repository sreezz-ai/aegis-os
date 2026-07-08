/**
 * Placeholder API client.
 *
 * There is no real backend yet. Every service in `src/services` calls
 * through `resolveAfter` so the rest of the app already codes against
 * an async contract — swapping in real HTTP calls later means changing
 * this file (and each service's implementation), not every consumer.
 */
export function resolveAfter<T>(value: T, delayMs = 350): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), delayMs);
  });
}

export function rejectAfter(message: string, delayMs = 350): Promise<never> {
  return new Promise((_resolve, reject) => {
    setTimeout(() => reject(new Error(message)), delayMs);
  });
}
