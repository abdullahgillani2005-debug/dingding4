import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItemWithProduct } from '@/types'

interface CartStore {
  items: CartItemWithProduct[]
  isOpen: boolean
  addItem: (item: Omit<CartItemWithProduct, 'id' | 'cartId' | 'createdAt' | 'updatedAt'>) => void
  removeItem: (productVariantId: string) => void
  updateQuantity: (productVariantId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productVariantId === newItem.productVariantId
          )
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productVariantId === newItem.productVariantId
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              ),
            }
          }
          
          return {
            items: [...state.items, {
              ...newItem,
              id: `temp-${Date.now()}`,
              cartId: 'temp',
              createdAt: new Date(),
              updatedAt: new Date(),
            }],
          }
        })
      },
      
      removeItem: (productVariantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.productVariantId !== productVariantId
          ),
        }))
      },
      
      updateQuantity: (productVariantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productVariantId)
          return
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.productVariantId === productVariantId
              ? { ...item, quantity }
              : item
          ),
        }))
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },
      
      openCart: () => {
        set({ isOpen: true })
      },
      
      closeCart: () => {
        set({ isOpen: false })
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.productVariant.price * item.quantity),
          0
        )
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
