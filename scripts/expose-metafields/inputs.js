/*
    Owner Types:
        ARTICLE
        BLOG
        COLLECTION
        CUSTOMER
        DRAFTORDER
        ORDER
        PAGE
        PRODUCT
        PRODUCTIMAGE
        PRODUCTVARIANT
        SHOP
*/

const metaTree = {
    SHOP: ["brand", "header", "footer"]
}

const namespace = "kit"

const list = Object.entries(metaTree)
    .flatMap(([ownerType, keys]) => {
        return keys.map(key => ({ namespace, key, ownerType }))
    })

export default list
