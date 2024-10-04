'use client'

import { CustomFlowbiteTheme, Dropdown } from 'flowbite-react'

export default function ProductSortByDropDown() {
  return (
    <Dropdown color='light' label="Sort by">
      <Dropdown.Item onClick={() => alert('Dashboard!')}>
        Dashboard
      </Dropdown.Item>
      <Dropdown.Item onClick={() => alert('Settings!')}>Settings</Dropdown.Item>
      <Dropdown.Item onClick={() => alert('Earnings!')}>Earnings</Dropdown.Item>
      <Dropdown.Item onClick={() => alert('Sign out!')}>Sign out</Dropdown.Item>
    </Dropdown>
  )
}
