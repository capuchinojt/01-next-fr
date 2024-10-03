'use client'

import { Button } from 'flowbite-react'
import { useState } from 'react'
import { IoMdCheckboxOutline } from 'react-icons/io'

const ProductFilterGroupButton = () => {
  const [buttonChosen, setButtonChosen] = useState('none')
  const handleButtonClick = (button: string) => () => setButtonChosen(button)

  return (
    <Button.Group>
      <Button
        color="gray"
        isProcessing={buttonChosen === 'none'}
        onClick={handleButtonClick('none')}
        processingSpinner={<IoMdCheckboxOutline className="w-5 h-5" />}
      >
        None
      </Button>
      <Button
        color="gray"
        isProcessing={buttonChosen === 'popular'}
        onClick={handleButtonClick('popular')}
        processingSpinner={<IoMdCheckboxOutline className="w-5 h-5" />}
      >
        Popular
      </Button>
      <Button
        color="gray"
        isProcessing={buttonChosen === 'newest'}
        onClick={handleButtonClick('newest')}
        processingSpinner={<IoMdCheckboxOutline className="w-5 h-5" />}
      >
        Newest
      </Button>
      <Button
        color="gray"
        isProcessing={buttonChosen === 'bestSeller'}
        onClick={handleButtonClick('bestSeller')}
        processingSpinner={<IoMdCheckboxOutline className="w-5 h-5" />}
      >
        Best Sellers
      </Button>
    </Button.Group>
  )
}

export default ProductFilterGroupButton
