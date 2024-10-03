'use client'
import { FC, useState } from 'react'
import { FaHeart, FaEllipsisV } from 'react-icons/fa'
import RatingComponent from './ProductRating'

interface ProductInfoProps {
  id: number
  name: string
  price: string
  description: string
  image: string
  isHot: boolean
  salePercentage: number
  rating: number
  view: number
}

const ProductCard: FC<{ productInfo: ProductInfoProps }> = ({
  productInfo,
}) => {
  const {
    id,
    name,
    price,
    description,
    image,
    isHot,
    salePercentage,
    rating = 0,
    view = 0,
  } = productInfo
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  return (
    <div
      key={id}
      className="relative bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
      onMouseEnter={() => setHoveredProduct(id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      {/* Ruy băng đỏ cho sản phẩm hot */}
      {isHot && (
        <div className="absolute top-0 left-0 bg-red-600 text-white text-sm font-bold py-1 px-2 rounded-br-lg">
          Hot
        </div>
      )}

      {/* Ruy băng xanh cho sản phẩm giảm giá */}
      {salePercentage > 0 && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-sm font-bold py-1 px-2 rounded-bl-lg">
          {salePercentage}% OFF
        </div>
      )}

      {/* Hình ảnh sản phẩm */}
      <img src={image} alt={name} className="w-full h-48 object-cover" />

      {hoveredProduct === id && (
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          {/* Button ba chấm để hiển thị thêm thông tin */}
          <button className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-400 transition delay-150 duration-300">
            <FaEllipsisV />
          </button>
          {/* Button trái tim để yêu thích sản phẩm */}
          <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-400 transition delay-150 duration-300">
            <FaHeart />
          </button>
        </div>
      )}

      {/* Nội dung sản phẩm */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {name}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
        <div className="mt-4 flex">
          <span className="text-gray-800 dark:text-gray-200 font-bold flex w-2/3 align-middle">
            <RatingComponent rating={rating} view={view} />
          </span>
          <span className="text-gray-800 dark:text-gray-200 font-bold justify-items-end w-1/3 grid">
            <span>{price}</span>
          </span>
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
