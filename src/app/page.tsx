import { HeroSection } from '@/components/sections/hero-section'
import { FeaturedCategories } from '@/components/sections/featured-categories'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { PromotionalBanners } from '@/components/sections/promotional-banners'
import { Newsletter } from '@/components/sections/newsletter'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <PromotionalBanners />
      <Newsletter />
    </div>
  )
}
