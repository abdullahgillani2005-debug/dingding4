'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { X, Search, ShoppingCart, Heart, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cart-store'
import { useWishlistStore } from '@/store/wishlist-store'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { data: session } = useSession()
  const { getTotalItems, openCart } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()

  const cartItemsCount = getTotalItems()
  const wishlistCount = wishlistItems.length

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-background shadow-lg">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="border-b p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-4">
              <Link
                href="/categories"
                className="block text-sm font-medium hover:text-primary transition-colors"
                onClick={onClose}
              >
                Categories
              </Link>
              <Link
                href="/products"
                className="block text-sm font-medium hover:text-primary transition-colors"
                onClick={onClose}
              >
                Products
              </Link>
              <Link
                href="/deals"
                className="block text-sm font-medium hover:text-primary transition-colors"
                onClick={onClose}
              >
                Deals
              </Link>
              <Link
                href="/about"
                className="block text-sm font-medium hover:text-primary transition-colors"
                onClick={onClose}
              >
                About
              </Link>
            </nav>

            {/* User Actions */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Wishlist</span>
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cart</span>
                <Button variant="ghost" size="icon" className="relative" onClick={() => {
                  openCart()
                  onClose()
                }}>
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Auth Section */}
            <div className="mt-8 border-t pt-6">
              {session ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">{session.user.name}</p>
                      <p className="text-xs text-muted-foreground">{session.user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link
                      href="/account/profile"
                      className="block text-sm hover:text-primary transition-colors"
                      onClick={onClose}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/account/orders"
                      className="block text-sm hover:text-primary transition-colors"
                      onClick={onClose}
                    >
                      Orders
                    </Link>
                    <Link
                      href="/account/wishlist"
                      className="block text-sm hover:text-primary transition-colors"
                      onClick={onClose}
                    >
                      Wishlist
                    </Link>
                    {(session.user.role === 'ADMIN' || session.user.role === 'MANAGER') && (
                      <Link
                        href="/admin"
                        className="block text-sm hover:text-primary transition-colors"
                        onClick={onClose}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/auth/signin" onClick={onClose}>
                      Sign In
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/auth/signup" onClick={onClose}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
