import { User, Product, Category, Order, Cart, Review, Coupon } from '@prisma/client'

export type UserRole = 'CUSTOMER' | 'ADMIN' | 'MANAGER' | 'EDITOR' | 'SUPPORT'
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED'
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED'
export type CartStatus = 'ACTIVE' | 'ABANDONED' | 'CONVERTED'
export type CouponType = 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING'
export type AddressType = 'SHIPPING' | 'BILLING'

export interface ExtendedUser extends User {
  addresses?: Address[]
  cart?: CartWithItems
  orders?: Order[]
  reviews?: Review[]
  wishlist?: WishlistItem[]
}

export interface ProductWithDetails extends Product {
  category: Category
  variants: ProductVariant[]
  images: ProductImage[]
  reviews: ReviewWithUser[]
  _count?: {
    reviews: number
  }
}

export interface ProductVariant {
  id: string
  productId: string
  sku: string
  name: string
  color?: string
  size?: string
  price: number
  comparePrice?: number
  costPrice?: number
  stock: number
  weight?: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductImage {
  id: string
  productId: string
  url: string
  alt?: string
  order: number
  isPrimary: boolean
  createdAt: Date
}

export interface CartWithItems extends Cart {
  items: CartItemWithProduct[]
}

export interface CartItemWithProduct {
  id: string
  cartId: string
  productId: string
  productVariantId: string
  quantity: number
  createdAt: Date
  updatedAt: Date
  product: ProductWithDetails
  productVariant: ProductVariant
}

export interface OrderWithItems extends Order {
  items: OrderItemWithProduct[]
  user: User
}

export interface OrderItemWithProduct {
  id: string
  orderId: string
  productId: string
  productVariantId: string
  quantity: number
  price: number
  createdAt: Date
  product: Product
  productVariant: ProductVariant
}

export interface ReviewWithUser extends Review {
  user: User
}

export interface WishlistItem {
  id: string
  userId: string
  productId: string
  createdAt: Date
  product: ProductWithDetails
}

export interface Address {
  id: string
  userId: string
  type: AddressType
  firstName: string
  lastName: string
  company?: string
  street: string
  city: string
  state?: string
  country: string
  postalCode: string
  phone?: string
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[]
  _count?: {
    products: number
  }
}

export interface SearchFilters {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  inStock?: boolean
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'newest' | 'rating'
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ApiResponse<T> {
  data: T
  meta?: PaginationMeta
  message?: string
  success: boolean
}

export interface CheckoutData {
  shippingAddress: Address
  billingAddress?: Address
  paymentMethod: 'stripe' | 'jazzcash' | 'easypaisa' | 'cod'
  couponCode?: string
  notes?: string
}

export interface PaymentIntent {
  id: string
  clientSecret: string
  amount: number
  currency: string
}

export interface AnalyticsEvent {
  event: string
  properties: Record<string, any>
  userId?: string
  sessionId?: string
  timestamp?: Date
}
