import type { Action } from "./common"
import "./underline.scss"

export interface UnderlineActionParameters {
    origin?: string
    color?: string
    maxWidth?: string
    force?: boolean
    scale?: number
}

export function underline(
    node: HTMLElement,
    config: UnderlineActionParameters = {}
): ReturnType<Action> {
    function update(parameters: UnderlineActionParameters = {}) {
        const { origin, color, maxWidth, force, scale } = {
            origin: "center left",
            color: "white",
            maxWidth: "none",
            force: false,
            scale: 1.0,
            ...parameters
        }

        node.classList.add("underline-decoration")
        node.classList[force ? "add" : "remove"]("active-underline")
        node.style.setProperty("--line-origin", origin ?? null)
        node.style.setProperty("--line-color", color ?? null)
        node.style.setProperty("--max-width", maxWidth ?? null)
        node.style.setProperty("--line-scale", scale + "")
    }
    update(config)
    return {
        update
    }
}
