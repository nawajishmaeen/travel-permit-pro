
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: 'Browse Countries', href: '/countries' },
  { name: 'Add-on Services', href: '/services' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact Us', href: '/contact' },
]

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex items-center justify-between relative z-50">
      {/* Desktop navigation */}
      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
        <Button variant="outline" size="default">
          Sign in
        </Button>
        <Button variant="default" size="default">
          Get started
        </Button>
      </div>

      {/* Mobile menu button */}
      <div className="flex lg:hidden">
        <Button
          variant="ghost"
          size="default"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open main menu'}</span>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full right-0 w-full bg-white shadow-lg rounded-lg mt-2 p-4 z-50">
          <div className="space-y-2 pb-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-sm font-semibold leading-7 text-gray-900 hover:text-indigo-600 px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* Mobile menu buttons */}
          <div className="pt-4 border-t border-gray-200">
            <Button variant="outline" size="default" className="w-full mb-3">
              Sign in
            </Button>
            <Button variant="default" size="default" className="w-full">
              Get started
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
