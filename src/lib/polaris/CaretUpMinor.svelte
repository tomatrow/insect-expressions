<script>
    export let size = "100%"
    export let strokeWidth = 2
    let clazz = ""
    export let style = ""
    export { clazz as class }
    if (size !== "100%") {
        size =
            size.slice(-1) === "x" ? size.slice(0, size.length - 1) + "em" : parseInt(size) + "px"
    }
</script>

<svg
    {style}
    class={clazz}
    width={size}
    height={size}
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"><path d="M15 12l-5-5-5 5h10z" /></svg
>
