import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dingding.com' },
    update: {},
    create: {
      email: 'admin@dingding.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create demo customer
  const customerPassword = await bcrypt.hash('customer123', 12)
  const customer = await prisma.user.upsert({
    where: { email: 'customer@dingding.com' },
    update: {},
    create: {
      email: 'customer@dingding.com',
      name: 'Demo Customer',
      password: customerPassword,
      role: 'CUSTOMER',
    },
  })

  console.log('👤 Created users:', { admin: admin.email, customer: customer.email })

  // Create categories
  const categories = [
    {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Latest gadgets and technology products',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      sortOrder: 1,
    },
    {
      name: 'Fashion',
      slug: 'fashion',
      description: 'Trendy clothing and accessories',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      sortOrder: 2,
    },
    {
      name: 'Home & Garden',
      slug: 'home-garden',
      description: 'Beautiful home essentials and garden tools',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      sortOrder: 3,
    },
    {
      name: 'Sports',
      slug: 'sports',
      description: 'Gear for active lifestyle',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      sortOrder: 4,
    },
    {
      name: 'Beauty',
      slug: 'beauty',
      description: 'Skincare and cosmetics',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      sortOrder: 5,
    },
    {
      name: 'Books',
      slug: 'books',
      description: 'Knowledge and entertainment',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      sortOrder: 6,
    },
  ]

  const createdCategories = []
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
    createdCategories.push(created)
  }

  console.log('📂 Created categories:', createdCategories.length)

  // Create products
  const products = [
    {
      title: 'Wireless Bluetooth Headphones',
      slug: 'wireless-bluetooth-headphones',
      description: 'Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
      shortDescription: 'Premium wireless headphones with noise cancellation',
      categoryId: createdCategories[0].id, // Electronics
      brand: 'TechSound',
      sku: 'TS-WH-001',
      isFeatured: true,
      metaTitle: 'Wireless Bluetooth Headphones - Premium Audio',
      metaDescription: 'Buy premium wireless Bluetooth headphones with noise cancellation. 30-hour battery life, crystal clear sound.',
    },
    {
      title: 'Smart Fitness Watch',
      slug: 'smart-fitness-watch',
      description: 'Advanced fitness tracking watch with heart rate monitor, GPS, and water resistance. Track your workouts and health metrics.',
      shortDescription: 'Advanced fitness tracking watch with GPS',
      categoryId: createdCategories[0].id, // Electronics
      brand: 'FitTech',
      sku: 'FT-SW-002',
      isFeatured: true,
      metaTitle: 'Smart Fitness Watch - Advanced Health Tracking',
      metaDescription: 'Advanced fitness watch with heart rate monitor, GPS tracking, and water resistance.',
    },
    {
      title: 'Premium Coffee Maker',
      slug: 'premium-coffee-maker',
      description: 'Professional-grade coffee maker with programmable settings and thermal carafe. Brew the perfect cup every time.',
      shortDescription: 'Professional-grade programmable coffee maker',
      categoryId: createdCategories[2].id, // Home & Garden
      brand: 'BrewMaster',
      sku: 'BM-CM-003',
      isFeatured: true,
      metaTitle: 'Premium Coffee Maker - Professional Grade',
      metaDescription: 'Professional coffee maker with programmable settings and thermal carafe.',
    },
    {
      title: 'Ergonomic Office Chair',
      slug: 'ergonomic-office-chair',
      description: 'Comfortable ergonomic office chair with lumbar support and adjustable height. Perfect for long work sessions.',
      shortDescription: 'Comfortable ergonomic chair with lumbar support',
      categoryId: createdCategories[2].id, // Home & Garden
      brand: 'ComfortPro',
      sku: 'CP-OC-004',
      isFeatured: false,
      metaTitle: 'Ergonomic Office Chair - Lumbar Support',
      metaDescription: 'Comfortable ergonomic office chair with adjustable height and lumbar support.',
    },
    {
      title: 'Portable Bluetooth Speaker',
      slug: 'portable-bluetooth-speaker',
      description: 'Compact wireless speaker with powerful sound and 12-hour battery life. Perfect for outdoor adventures.',
      shortDescription: 'Compact wireless speaker with powerful sound',
      categoryId: createdCategories[0].id, // Electronics
      brand: 'SoundWave',
      sku: 'SW-PS-005',
      isFeatured: false,
      metaTitle: 'Portable Bluetooth Speaker - Wireless Audio',
      metaDescription: 'Compact wireless speaker with powerful sound and long battery life.',
    },
    {
      title: 'Wireless Charging Pad',
      slug: 'wireless-charging-pad',
      description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
      shortDescription: 'Fast wireless charging pad for Qi devices',
      categoryId: createdCategories[0].id, // Electronics
      brand: 'ChargeTech',
      sku: 'CT-WC-006',
      isFeatured: false,
      metaTitle: 'Wireless Charging Pad - Fast Qi Charging',
      metaDescription: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    },
  ]

  const createdProducts = []
  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
    createdProducts.push(created)
  }

  console.log('📦 Created products:', createdProducts.length)

  // Create product variants
  const variants = [
    // Wireless Bluetooth Headphones
    {
      productId: createdProducts[0].id,
      sku: 'TS-WH-001-BLK',
      name: 'Black',
      color: '#000000',
      price: 99.99,
      comparePrice: 149.99,
      stock: 15,
      weight: 0.3,
    },
    {
      productId: createdProducts[0].id,
      sku: 'TS-WH-001-WHT',
      name: 'White',
      color: '#FFFFFF',
      price: 99.99,
      comparePrice: 149.99,
      stock: 12,
      weight: 0.3,
    },
    // Smart Fitness Watch
    {
      productId: createdProducts[1].id,
      sku: 'FT-SW-002-SLV',
      name: 'Silver',
      color: '#C0C0C0',
      price: 199.99,
      comparePrice: 249.99,
      stock: 8,
      weight: 0.05,
    },
    {
      productId: createdProducts[1].id,
      sku: 'FT-SW-002-BLK',
      name: 'Black',
      color: '#000000',
      price: 199.99,
      comparePrice: 249.99,
      stock: 10,
      weight: 0.05,
    },
    // Premium Coffee Maker
    {
      productId: createdProducts[2].id,
      sku: 'BM-CM-003-BLK',
      name: 'Black',
      color: '#000000',
      price: 159.99,
      stock: 12,
      weight: 3.5,
    },
    // Ergonomic Office Chair
    {
      productId: createdProducts[3].id,
      sku: 'CP-OC-004-GRY',
      name: 'Gray',
      color: '#808080',
      price: 299.99,
      comparePrice: 399.99,
      stock: 5,
      weight: 15.0,
    },
    // Portable Bluetooth Speaker
    {
      productId: createdProducts[4].id,
      sku: 'SW-PS-005-BLU',
      name: 'Blue',
      color: '#0000FF',
      price: 79.99,
      comparePrice: 99.99,
      stock: 20,
      weight: 0.4,
    },
    {
      productId: createdProducts[4].id,
      sku: 'SW-PS-005-RED',
      name: 'Red',
      color: '#FF0000',
      price: 79.99,
      comparePrice: 99.99,
      stock: 18,
      weight: 0.4,
    },
    // Wireless Charging Pad
    {
      productId: createdProducts[5].id,
      sku: 'CT-WC-006-WHT',
      name: 'White',
      color: '#FFFFFF',
      price: 49.99,
      stock: 25,
      weight: 0.2,
    },
  ]

  const createdVariants = []
  for (const variant of variants) {
    const created = await prisma.productVariant.upsert({
      where: { sku: variant.sku },
      update: {},
      create: variant,
    })
    createdVariants.push(created)
  }

  console.log('🎨 Created product variants:', createdVariants.length)

  // Create product images
  const images = [
    {
      productId: createdProducts[0].id,
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      alt: 'Wireless Bluetooth Headphones',
      order: 0,
      isPrimary: true,
    },
    {
      productId: createdProducts[1].id,
      url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
      alt: 'Smart Fitness Watch',
      order: 0,
      isPrimary: true,
    },
    {
      productId: createdProducts[2].id,
      url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop',
      alt: 'Premium Coffee Maker',
      order: 0,
      isPrimary: true,
    },
    {
      productId: createdProducts[3].id,
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop',
      alt: 'Ergonomic Office Chair',
      order: 0,
      isPrimary: true,
    },
    {
      productId: createdProducts[4].id,
      url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop',
      alt: 'Portable Bluetooth Speaker',
      order: 0,
      isPrimary: true,
    },
    {
      productId: createdProducts[5].id,
      url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop',
      alt: 'Wireless Charging Pad',
      order: 0,
      isPrimary: true,
    },
  ]

  for (const image of images) {
    await prisma.image.upsert({
      where: { 
        productId_order: {
          productId: image.productId,
          order: image.order
        }
      },
      update: {},
      create: image,
    })
  }

  console.log('🖼️ Created product images:', images.length)

  // Create sample reviews
  const reviews = [
    {
      productId: createdProducts[0].id,
      userId: customer.id,
      rating: 5,
      title: 'Excellent sound quality!',
      comment: 'These headphones have amazing sound quality and the noise cancellation works perfectly. Very comfortable for long listening sessions.',
      isVerified: true,
      isApproved: true,
    },
    {
      productId: createdProducts[0].id,
      userId: customer.id,
      rating: 4,
      title: 'Great value for money',
      comment: 'Good headphones with decent battery life. The build quality could be better but overall satisfied with the purchase.',
      isVerified: true,
      isApproved: true,
    },
    {
      productId: createdProducts[1].id,
      userId: customer.id,
      rating: 5,
      title: 'Perfect fitness companion',
      comment: 'This watch tracks everything I need for my workouts. The GPS is accurate and the heart rate monitor works great.',
      isVerified: true,
      isApproved: true,
    },
  ]

  for (const review of reviews) {
    await prisma.review.create({
      data: review,
    })
  }

  console.log('⭐ Created reviews:', reviews.length)

  // Create sample coupons
  const coupons = [
    {
      code: 'WELCOME10',
      type: 'PERCENTAGE',
      value: 10,
      usageLimit: 100,
      minOrderValue: 50,
      isActive: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
    {
      code: 'SAVE20',
      type: 'FIXED_AMOUNT',
      value: 20,
      usageLimit: 50,
      minOrderValue: 100,
      isActive: true,
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    },
    {
      code: 'FREESHIP',
      type: 'FREE_SHIPPING',
      value: 0,
      usageLimit: 200,
      minOrderValue: 25,
      isActive: true,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
  ]

  for (const coupon of coupons) {
    await prisma.coupon.upsert({
      where: { code: coupon.code },
      update: {},
      create: coupon,
    })
  }

  console.log('🎫 Created coupons:', coupons.length)

  console.log('✅ Database seeding completed successfully!')
  console.log('\n📋 Demo Credentials:')
  console.log('Admin: admin@dingding.com / admin123')
  console.log('Customer: customer@dingding.com / customer123')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
