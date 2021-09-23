const f /* files */ = [
  { // f[0]
    path: "/index",
    import: () => import("/Users/ajcaldwell/src/optional-default-insect-expressions/shopify-remake01/src/index.svench"),
    "id": "rvc2go",
    "ext": ".svench",
    "dir": "",
    "segment": "index",
    "sortKey": "index",
    "title": "index",
    "canonical": "/index",
    "options": {},
    "views": [],
    "headings": []
  },
  { // f[1]
    path: "/lib/components/Button/index",
    import: () => import("/Users/ajcaldwell/src/optional-default-insect-expressions/shopify-remake01/src/lib/components/Button/index.svench"),
    "id": "1drkbbe",
    "ext": ".svench",
    "dir": "lib/components/Button",
    "segment": "index",
    "sortKey": "index",
    "title": "index",
    "canonical": "/lib/components/Button/index",
    "options": {},
    "views": [
      "buttons"
    ],
    "headings": []
  },
  { // f[2]
    path: "/lib/components/Footer/index",
    import: () => import("/Users/ajcaldwell/src/optional-default-insect-expressions/shopify-remake01/src/lib/components/Footer/index.svench"),
    "id": "830g5x",
    "ext": ".svench",
    "dir": "lib/components/Footer",
    "segment": "index",
    "sortKey": "index",
    "title": "index",
    "canonical": "/lib/components/Footer/index",
    "options": {},
    "views": [
      "Footer"
    ],
    "headings": []
  }
]

const d /* dirs */ = [
  { // d[0]
    path: "/lib/components/Button",
    "id": "102ncpd",
    "ext": undefined,
    "dir": "lib/components",
    "segment": "Button",
    "sortKey": "Button",
    "title": "Button",
    "canonical": "/lib/components/Button",
    children: () => []
  },
  { // d[1]
    path: "/lib/components/Footer",
    "id": "172xo1i",
    "ext": undefined,
    "dir": "lib/components",
    "segment": "Footer",
    "sortKey": "Footer",
    "title": "Footer",
    "canonical": "/lib/components/Footer",
    children: () => []
  },
  { // d[2]
    path: "/lib/components",
    "id": "quaqj2",
    "ext": undefined,
    "dir": "lib",
    "segment": "components",
    "sortKey": "components",
    "title": "components",
    "canonical": "/lib/components",
    children: () => [d[0], d[1]]
  },
  { // d[3]
    path: "/lib",
    "id": "13bzfkj",
    "ext": undefined,
    "dir": ".",
    "segment": "lib",
    "sortKey": "lib",
    "title": "lib",
    "canonical": "/lib",
    children: () => [d[2]]
  }
]

for (const g of [f, d])
  for (const x of g) x.children = x.children ? x.children() : []

const routes = [...f, ...d]

const tree = {
  path: "/",
  isRoot: true,
  "id": undefined,
  "ext": undefined,
  "dir": undefined,
  "segment": undefined,
  "sortKey": undefined,
  "title": undefined,
  "canonical": undefined,
  children: [
    d[3]
  ]
}

export { f as files, d as dirs, routes, tree }
