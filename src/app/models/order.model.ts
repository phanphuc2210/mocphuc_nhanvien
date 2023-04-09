export interface Order {
    id?: Number
    userId: Number
    name?: String
    order_date?: Date
    customer_name?: string
    address: String
    phone: String
    payment_method: String
    status?: number
    status_name?: string
    code?: string
    discount?: number
}

export interface Order_Detail {
    orderId?: Number
    productId?: Number
    name?: String
    image?:String
    price?:number
    quantity: number
}

export interface Payment {
    order: Order
    order_details: Order_Detail[]
}