<script lang="ts">
    import ContactForm from "./ContactForm.svelte"
    import Link from "$lib/components/Link.svelte"
    import Section from "$lib/components/structure/Section.svelte"
    import Heading from "$lib/components/structure/Heading.svelte"
    import SocialIcon from "$lib/components/SocialIcon.svelte"

    let clazz = ""
    export { clazz as class }
</script>

<footer
    class="{clazz} text-dark grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-10 divide-y divide-primary md:divide-y-0"
>
    {#each linkSections as { title, links }}
        <Section class="gap-y-1 flex items-center md:items-start flex-col py-10 md:py-0">
            <Heading class="hidden md:block mb-4 font-bold">{title}</Heading>
            <ul>
                {#each links as link}
                    <li>
                        <Link secondary {...link} />
                    </li>
                {/each}
            </ul>
        </Section>
    {/each}

    <Section
        class="gap-y-1 flex items-center md:items-start flex-col justify-center md:justify-start py-8 md:py-0"
    >
        <Heading class="hidden md:block mb-4 font-bold">Social</Heading>
        <ul class="gap-x-2 flex justify-center">
            {#each [...Array(3).keys()] as i}
                <li>
                    <Link href="#">
                        {i}
                    </Link>
                </li>
            {/each}
        </ul>
    </Section>
    <Section>
        <ContactForm />
    </Section>
</footer>
