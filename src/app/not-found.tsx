import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-6xl font-bold text-gray-400 mb-4">
            404
          </CardTitle>
          <CardDescription className="text-xl">
            Page Not Found
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/">
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/products">
                Browse Products
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
