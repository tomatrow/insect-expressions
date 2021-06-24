import type { Action } from "./common"

export interface BridgeOptions {
    enable: boolean
    action: Action
    parameters: any
}

// use the action if enable == true, supplying the param to the action
export function bridge(node: HTMLElement, bridgeParameters: BridgeOptions): ReturnType<Action> {
    let instance: ReturnType<Action>

    function destroy() {
        instance?.destroy?.()
    }

    function update({ enable, action, parameters }: BridgeOptions) {
        destroy()
        if (enable) instance = action(node, parameters)
    }

    update(bridgeParameters)

    return {
        update,
        destroy
    }
}
