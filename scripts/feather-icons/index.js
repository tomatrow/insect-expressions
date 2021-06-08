const feather = require('feather-icons/dist/icons.json')
const pascal = require('just-pascal-case')
const { promises: fs } = require('fs')
const { join } = require('path')
const iconList = require('./icon-list.json')

const handleComponentName = name => name.replace(/\-(\d+)/, '$1')

const component = icon =>
`<script>
  export let size = "100%"
  export let strokeWidth = 2
  let clazz = ""
  export { clazz as class }
  if (size !== "100%") {
    size = size.slice(-1) === 'x' 
          ? size.slice(0, size.length -1) + 'em'
          : parseInt(size) + 'px'
  }
</script>
<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24"  stroke="currentColor" stroke-width="{strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="feather feather-${icon} {clazz}">${feather[icon]}</svg>
`

const [nodePath, scriptPath, dest] = process.argv

if (!dest) { 
    throw new Error("Specify a directory")
}

async function build () {
  try {
      await fs.rmdir(dest, { recursive: true })
  } catch {}
  
  await fs.mkdir(dest)
  
  const { exportList, writeFunctions } = [ ...new Set(iconList) ].reduce((out, icon) => {
    const name = pascal(`${handleComponentName(icon)}-icon`)
    out.exportList.push(`export { default as ${name} } from './${name}.svelte'`)
    out.writeFunctions.push(fs.writeFile(join(dest, `${name}.svelte`), component(icon), { encoding: 'utf8' }))
    return out
  }, { exportList: [], writeFunctions: [] })

  await Promise.all([
    ...writeFunctions,
    fs.writeFile(join(dest, 'index.ts'), exportList.join('\n'), { encoding: 'utf8' })
  ])
}

build()