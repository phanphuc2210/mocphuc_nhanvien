
export interface Voucher {
    id?: number
    code?: string
    discount: number
    release_date: Date
    expiration_date: Date
    applicable_productType: number
    applicable_productName?: string
    bill_from: number
    quantity: number
}