export interface Order {
    id?: Number
    userId: Number
    name?: String
    order_date?: Date
    address: String
    phone: String
    payment_method: String
    status?: number
    status_name?: string
}

export interface Order_Detail {
    orderId?: Number
    productId?: Number
    name?: String
    image?:String
    price?:number
    quantity: number
}