import{S as e,i as t,s as n,e as a,k as r,t as i,c as l,a as s,n as o,g as d,d as c,b as u,f as g,E as h,h as m,F as p,R as f,Z as y}from"../../chunks/vendor-2580730b.js";import{g as $,q as H}from"../../chunks/query-0568da8d.js";import"../../chunks/preload-helper-9f12a5fd.js";$`
    query($handle: String!) {
        blogByHandle(handle: $handle) {
            title
            handle
            id
            articles(first: 250) {
                edges {
                    node {
                        id
                        title
                        handle
                        image {
                            altText
                            originalSrc
                        }
                    }
                }
            }
        }
    }
`,$`
    {
        blogs(first: 250) {
            edges {
                node {
                    id
                    title
                    handle
                    articles(first: 1) {
                        edges {
                            node {
                                id
                                excerptHtml
                                image {
                                    originalSrc
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;const v=$`
    fragment ProductFragment on Product {
        availableForSale
        id
        title
        description
        descriptionHtml
        productType
        handle
        options {
            name
            values
        }
        images(first: 250) {
            edges {
                node {
                    originalSrc
                    altText
                }
            }
        }
        priceRange {
            maxVariantPrice {
                amount
                currencyCode
            }
            minVariantPrice {
                amount
                currencyCode
            }
        }
        variants(first: 250) {
            edges {
                node {
                    id
                    sku
                    price
                    availableForSale
                    quantityAvailable
                    selectedOptions {
                        name
                        value
                    }
                }
            }
        }
    }
`;$`
    query($handle: String!) {
        productByHandle(handle: $handle) {
            ...ProductFragment
        }
    }
    ${v}
`,$`
    {
        collections(first: 250) {
            edges {
                node {
                    id
                    handle
                    title
                    descriptionHtml
                    image {
                        id
                        altText
                        originalSrc
                    }
                }
            }
        }
    }
`,$`
    query($handle: String!) {
        pageByHandle(handle: $handle) {
            id
            title
            body
        }
    }
`,$`
    query($blogHandle: String!, $articleHandle: String!) {
        blogByHandle(handle: $blogHandle) {
            id
            articleByHandle(handle: $articleHandle) {
                id
                title
                contentHtml
                image {
                    id
                    altText
                    originalSrc
                }
                blog {
                    id
                    title
                    handle
                }
            }
        }
    }
`;const S=$`
    query($handle: String!, $size: Int!, $cursor: String) {
        collectionByHandle(handle: $handle) {
            id
            title
            descriptionHtml
            image {
                id
                originalSrc
                altText
            }
            products(first: $size, after: $cursor) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    cursor
                    node {
                        ...ProductFragment
                    }
                }
            }
        }
    }
    ${v}
`;async function x(e,t,n=10){const{data:a}=await H(S,{handle:e,cursor:t,size:n});return a.collectionByHandle}function P(e){return new Intl.NumberFormat("en-us",{style:"currency",currency:"USD"}).format(e)}function b(e,t,n){const a=e.slice();return a[2]=t[n].title,a[5]=t[n].images,a[6]=t[n].handle,a[7]=t[n].priceRange,a}function q(e){let t,n,p,f,y,$,H,v,S,x,b,q,B,F=e[2]+"",T=P(e[7].minVariantPrice.amount)+"";return{c(){t=a("a"),n=a("img"),y=r(),$=a("h2"),H=i(F),v=r(),S=a("span"),x=i("Base Price: "),b=i(T),q=r(),this.h()},l(e){t=l(e,"A",{href:!0});var a=s(t);n=l(a,"IMG",{class:!0,src:!0,alt:!0}),y=o(a),$=l(a,"H2",{class:!0});var r=s($);H=d(r,F),r.forEach(c),v=o(a),S=l(a,"SPAN",{});var i=s(S);x=d(i,"Base Price: "),b=d(i,T),i.forEach(c),q=o(a),a.forEach(c),this.h()},h(){u(n,"class","w-full h-auto"),n.src!==(p=e[5].edges[0].node.originalSrc)&&u(n,"src",p),u(n,"alt",f=e[5].edges[0].node.altText),u($,"class","text-center"),u(t,"href",B="/products/"+e[6])},m(e,a){g(e,t,a),h(t,n),h(t,y),h(t,$),h($,H),h(t,v),h(t,S),h(S,x),h(S,b),h(t,q)},p(e,a){2&a&&n.src!==(p=e[5].edges[0].node.originalSrc)&&u(n,"src",p),2&a&&f!==(f=e[5].edges[0].node.altText)&&u(n,"alt",f),2&a&&F!==(F=e[2]+"")&&m(H,F),2&a&&T!==(T=P(e[7].minVariantPrice.amount)+"")&&m(b,T),2&a&&B!==(B="/products/"+e[6])&&u(t,"href",B)},d(e){e&&c(t)}}}function B(e){let t,n,$,H,v,S,x=e[1].edges.map(w),P=[];for(let a=0;a<x.length;a+=1)P[a]=q(b(e,x,a));return{c(){t=a("h1"),n=i(e[2]),$=r(),v=r(),S=a("div");for(let e=0;e<P.length;e+=1)P[e].c();this.h()},l(a){t=l(a,"H1",{});var r=s(t);n=d(r,e[2]),r.forEach(c),$=o(a),v=o(a),S=l(a,"DIV",{class:!0});var i=s(S);for(let e=0;e<P.length;e+=1)P[e].l(i);i.forEach(c),this.h()},h(){H=new y(v),u(S,"class","grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3")},m(a,r){g(a,t,r),h(t,n),g(a,$,r),H.m(e[0],a,r),g(a,v,r),g(a,S,r);for(let e=0;e<P.length;e+=1)P[e].m(S,null)},p(e,[t]){if(4&t&&m(n,e[2]),1&t&&H.p(e[0]),2&t){let n;for(x=e[1].edges.map(w),n=0;n<x.length;n+=1){const a=b(e,x,n);P[n]?P[n].p(a,t):(P[n]=q(a),P[n].c(),P[n].m(S,null))}for(;n<P.length;n+=1)P[n].d(1);P.length=x.length}},i:p,o:p,d(e){e&&c(t),e&&c($),e&&H.d(),e&&c(v),e&&c(S),f(P,e)}}}$`
    query($id: ID!) {
        productRecommendations(productId: $id) {
            ...ProductFragment
        }
    }
    ${v}
`;var F=function(e,t,n,a){return new(n||(n=Promise))((function(r,i){function l(e){try{o(a.next(e))}catch(t){i(t)}}function s(e){try{o(a.throw(e))}catch(t){i(t)}}function o(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,s)}o((a=a.apply(e,t||[])).next())}))};function T({page:e}){return F(this,void 0,void 0,(function*(){const{handle:t}=e.params;return{props:yield x(t)}}))}const w=e=>e.node;function I(e,t,n){let{id:a}=t,{title:r}=t,{image:i}=t,{descriptionHtml:l}=t,{products:s}=t;return e.$$set=e=>{"id"in e&&n(3,a=e.id),"title"in e&&n(2,r=e.title),"image"in e&&n(4,i=e.image),"descriptionHtml"in e&&n(0,l=e.descriptionHtml),"products"in e&&n(1,s=e.products)},[l,s,r,a,i]}export default class extends e{constructor(e){super(),t(this,e,I,B,n,{id:3,title:2,image:4,descriptionHtml:0,products:1})}}export{T as load};
