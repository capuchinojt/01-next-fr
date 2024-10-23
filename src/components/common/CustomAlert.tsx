import { Alert } from 'flowbite-react'

interface CustomAlertCompProps {
  message: string
}

export function CustomAlert({ message }: CustomAlertCompProps) {
  return (
    <Alert color="info">
      <span className="font-medium">Info alert!</span>
      <span>{message}</span>
    </Alert>
  )
}
