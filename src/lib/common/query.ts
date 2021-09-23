export function query(query: string, variables = {}) {
    return primitiveQuery(query, variables)
}

export function mutation(query: string, variables = {}) {
    return primitiveQuery(query, variables)
}

export async function primitiveQuery(query: string, variables: Record<string, any>) {
    const headers: HeadersInit = {
        "X-Shopify-Storefront-Access-Token": import.meta.env
            .VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string
    }
    let body: string

    if (variables === undefined) {
        // @ts-ignore
        headers["Content-Type"] = "application/graphql"
        body = query
    } else {
        Object.assign(headers, {
            "Content-Type": "application/json",
            Accept: "application/json"
        })
        body = JSON.stringify({ query, variables })
    }

    // const fetch =
    //     typeof window !== "undefined"
    //         ? window.fetch
    //         : ((await import("node-fetch").then(
    //               mod => mod.default
    //           )) as WindowOrWorkerGlobalScope["fetch"])

    const response = await fetch(
        `https://${import.meta.env.VITE_SHOPIFY_SHOP_URL}/api/${
            import.meta.env.VITE_SHOPIFY_STOREFRONT_VERSION
        }/graphql.json`,
        {
            method: "post",
            headers,
            body
        }
    )
    const json = await response.json()
    if (json.errors) throw new Error(json.errors[0]?.message)
    return json
}

// just to get prettier to autocorrect syntax
export function graphql(strings: TemplateStringsArray, ...keys: string[]) {
    return strings.reduce((acc, next, index) => {
        return acc + next + (keys[index] ?? "")
    }, "")
}
