'use client'

import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react'

import { authenticate } from '@/utils/actions'

export default function LoginPage() {
  const credentialsAction = async (formData: FormData) => {
    console.log('>> check formData:: ', formData)
    // const resData = await signIn("credentials", {...Object.fromEntries(formData), redirect: false})
    const email = formData.get('email') as string | null;
    const password = formData.get('password') as string | null;

    const resData = await authenticate(email ?? '', password ?? '');
    console.log('>> check resData:: ', resData)
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="my-6 flex items-center gap-x-1 lg:my-0">
        <img
          alt="Flowbite logo"
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-12"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Flowbite
        </span>
      </div>
      <Card
        horizontal
        imgSrc="/images/authentication/login.jpg"
        imgAlt=""
        className="w-full md:max-w-screen-sm lg:max-w-screen-md [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-2xl">
          Sign in to platform
        </h1>
        <form action={credentialsAction}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              id="credentials-email"
              name="email"
              placeholder="name@company.com"
              type="email"
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              id="credentials-password"
              name="password"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Checkbox id="rememberMe" name="rememberMe" />
              <Label htmlFor="rememberMe">Remember me</Label>
            </div>
            <a
              href="http://localhost:3000/auth/register"
              className="w-1/2 text-right text-sm text-white dark:text-primary-300"
            >
              Lost Password?
            </a>
          </div>
          <div className="mb-6">
            <Button type="submit" className="w-full lg:w-auto">
              Login to your account
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            <span>Not registered?&nbsp;</span>
            <a href="http://localhost:3000/auth/register" className="text-primary-600 dark:text-primary-300">
              Create account
            </a>
          </p>
        </form>
      </Card>
    </div>
  )
}
