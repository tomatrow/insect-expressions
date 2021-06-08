const c = [
    () => import("../../../src/routes/__layout.svelte"),
    () => import("../../../src/routes/__error.svelte"),
    () => import("../../../src/routes/index.svelte"),
    () => import("../../../src/routes/collections/index.svelte"),
    () => import("../../../src/routes/collections/[handle].svelte"),
    () => import("../../../src/routes/products/[handle].svelte"),
    () => import("../../../src/routes/account/index.svelte"),
    () => import("../../../src/routes/account/addresses.svelte"),
    () => import("../../../src/routes/account/activate/[id]/[token].svelte"),
    () => import("../../../src/routes/account/register.svelte"),
    () => import("../../../src/routes/account/logout.svelte"),
    () => import("../../../src/routes/account/orders/[handle].svelte"),
    () => import("../../../src/routes/account/login.svelte"),
    () => import("../../../src/routes/account/reset/[id]/[token].svelte"),
    () => import("../../../src/routes/search.svelte"),
    () => import("../../../src/routes/blogs/[blog_handle]/index.svelte"),
    () => import("../../../src/routes/blogs/[blog_handle]/[article_handle].svelte"),
    () => import("../../../src/routes/pages/[handle].svelte"),
    () => import("../../../src/routes/cart.svelte")
]

const d = decodeURIComponent

export const routes = [
    // src/routes/index.svelte
    [/^\/$/, [c[0], c[2]], [c[1]]],

    // src/routes/collections/index.svelte
    [/^\/collections\/?$/, [c[0], c[3]], [c[1]]],

    // src/routes/collections/[handle].svelte
    [/^\/collections\/([^/]+?)\/?$/, [c[0], c[4]], [c[1]], m => ({ handle: d(m[1]) })],

    // src/routes/products/[handle].svelte
    [/^\/products\/([^/]+?)\/?$/, [c[0], c[5]], [c[1]], m => ({ handle: d(m[1]) })],

    // src/routes/account/index.svelte
    [/^\/account\/?$/, [c[0], c[6]], [c[1]]],

    // src/routes/account/addresses.svelte
    [/^\/account\/addresses\/?$/, [c[0], c[7]], [c[1]]],

    // src/routes/account/activate/[id]/[token].svelte
    [
        /^\/account\/activate\/([^/]+?)\/([^/]+?)\/?$/,
        [c[0], c[8]],
        [c[1]],
        m => ({ id: d(m[1]), token: d(m[2]) })
    ],

    // src/routes/account/register.svelte
    [/^\/account\/register\/?$/, [c[0], c[9]], [c[1]]],

    // src/routes/account/logout.svelte
    [/^\/account\/logout\/?$/, [c[0], c[10]], [c[1]]],

    // src/routes/account/orders/[handle].svelte
    [/^\/account\/orders\/([^/]+?)\/?$/, [c[0], c[11]], [c[1]], m => ({ handle: d(m[1]) })],

    // src/routes/account/login.svelte
    [/^\/account\/login\/?$/, [c[0], c[12]], [c[1]]],

    // src/routes/account/reset/[id]/[token].svelte
    [
        /^\/account\/reset\/([^/]+?)\/([^/]+?)\/?$/,
        [c[0], c[13]],
        [c[1]],
        m => ({ id: d(m[1]), token: d(m[2]) })
    ],

    // src/routes/search.svelte
    [/^\/search\/?$/, [c[0], c[14]], [c[1]]],

    // src/routes/blogs/[blog_handle]/index.svelte
    [/^\/blogs\/([^/]+?)\/?$/, [c[0], c[15]], [c[1]], m => ({ blog_handle: d(m[1]) })],

    // src/routes/blogs/[blog_handle]/[article_handle].svelte
    [
        /^\/blogs\/([^/]+?)\/([^/]+?)\/?$/,
        [c[0], c[16]],
        [c[1]],
        m => ({ blog_handle: d(m[1]), article_handle: d(m[2]) })
    ],

    // src/routes/pages/[handle].svelte
    [/^\/pages\/([^/]+?)\/?$/, [c[0], c[17]], [c[1]], m => ({ handle: d(m[1]) })],

    // src/routes/cart.svelte
    [/^\/cart\/?$/, [c[0], c[18]], [c[1]]]
]

export const fallback = [c[0](), c[1]()]
