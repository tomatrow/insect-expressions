import { writable as _writable } from "svelte/store"

export function writable<T>(key: string, startValue: T) {
    const { subscribe, set, update } = _writable(startValue)

    return {
        subscribe,
        set,
        update,
        useLocalStorage: () => {
            const json = localStorage.getItem(key)
            if (json) set(JSON.parse(json))
            subscribe(current => localStorage.setItem(key, JSON.stringify(current)))
        }
    }
}
