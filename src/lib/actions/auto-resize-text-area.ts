import type { Action } from "./common"

function resize(input: HTMLElement) {
    input.style.height = "1px"
    input.style.height = +input?.scrollHeight + "px"
}

export function autoResizeTextArea(node: HTMLElement): ReturnType<Action> {
    resize(node)
    node.style.overflow = "hidden"

    function onInput({ target }: Event) {
        resize(target as HTMLElement)
    }

    node.addEventListener("input", onInput)

    return {
        destroy() {
            node.removeEventListener("input", onInput)
        }
    }
}
