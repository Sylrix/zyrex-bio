import { CART_STORAGE_KEY, parseCart, type CartLine } from '@/lib/cart-store'

/**
 * localStorage as a proper external store.
 *
 * The cart genuinely lives outside React — in the browser, shared by every
 * open tab. Modelling it that way (subscribe / getSnapshot) rather than
 * copying it into state inside an effect means there is no hydration flash to
 * paper over, and a change made in one tab lands in the others for free.
 *
 * The snapshot is the raw JSON *string*, not the parsed array. `getSnapshot`
 * must return a referentially stable value or React re-renders forever, and a
 * fresh `parseCart(...)` array on every call would do exactly that. Callers
 * parse the string behind a `useMemo`.
 */

const EMPTY = '[]'

const listeners = new Set<() => void>()

/** Mirrors what is in storage so getSnapshot never touches the disk mid-render. */
let snapshot = EMPTY

function readStorage(): string {
  try {
    return window.localStorage.getItem(CART_STORAGE_KEY) ?? EMPTY
  } catch {
    // Private browsing modes can throw on access rather than returning null.
    return EMPTY
  }
}

function emit() {
  for (const listener of listeners) listener()
}

function handleStorageEvent(event: StorageEvent) {
  if (event.key !== null && event.key !== CART_STORAGE_KEY) return
  snapshot = readStorage()
  emit()
}

export function subscribeToCart(listener: () => void): () => void {
  if (listeners.size === 0) {
    snapshot = readStorage()
    window.addEventListener('storage', handleStorageEvent)
  }

  listeners.add(listener)

  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      window.removeEventListener('storage', handleStorageEvent)
    }
  }
}

export function getCartSnapshot(): string {
  return snapshot
}

/** During prerender there is no storage, so the cart starts empty. */
export function getCartServerSnapshot(): string {
  return EMPTY
}

export function writeCart(lines: readonly CartLine[]): void {
  const serialised = JSON.stringify(lines)

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, serialised)
  } catch {
    // Storage full or blocked — keep the in-memory cart working regardless.
  }

  snapshot = serialised
  emit()
}

/** Read-modify-write helper so callers never have to re-parse by hand. */
export function updateCart(
  change: (lines: readonly CartLine[]) => readonly CartLine[]
): void {
  writeCart(change(parseCart(snapshot)))
}
