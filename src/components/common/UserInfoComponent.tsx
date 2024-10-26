'use client'
import { Avatar, Dropdown, DropdownHeader, DropdownItem } from 'flowbite-react'

import { IUser } from '@/types/backend'
import { signOut } from 'next-auth/react'

interface UserInfoComponentProps {
  userInfo: IUser
}

export const UserInfoComponent = ({ userInfo }: UserInfoComponentProps) => {
  const sampleAvatar =
    'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-58.jpg'

  return (
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={
        <Avatar
          alt="User settings"
          img={sampleAvatar || userInfo.avatar}
          rounded
          bordered
        />
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">{userInfo.name}</span>
        <span className="block truncate text-sm font-medium">
          {userInfo.email}
        </span>
      </Dropdown.Header>
      <Dropdown.Item>Profile</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item onClick={() => signOut({ redirect: true, redirectTo: '/'})}>
        Logout
      </Dropdown.Item>
    </Dropdown>
  )
}
