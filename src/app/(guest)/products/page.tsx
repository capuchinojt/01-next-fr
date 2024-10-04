import React from 'react'

import { ProductCarousel } from '@/components/product/ProductCarousel'
import ProductCard from '@/components/product/ProductCard'
import { SaleProductBanner } from '@/components/product/SaleProductBanner'
import ProductFilterGroupButton from '@/components/product/ProductFilterGroupButton'
import ProductSortByDropDown from '@/components/product/ProductSortByDropdown'

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '$50',
    description: 'This is a product description.',
    image: 'https://via.placeholder.com/150',
    isHot: true,
    salePercentage: 10,
    rating: 5,
    view: 2000
  },
  {
    id: 2,
    name: 'Product 2',
    price: '$100',
    description: 'This is a product description.',
    image: 'https://via.placeholder.com/150',
    isHot: false,
    salePercentage: 0,
    rating: 4,
    view: 2300
  },
  {
    id: 3,
    name: 'Product 3',
    price: '$150',
    description: 'This is a product description.',
    image: 'https://via.placeholder.com/150',
    isHot: false,
    salePercentage: 15,
    rating: 5,
    view: 2200
  },
  {
    id: 4,
    name: 'Product 4',
    price: '$135',
    description: 'This is a product description.',
    image: 'https://via.placeholder.com/150',
    isHot: false,
    salePercentage: 22,
    rating: 5,
    view: 5300
  },
  {
    id: 5,
    name: 'Product 5',
    price: '$100',
    description: 'This is a product description.',
    image: 'https://via.placeholder.com/150',
    isHot: true,
    salePercentage: 0,
    rating: 4,
    view: 1200
  },
]

const ProductDashboard = () => {
  const isDisplaySaleBanner = products.some(
    (product) => product.salePercentage > 0
  )

  return (
    <>
      <ProductCarousel />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Banner Section */}
          {isDisplaySaleBanner && <SaleProductBanner />}
          <div className="py-5 flex flex-row align-middle centre">
            <div className='flex w-1/12'>
              <h2 className="font-semibold flex items-center pr-5 text-gray-900 dark:text-white">
                Filter by
              </h2>{' '}
            </div>
            <div className='flex w-9/12'>
              <ProductFilterGroupButton />
            </div>
            <div className='flex w-2/12 justify-end'>
              <ProductSortByDropDown />
            </div>
          </div>

          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Product Dashboard
          </h1>

          {/* Grid layout for products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {products.map((product) => (
              <ProductCard key={product.id} productInfo={product} />
            ))}
          </div>
        </div>
      </div>
      )
    </>
  )
}

export default ProductDashboard
