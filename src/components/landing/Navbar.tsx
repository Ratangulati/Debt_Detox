import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="border-b border-zinc-800 backdrop-blur-lg bg-black/50 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-white">
            DebtDetox
          </Link>

          {/* Desktop Links */}
          <div className="gap-4">
            <Link to="/demo_dashboard">
              <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-transparent">
                Demo
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-2 mt-4">
            <Link to="/pricing" onClick={toggleMenu}>
              <Button variant="ghost" className="text-zinc-400 hover:text-white w-full">
                Pricing
              </Button>
            </Link>
            <Link to="/sign-in" onClick={toggleMenu}>
              <Button variant="ghost" className="text-zinc-400 hover:text-white w-full">
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
