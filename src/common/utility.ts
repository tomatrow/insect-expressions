export function formatMoney(amount: number) {
    return new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD"
    }).format(amount)
}

export function preloadImage(url: string) {
    const image = new Image()
    return new Promise(resolve => {
        image.onload = resolve
        image.src = url
    })
}
