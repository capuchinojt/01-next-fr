import { Avatar, Dropdown, DropdownHeader, DropdownItem } from 'flowbite-react'

import { IUser } from '@/types/backend'

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
      <DropdownHeader>
        <span className="block text-sm">{userInfo.name}</span>
        <span className="block truncate text-sm font-medium">
          {userInfo.email}
        </span>
      </DropdownHeader>
      <DropdownItem>Profile</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Logout</DropdownItem>
    </Dropdown>
  )
}
