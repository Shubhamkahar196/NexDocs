'use client'

import React, { useState } from 'react'
import { Brain, Home, User, LogIn, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useAuth, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSignedIn, isLoaded } = useAuth()

  const navItems = [
    { href: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { href: '/select-org', label: 'Switch Organization', icon: <User className="w-4 h-4" /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Brain className="h-6 w-6 text-blue-600" />
          <span>Docu-AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((nav) => (
            <Link
              key={nav.href}
              href={nav.href}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors dark:text-gray-200"
            >
              {nav.icon}
              <span>{nav.label}</span>
            </Link>
          ))}
        </nav>

        {/* Auth & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {isLoaded && isSignedIn && (
            <UserButton />
          )}

          {isLoaded && !isSignedIn && (
            <Link href="/sign-in">
              <Button size="sm" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t px-4 py-3 bg-white dark:bg-black space-y-2">
          {navItems.map((nav) => (
            <Link
              key={nav.href}
              href={nav.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors dark:text-gray-200 dark:hover:bg-neutral-800"
            >
              {nav.icon}
              <span>{nav.label}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header