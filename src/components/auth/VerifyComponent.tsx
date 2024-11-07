'use client'

import { sendRequest } from '@/utils/api'
import { getUsernameFromEmail } from '@/utils/common.utils'
import { Alert, Button, Card, Label, TextInput } from 'flowbite-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const VerifyComponent = ({ id }: { id: string }) => {
   const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const route = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await sendRequest('/api/v1/auth/register', {
        method: 'POST',
        body: {
          email: formData?.email,
          password: formData?.password,
          name: getUsernameFromEmail(formData?.email)
        },
      })

      console.log('>> Check response:: ', response)
      const { data, error }: { data: any, error: any} = response
      if (error || !data) {
        console.log('>> Check error:: ', error)
        throw new Error('Registration failed!')
      }

      route.push(`/verify/${data?.data?._id}`)
      setSuccessMessage('Registration successful!')
      console.log('User registered:', data)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="my-6 flex items-center gap-x-1 lg:my-0">
        <Image
          alt="Flowbite logo"
          src="https://flowbite.com/docs/images/logo.svg"
          width={12} // Set the width of the image
          height={12} // Set the height of the image
          className="mr-3"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Flowbite
        </span>
      </div>
      <Card
        horizontal
        imgSrc="/images/authentication/create-account.jpg"
        imgAlt=""
        className="w-full md:max-w-screen-sm lg:max-w-screen-md [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-2xl">
          Verify your account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-y-3">
            <TextInput
              id="id"
              name="id"
              type="hidden"
              defaultValue={id}
              disabled
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Please input your verify code sent to your email</Label>
            <TextInput
              id="verifyCode"
              name="verifyCode"
              placeholder="Verification code"
              type="text"
              onChange={handleChange}
            />
          </div>
          {error && (
            <Alert color="failure" className='mb-4 items-center'>
              <span className="font-medium">{error}</span>
            </Alert>
          )}
          <div className="mb-7 flex flex-row gap-y-3 justify-around">
            <Button color={'light'} className="w-1/2 lg:w-1/2 mr-1">
              Cancel
            </Button>
            <Button type="submit" className="w-1/2 lg:w-1/2 ml-1">
              Confirm
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Verification code unavailable?&nbsp;
            <a
              href="http://localhost:3000/auth/login"
              className="text-primary-600 text-gray-700 dark:text-primary-200 font-bold"
            >
              Resend
            </a>
          </p>
        </form>
      </Card>
    </div>
  )
}

export default VerifyComponent