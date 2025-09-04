'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cart-store'
import { useWishlistStore } from '@/store/wishlist-store'
import { formatPrice } from '@/lib/utils'

// Mock data - in a real app, this would come from an API
const mockProducts = [
  {
    id: 1,
    title: 'Wireless Bluetooth Headphones',
    slug: 'wireless-bluetooth-headphones',
    price: 99.99,
    comparePrice: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 128,
    isNew: true,
    isOnSale: true,
    stock: 15,
    variants: [
      { id: 1, name: 'Black', color: '#000000', price: 99.99, stock: 15 }
    ]
  },
  {
    id: 2,
    title: 'Smart Fitness Watch',
    slug: 'smart-fitness-watch',
    price: 199.99,
    comparePrice: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 89,
    isNew: false,
    isOnSale: true,
    stock: 8,
    variants: [
      { id: 2, name: 'Silver', color: '#C0C0C0', price: 199.99, stock: 8 }
    ]
  },
  {
    id: 3,
    title: 'Premium Coffee Maker',
    slug: 'premium-coffee-maker',
    price: 159.99,
    comparePrice: null,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 67,
    isNew: true,
    isOnSale: false,
    stock: 12,
    variants: [
      { id: 3, name: 'Black', color: '#000000', price: 159.99, stock: 12 }
    ]
  },
  {
    id: 4,
    title: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    price: 299.99,
    comparePrice: 399.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 45,
    isNew: false,
    isOnSale: true,
    stock: 5,
    variants: [
      { id: 4, name: 'Gray', color: '#808080', price: 299.99, stock: 5 }
    ]
  },
  {
    id: 5,
    title: 'Portable Bluetooth Speaker',
    slug: 'portable-bluetooth-speaker',
    price: 79.99,
    comparePrice: 99.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    rating: 4.4,
    reviewCount: 156,
    isNew: false,
    isOnSale: true,
    stock: 20,
    variants: [
      { id: 5, name: 'Blue', color: '#0000FF', price: 79.99, stock: 20 }
    ]
  },
  {
    id: 6,
    title: 'Wireless Charging Pad',
    slug: 'wireless-charging-pad',
    price: 49.99,
    comparePrice: null,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
    rating: 4.3,
    reviewCount: 92,
    isNew: true,
    isOnSale: false,
    stock: 25,
    variants: [
      { id: 6, name: 'White', color: '#FFFFFF', price: 49.99, stock: 25 }
    ]
  }
]

export function ProductGrid() {
  const [products, setProducts] = useState(mockProducts)
  const { addItem } = useCartStore()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore()

  const handleAddToCart = (product: any) => {
    addItem({
      productId: product.id.toString(),
      productVariantId: product.variants[0].id.toString(),
      quantity: 1,
      product: {
        id: product.id.toString(),
        title: product.title,
        slug: product.slug,
        description: '',
        shortDescription: '',
        categoryId: '1',
        brand: '',
        sku: '',
        isActive: true,
        isFeatured: true,
        metaTitle: '',
        metaDescription: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: '1', name: 'Electronics', slug: 'electronics', description: '', image: '', parentId: null, isActive: true, sortOrder: 0, createdAt: new Date(), updatedAt: new Date() },
        variants: product.variants.map((v: any) => ({
          id: v.id.toString(),
          productId: product.id.toString(),
          sku: '',
          name: v.name,
          color: v.color,
          size: null,
          price: v.price,
          comparePrice: null,
          costPrice: null,
          stock: v.stock,
          weight: null,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        })),
        images: [{ id: '1', productId: product.id.toString(), url: product.image, alt: product.title, order: 0, isPrimary: true, createdAt: new Date() }],
        reviews: [],
        _count: { reviews: product.reviewCount }
      },
      productVariant: {
        id: product.variants[0].id.toString(),
        productId: product.id.toString(),
        sku: '',
        name: product.variants[0].name,
        color: product.variants[0].color,
        size: null,
        price: product.variants[0].price,
        comparePrice: null,
        costPrice: null,
        stock: product.variants[0].stock,
        weight: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  }

  const handleWishlistToggle = (product: any) => {
    const productData = {
      id: product.id.toString(),
      title: product.title,
      slug: product.slug,
      description: '',
      shortDescription: '',
      categoryId: '1',
      brand: '',
      sku: '',
      isActive: true,
      isFeatured: true,
      metaTitle: '',
      metaDescription: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      category: { id: '1', name: 'Electronics', slug: 'electronics', description: '', image: '', parentId: null, isActive: true, sortOrder: 0, createdAt: new Date(), updatedAt: new Date() },
      variants: product.variants.map((v: any) => ({
        id: v.id.toString(),
        productId: product.id.toString(),
        sku: '',
        name: v.name,
        color: v.color,
        size: null,
        price: v.price,
        comparePrice: null,
        costPrice: null,
        stock: v.stock,
        weight: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      images: [{ id: '1', productId: product.id.toString(), url: product.image, alt: product.title, order: 0, isPrimary: true, createdAt: new Date() }],
      reviews: []
    }

    if (isInWishlist(product.id.toString())) {
      removeFromWishlist(product.id.toString())
    } else {
      addToWishlist(productData)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="relative">
            <Link href={`/products/${product.slug}`}>
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-green-500">New</Badge>
              )}
              {product.isOnSale && (
                <Badge variant="destructive">Sale</Badge>
              )}
            </div>

            {/* Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-white/90 hover:bg-white"
                onClick={() => handleWishlistToggle(product)}
              >
                <Heart 
                  className={`h-4 w-4 ${
                    isInWishlist(product.id.toString()) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-600'
                  }`} 
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-white/90 hover:bg-white"
                asChild
              >
                <Link href={`/products/${product.slug}`}>
                  <Eye className="h-4 w-4 text-gray-600" />
                </Link>
              </Button>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                ({product.reviewCount})
              </span>
            </div>

            <h3 className="font-semibold mb-2 line-clamp-2">
              <Link 
                href={`/products/${product.slug}`}
                className="hover:text-primary transition-colors"
              >
                {product.title}
              </Link>
            </h3>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              {product.stock > 0 ? (
                <span className="text-green-600">
                  {product.stock} in stock
                </span>
              ) : (
                <span className="text-red-600">Out of stock</span>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button 
              className="w-full" 
              disabled={product.stock === 0}
              onClick={() => handleAddToCart(product)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
