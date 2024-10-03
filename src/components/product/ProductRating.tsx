'use client'

import { Rating } from 'flowbite-react'
import { FC } from 'react'

interface RatingComponentProps {
  rating: number
  view: number
}

const RatingComponent: FC<RatingComponentProps> = ({ rating, view }) => {
  return (
    <Rating>
      <Rating.Star />
      <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
        {rating}
      </p>
      <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
      <a
        href="#"
        className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
      >
        {view} reviews
      </a>
    </Rating>
  )
}

export default RatingComponent
