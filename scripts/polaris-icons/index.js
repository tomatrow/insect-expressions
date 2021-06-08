import { promises as fs } from "fs"
import { join } from "path"
import iconList from "./icon-list.js"

const component = svg =>
`<script>
  export let size = "100%"
  export let strokeWidth = 2
  let clazz = ""
  export let style = ""
  export { clazz as class }
  if (size !== "100%") {
    size = size.slice(-1) === 'x' 
          ? size.slice(0, size.length -1) + 'em'
          : parseInt(size) + 'px'
  }
</script>
${svg.replace("<svg", `<svg {style} class={clazz} width={size} height={size} focusable="false" aria-hidden="true"`)}
`
const dest = process.argv[2]
const scriptPath = process.argv[1]

if (!dest) throw new Error("Specify a directory")

async function build() {
    try {
        await fs.rmdir(dest, { recursive: true })
    } catch {}
    
    await fs.mkdir(dest)
    
    const { exportList, writeFunctions } = [ ...new Set(iconList) ].reduce((out, name) => {
        
        // const file = join("./node_modules/@shopify/polaris-icons/dist/svg/", name + ".svg")
        out.exportList.push(`export { default as ${name} } from './${name}.svelte'`)
        out.writeFunctions.push((async function() {
            const svg = await fs.readFile(join(scriptPath, "/node_modules/@shopify/polaris-icons/dist/svg/", name + ".svg"), { encoding: "utf8" })
            return fs.writeFile(join(dest, `${name}.svelte`), component(svg), { encoding: 'utf8' })
        })())
        return out 
    }, { exportList: [], writeFunctions: [] })

    await Promise.all([
        ...writeFunctions,
        fs.writeFile(join(dest, 'index.ts'), exportList.join('\n'), { encoding: 'utf8' })
    ])
}

build()