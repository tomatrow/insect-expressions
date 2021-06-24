import { get } from "svelte/store"
import { writable } from "./persistentStore"
import { graphql, mutation } from "./query"

const CheckoutFragment = graphql`
    fragment CheckoutFragment on Checkout {
        id
        webUrl
        totalTax
        subtotalPrice
        totalPrice
        lineItems(first: 250) {
            edges {
                node {
                    id
                    title
                    variant {
                        id
                        title
                        quantityAvailable
                        price
                        selectedOptions {
                            name
                            value
                        }
                        image {
                            src
                            altText
                        }
                    }
                    quantity
                }
            }
        }
    }
`

const checkoutCreate = graphql`
    mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
            userErrors {
                message
                field
            }
            checkout {
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`

const checkoutLineItemsAdd = graphql`
    mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
        checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
            userErrors {
                message
                field
            }
            checkout {
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`

const checkoutLineItemsUpdate = graphql`
    mutation checkoutLineItemsUpdate(
        $checkoutId: ID!
        $lineItems: [CheckoutLineItemUpdateInput!]!
    ) {
        checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
            userErrors {
                message
                field
            }
            checkout {
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`

const checkoutLineItemsRemove = graphql`
    mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
        checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
            userErrors {
                message
                field
            }
            checkout {
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`

const checkoutCustomerAssociate = graphql`
    mutation checkoutCustomerAssociate($checkoutId: ID!, $customerAccessToken: String!) {
        checkoutCustomerAssociate(
            checkoutId: $checkoutId
            customerAccessToken: $customerAccessToken
        ) {
            userErrors {
                field
                message
            }
            checkout {
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`

export let checkout = writable("checkout", null)
export default checkout

export async function createCheckout(input = {}) {
    const { data } = await mutation(checkoutCreate, { input })
    checkout.set(data.checkoutCreate.checkout)
    return data
}

export async function addVariantToCart(variantId: string, quantity: number) {
    const { data } = await mutation(checkoutLineItemsAdd, {
        checkoutId: get(checkout).id,
        lineItems: [{ variantId, quantity }]
    })
    checkout.set(data.checkoutLineItemsAdd.checkout)
    return data
}

export async function updateLineItemInCart(lineItemId: string, quantity: string) {
    const { data } = await mutation(checkoutLineItemsUpdate, {
        checkoutId: get(checkout).id,
        lineItems: [{ id: lineItemId, quantity: parseInt(quantity, 10) }]
    })
    checkout.set(data.checkoutLineItemsUpdate.checkout)
    return data
}

export async function removeLineItemInCart(lineItemId: string) {
    const { data } = await mutation(checkoutLineItemsRemove, {
        checkoutId: get(checkout).id,
        lineItemIds: [lineItemId]
    })
    checkout.set(data.checkoutLineItemsRemove.checkout)
    return data
}

export async function associateCustomerCheckout(customerAccessToken: string) {
    const { data } = await mutation(checkoutCustomerAssociate, {
        checkoutId: get(checkout).id,
        customerAccessToken
    })
    checkout.set(data.checkoutCustomerAssociate.checkout)
    return data
}
