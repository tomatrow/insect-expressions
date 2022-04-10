export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export interface Link {
    href: string 
    title: string 
    target?: string
}

export interface Image {
    src: string
    alt?: string
    srcset?: string
}

export enum Platform {
    instagram = "instagram",
    facebook = "facebook"
}