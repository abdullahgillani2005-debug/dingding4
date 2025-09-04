import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check if the page title is correct
    await expect(page).toHaveTitle(/DingDing E-commerce/)
    
    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: /Shop by Category/i })).toBeVisible()
    
    // Check if featured products section is visible
    await expect(page.getByRole('heading', { name: /Featured Products/i })).toBeVisible()
  })

  test('should navigate to products page', async ({ page }) => {
    await page.goto('/')
    
    // Click on the products link in navigation
    await page.getByRole('link', { name: /Products/i }).click()
    
    // Check if we're on the products page
    await expect(page).toHaveURL(/.*products/)
    await expect(page.getByRole('heading', { name: /All Products/i })).toBeVisible()
  })

  test('should open and close cart sidebar', async ({ page }) => {
    await page.goto('/')
    
    // Click on cart icon
    await page.getByRole('button', { name: /cart/i }).click()
    
    // Check if cart sidebar is visible
    await expect(page.getByText(/Shopping Cart/i)).toBeVisible()
    
    // Close cart sidebar
    await page.getByRole('button', { name: /close/i }).click()
    
    // Check if cart sidebar is hidden
    await expect(page.getByText(/Shopping Cart/i)).not.toBeVisible()
  })

  test('should add product to cart', async ({ page }) => {
    await page.goto('/')
    
    // Find and click the first "Add to Cart" button
    const addToCartButton = page.getByRole('button', { name: /Add to Cart/i }).first()
    await addToCartButton.click()
    
    // Check if cart count is updated
    await expect(page.getByText('1')).toBeVisible()
    
    // Open cart to verify item was added
    await page.getByRole('button', { name: /cart/i }).click()
    await expect(page.getByText(/Shopping Cart \(1\)/i)).toBeVisible()
  })
})
