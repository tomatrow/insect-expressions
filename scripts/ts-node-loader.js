// see this issue for why this is even needed
// https://github.com/TypeStrong/ts-node/discussions/1450
import { resolve as resolveTs } from "ts-node/esm"
import * as tsConfigPaths from "tsconfig-paths"
import { pathToFileURL } from "url"

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig()
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths)

export function resolve(specifier, ctx, defaultResolve) {
    const mappedSpecifier = matchPath(specifier)
    
    if (mappedSpecifier) {
        let newSpecifier

        if (mappedSpecifier.endsWith(".json"))
            newSpecifier = pathToFileURL(`${mappedSpecifier}`).href
        else 
            newSpecifier = `${mappedSpecifier}.js`
        
        return resolveTs(newSpecifier, ctx, defaultResolve)
    } else {
        return resolveTs(specifier, ctx, defaultResolve)
    }
}

export { load, transformSource } from "ts-node/esm"
