import Link from 'next/link'
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const banners = [
  {
    id: 1,
    title: 'Free Shipping',
    subtitle: 'On orders over $50',
    description: 'Get free shipping on all orders over $50. No minimum purchase required for premium members.',
    icon: Truck,
    color: 'bg-blue-500',
    link: '/shipping',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop'
  },
  {
    id: 2,
    title: 'Secure Payment',
    subtitle: '100% Protected',
    description: 'Your payment information is secure with our encrypted checkout process and fraud protection.',
    icon: Shield,
    color: 'bg-green-500',
    link: '/security',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop'
  },
  {
    id: 3,
    title: 'Easy Returns',
    subtitle: '30-day policy',
    description: 'Not satisfied? Return any item within 30 days for a full refund. No questions asked.',
    icon: RotateCcw,
    color: 'bg-purple-500',
    link: '/returns',
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&h=300&fit=crop'
  },
  {
    id: 4,
    title: '24/7 Support',
    subtitle: 'Always here to help',
    description: 'Our customer support team is available 24/7 to help you with any questions or concerns.',
    icon: Headphones,
    color: 'bg-orange-500',
    link: '/support',
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=300&fit=crop'
  }
]

export function PromotionalBanners() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose DingDing?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing you with the best shopping experience possible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {banners.map((banner) => {
            const IconComponent = banner.icon
            return (
              <Card key={banner.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link href={banner.link}>
                  <div className="relative">
                    <div 
                      className="h-32 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${banner.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute top-4 left-4">
                      <div className={`p-2 rounded-lg ${banner.color} text-white`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {banner.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {banner.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {banner.description}
                    </p>
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                      <span className="text-sm">Learn More</span>
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>

        {/* Main Promotional Banner */}
        <div className="mt-12">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div 
                className="h-64 lg:h-auto bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop)' 
                }}
              />
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  Join Our Premium Membership
                </h3>
                <p className="text-muted-foreground mb-6">
                  Get exclusive access to early sales, free shipping on all orders, 
                  and special member-only discounts. Start your premium journey today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/membership">
                      Become Premium
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/benefits">
                      View Benefits
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
