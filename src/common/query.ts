export function query(query: string, variables = {}) {
    return primitiveQuery(query, variables)
}

export function mutation(query: string, variables = {}) {
    return primitiveQuery(query, variables)
}

export async function primitiveQuery(query: string, variables: Record<string,any>) {
    const headers: HeadersInit = {
        "X-Shopify-Storefront-Access-Token": import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
    let body: string

    if (variables === undefined) {
        body = query
        headers["Content-Type"] = "application/graphql"
    } else {
        Object.assign(headers, {
            "Content-Type": "application/json",
            Accept: "application/json"
        })
        body = JSON.stringify({ query, variables })
    }
    
	const fetch = typeof window !== 'undefined'
	? window.fetch
	: await import('node-fetch').then(mod => mod.default) as WindowOrWorkerGlobalScope["fetch"]

    return await fetch(`https://${import.meta.env.VITE_SHOPIFY_SHOP_URL}/api/2021-01/graphql.json`, {
        method: "post",
        headers,
        body
    })
        .then(response => response.json())
        .then(json => {
            if (json.errors) throw new Error(json.errors[0].message)
            return json
        })
}

// just to get prettier to autocorrect syntax
export function graphql(strings: TemplateStringsArray, ...keys: string[]) {
    return strings.reduce((acc, next, index) => {
        return acc + next + (keys[index] ?? "")
    }, "")
}
