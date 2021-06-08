
// pages/$layout.svelte-1cf3a8a0.js -> layout.svelte-1cf3a8a0.js
export function shopifyCDNFormat(filename) {
    return filename
        // shopify rejects names that start in a bracket, or maybe contain a bracket
        .replace(/[\[\]]/g, "")
        .replaceAll("/", "_")
}