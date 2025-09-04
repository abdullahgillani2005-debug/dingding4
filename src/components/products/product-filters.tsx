'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const categories = [
  { id: 'electronics', name: 'Electronics', count: 45 },
  { id: 'fashion', name: 'Fashion', count: 32 },
  { id: 'home-garden', name: 'Home & Garden', count: 28 },
  { id: 'sports', name: 'Sports', count: 19 },
  { id: 'beauty', name: 'Beauty', count: 24 },
  { id: 'books', name: 'Books', count: 67 },
]

const brands = [
  { id: 'techsound', name: 'TechSound', count: 12 },
  { id: 'fittech', name: 'FitTech', count: 8 },
  { id: 'brewmaster', name: 'BrewMaster', count: 5 },
  { id: 'comfortpro', name: 'ComfortPro', count: 7 },
  { id: 'soundwave', name: 'SoundWave', count: 15 },
  { id: 'chargetech', name: 'ChargeTech', count: 9 },
]

const ratings = [
  { value: 5, label: '5 Stars', count: 23 },
  { value: 4, label: '4 Stars & Up', count: 45 },
  { value: 3, label: '3 Stars & Up', count: 67 },
  { value: 2, label: '2 Stars & Up', count: 89 },
]

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryId])
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId))
    }
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands(prev => [...prev, brandId])
    } else {
      setSelectedBrands(prev => prev.filter(id => id !== brandId))
    }
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      setSelectedRatings(prev => [...prev, rating])
    } else {
      setSelectedRatings(prev => prev.filter(r => r !== rating))
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedRatings([])
    setInStockOnly(false)
  }

  const activeFiltersCount = selectedCategories.length + selectedBrands.length + selectedRatings.length + (inStockOnly ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(categoryId => {
                const category = categories.find(c => c.id === categoryId)
                return (
                  <Badge key={categoryId} variant="secondary" className="text-xs">
                    {category?.name}
                  </Badge>
                )
              })}
              {selectedBrands.map(brandId => {
                const brand = brands.find(b => b.id === brandId)
                return (
                  <Badge key={brandId} variant="secondary" className="text-xs">
                    {brand?.name}
                  </Badge>
                )
              })}
              {selectedRatings.map(rating => (
                <Badge key={rating} variant="secondary" className="text-xs">
                  {rating} Stars
                </Badge>
              ))}
              {inStockOnly && (
                <Badge variant="secondary" className="text-xs">
                  In Stock Only
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Categories</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                >
                  {category.name}
                </label>
                <span className="text-xs text-muted-foreground">
                  ({category.count})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Brands</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.id}`}
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={(checked) => 
                    handleBrandChange(brand.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={`brand-${brand.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                >
                  {brand.name}
                </label>
                <span className="text-xs text-muted-foreground">
                  ({brand.count})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Rating */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Customer Rating</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {ratings.map((rating) => (
              <div key={rating.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating.value}`}
                  checked={selectedRatings.includes(rating.value)}
                  onCheckedChange={(checked) => 
                    handleRatingChange(rating.value, checked as boolean)
                  }
                />
                <label
                  htmlFor={`rating-${rating.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                >
                  {rating.label}
                </label>
                <span className="text-xs text-muted-foreground">
                  ({rating.count})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Availability</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
            />
            <label
              htmlFor="in-stock"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              In Stock Only
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
