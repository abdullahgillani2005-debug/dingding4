# DingDing E-commerce Platform

A comprehensive, production-ready e-commerce platform built with Next.js 14, TypeScript, and modern web technologies.

## 🚀 Features

### Customer Features
- **Product Catalog**: Browse products with advanced filtering and search
- **Shopping Cart**: Add/remove items, quantity management, persistent cart
- **Checkout Process**: Secure payment processing with multiple payment methods
- **User Accounts**: Registration, authentication, profile management
- **Order Management**: Track orders, view order history, reorder functionality
- **Wishlist**: Save favorite products for later
- **Reviews & Ratings**: Product reviews with verified purchase badges
- **Responsive Design**: Mobile-first design with dark mode support

### Admin Features
- **Dashboard**: Comprehensive admin dashboard with analytics
- **Product Management**: CRUD operations for products, variants, and images
- **Order Management**: Process orders, update status, handle refunds
- **Customer Management**: View customer profiles and order history
- **Inventory Management**: Stock tracking and low-stock alerts
- **Coupon System**: Create and manage discount codes
- **Content Management**: Manage categories, banners, and site content
- **Analytics**: Sales reports, product performance, customer insights

### Technical Features
- **Authentication**: NextAuth.js with role-based access control
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe integration with local payment providers
- **Search**: Full-text search with filtering and sorting
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **SEO**: Meta tags, structured data, sitemap generation
- **Performance**: Server-side rendering, static generation, caching
- **Security**: CSRF protection, rate limiting, input validation

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS** + **shadcn/ui**
- **React Query** (TanStack Query)
- **Zustand** (State Management)
- **React Hook Form** + **Zod**
- **Framer Motion** (Animations)

### Backend
- **Next.js Server Actions**
- **NextAuth.js** (Authentication)
- **Prisma ORM**
- **PostgreSQL**

### Payments
- **Stripe** (International)
- **JazzCash/EasyPaisa** (Pakistan)

### Storage & Media
- **UploadThing** (File Uploads)
- **Next.js Image Optimization**

### Analytics & Monitoring
- **PostHog** (Event Tracking)
- **Vercel Analytics**

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 20.x or later
- **npm** or **pnpm** or **yarn**
- **PostgreSQL** database
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dingding-ecommerce
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Environment Setup

Copy the environment example file and configure your variables:

```bash
cp env.example .env.local
```

Update the following variables in `.env.local`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dingding_ecommerce?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe (Optional - for payment testing)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# UploadThing (Optional - for file uploads)
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your-uploadthing-app-id"
```

### 4. Database Setup

Generate Prisma client and run migrations:

```bash
npm run db:generate
npm run db:push
```

### 5. Seed the Database

Populate the database with sample data:

```bash
npm run db:seed
```

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Demo Credentials

After seeding the database, you can use these credentials:

### Admin Account
- **Email**: admin@dingding.com
- **Password**: admin123
- **Access**: Full admin dashboard and management features

### Customer Account
- **Email**: customer@dingding.com
- **Password**: customer123
- **Access**: Customer features and shopping functionality

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── account/           # User account pages
│   ├── products/          # Product pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── forms/            # Form components
├── lib/                  # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Prisma client
│   └── utils.ts          # Utility functions
├── hooks/                # Custom React hooks
├── store/                # Zustand stores
├── types/                # TypeScript type definitions
└── utils/                # Utility functions

prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Database seeding script
```

## 🗄️ Database Schema

The application uses the following main entities:

- **Users**: Customer and admin accounts with role-based access
- **Products**: Product catalog with variants and images
- **Categories**: Hierarchical product categorization
- **Orders**: Order management with status tracking
- **Cart**: Shopping cart functionality
- **Reviews**: Product reviews and ratings
- **Coupons**: Discount code system
- **Addresses**: User shipping and billing addresses

## 🧪 Testing

Run the test suite:

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test with UI
npm run test:e2e:ui
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

### Database Deployment

For production, use a managed PostgreSQL service:
- **Supabase** (Recommended)
- **Neon**
- **PlanetScale**
- **Railway**

## 🔧 Configuration

### Payment Providers

#### Stripe Setup
1. Create a Stripe account
2. Get your API keys from the dashboard
3. Set up webhooks for payment events
4. Add keys to environment variables

#### Local Payment Providers (Pakistan)
1. Register with JazzCash/EasyPaisa
2. Get merchant credentials
3. Configure in environment variables

### File Uploads

#### UploadThing Setup
1. Create an UploadThing account
2. Create a new app
3. Get your API keys
4. Configure in environment variables

### Analytics

#### PostHog Setup
1. Create a PostHog account
2. Get your project key
3. Configure in environment variables

## 📊 Performance Optimization

The application includes several performance optimizations:

- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic code splitting with Next.js
- **Caching**: React Query for data caching
- **CDN**: Vercel Edge Network for global distribution
- **Database Indexing**: Optimized database queries with Prisma

## 🔒 Security Features

- **Authentication**: Secure JWT-based authentication
- **Authorization**: Role-based access control
- **Input Validation**: Zod schema validation
- **CSRF Protection**: Built-in CSRF protection
- **Rate Limiting**: API rate limiting
- **SQL Injection Prevention**: Prisma ORM protection
- **XSS Protection**: React's built-in XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core e-commerce functionality
- ✅ Admin dashboard
- ✅ Payment integration
- ✅ User authentication

### Phase 2 (Planned)
- 🔄 Multi-vendor marketplace
- 🔄 Advanced analytics
- 🔄 Mobile app
- 🔄 AI-powered recommendations

### Phase 3 (Future)
- 📋 Subscription services
- 📋 Loyalty program
- 📋 Advanced inventory management
- 📋 International shipping

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Prisma](https://prisma.io/) - Database ORM
- [Stripe](https://stripe.com/) - Payment processing

---

**Built with ❤️ by the DingDing Team**
#   d i n g d i n g 4  
 #   d i n g d i n g 4  
 #   d i n g d i n g 4  
 #   d i n g d i n g 4  
 #   d i n g d i n g 4  
 #   d i n g d i n g 4  
 