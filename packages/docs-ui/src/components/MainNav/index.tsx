"use client"

import clsx from "clsx"
import React from "react"
import {
  BorderedIcon,
  Button,
  GITHUB_ISSUES_LINK,
  SearchModalOpener,
  useLayout,
  useSidebar,
  useSiteConfig,
} from "../.."
import { MainNavItems } from "./Items"
import { MainNavDesktopMenu } from "./DesktopMenu"
import { SidebarLeftIcon } from "../Icons/SidebarLeft"
import { MainNavMobileMenu } from "./MobileMenu"
import Link from "next/link"
import { MainNavVersion } from "./Version"
import { AiAssistantTriggerButton } from "../AiAssistant/TriggerButton"
import { MainNavItemDropdown } from "./Items/Dropdown"

type MainNavProps = {
  className?: string
  itemsClassName?: string
}

export const MainNav = ({ className, itemsClassName }: MainNavProps) => {
  const { setMobileSidebarOpen, isSidebarShown } = useSidebar()
  const { config } = useSiteConfig()
  const { showCollapsedNavbar } = useLayout()

  return (
    <div>
      <MainNavDesktopMenu />
      <MainNavMobileMenu />
    </div>
  )
}
