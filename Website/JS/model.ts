export interface Aspect {
    id: string,
    value: string
}

export interface Chapter {
    title: string,
    aspects: [Aspect]
}