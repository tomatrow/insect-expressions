export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T

export type Nullable<T> = T | null | undefined

export type Ensure<T> = {
	[P in keyof T]-?: NonNullable<T[P]>
}

export type PickEnsure<T, K extends keyof T> = T & Ensure<Pick<T, K>>

export interface Link {
	href: string
	title?: string
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
