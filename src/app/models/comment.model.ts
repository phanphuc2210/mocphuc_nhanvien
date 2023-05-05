export interface Comment {
    userId: Number
    productId: Number
    username?: string
    avatar?: string
    message: string
    image?: string
    star: number
    time?: Date
}