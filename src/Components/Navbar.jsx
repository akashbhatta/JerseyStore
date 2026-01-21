import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, ChevronDown, Menu, X, Search } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";
import { useCart } from "../Pages/CartContext";

const Navbar = ({ setSearchText, setFilterCategory }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [localSearch, setLocalSearch] = useState("");
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems.length;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setIsSearching(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setIsSearching(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    setSearchText(value);

    if (value.trim().length > 0) {
      setFilterCategory("");
      navigate("/home");
    }
  };

  const clearSearch = () => {
    setLocalSearch("");
    setSearchText("");
    setIsSearching(false);
  };

  return (
    <nav className="h-[72px] bg-cyan-500 text-black shadow-md sticky top-0 z-50 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold z-[60]"
          onClick={() => {
            clearSearch();
            closeMobileMenu();
          }}
        >
          JerseyStore
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:block flex-1 max-w-md relative mx-4">
          <input
            type="text"
            value={localSearch}
            placeholder="Search jerseys..."
            className="w-full px-10 py-2 rounded-md bg-white/50 focus:bg-white outline-none transition-all"
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-600" size={18} />
          {localSearch && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-2.5 text-gray-600 hover:text-black"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 lg:space-x-6 items-center text-lg">
          <Link to="/home" className="hover:text-gray-700" onClick={clearSearch}>
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-700">
            About
          </Link>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 hover:text-gray-700 cursor-pointer"
            >
              Category <ChevronDown size={18} />
            </button>
            {dropdownOpen && (
              <div className="absolute bg-white rounded shadow-md mt-2 w-44 py-2 border text-black cursor-pointer">
                <button
                  onClick={() => {
                    setFilterCategory("club");
                    clearSearch();
                    setDropdownOpen(false);
                    navigate("/home");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Club Jerseys
                </button>
                <button
                  onClick={() => {
                    setFilterCategory("country");
                    clearSearch();
                    setDropdownOpen(false);
                    navigate("/home");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Country Jerseys
                </button>
              </div>
            )}
          </div>

          <Link to="/contact" className="hover:text-gray-700">
            Contact
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={26} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-1 bg-white text-cyan-600 rounded font-medium hover:bg-gray-100">
                Login
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Mobile Icons (Cart & Hamburger) */}
        <div className="flex md:hidden items-center gap-4 z-[60]">
          <Link to="/cart" className="relative" onClick={closeMobileMenu}>
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={toggleMobileMenu} className="focus:outline-none cursor-pointer">
            {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY BACKDROP */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-[54]"
          onClick={closeMobileMenu}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[280px] bg-cyan-500 z-[55] transform transition-transform duration-300 ease-in-out shadow-2xl
          flex flex-col p-6 pt-24 md:hidden 
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Search Input Area */}
        <div className="relative w-full mb-8">
          <input
            type="text"
            value={localSearch}
            placeholder="Search jerseys..."
            onFocus={() => setIsSearching(true)}
            className="w-full px-4 py-3 rounded-lg bg-white/90 text-black outline-none border-none focus:bg-white"
            onChange={handleSearch}
          />
          {isSearching ? (
            <button
              onClick={() => setIsSearching(false)}
              className="absolute right-3 top-3.5 text-gray-500"
            >
              <X size={20} />
            </button>
          ) : (
            <Search className="absolute right-3 top-3.5 text-gray-500" size={20} />
          )}
        </div>

        {/* Sidebar Content (Hidden when searching) */}
        {!isSearching ? (
          <div className="flex flex-col space-y-6 text-lg font-semibold">
            <Link
              to="/home"
              className="text-black hover:text-white"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-black hover:text-white"
              onClick={closeMobileMenu}
            >
              About
            </Link>

            <div className="flex flex-col space-y-3">
              <p className="text-black/60 text-xs uppercase tracking-widest">
                Categories
              </p>
              <button
                onClick={() => {
                  setFilterCategory("club");
                  clearSearch();
                  closeMobileMenu();
                  navigate("/home");
                }}
                className="text-left pl-2 text-black hover:text-white cursor-pointer"
              >
                Club Jerseys
              </button>
              <button
                onClick={() => {
                  setFilterCategory("country");
                  clearSearch();
                  closeMobileMenu();
                  navigate("/home");
                }}
                className="text-left pl-2 text-black hover:text-white cursor-pointer"
              >
                Country Jerseys
              </button>
            </div>

            <Link
              to="/contact"
              className="text-black hover:text-white"
              onClick={closeMobileMenu}
            >
              Contact
            </Link>

            <div className="mt-auto border-t border-black/10 pt-6">
              <SignedIn>
                <div className="flex items-center gap-4">
                  <UserButton afterSignOutUrl="/" />
                  <span className="text-black">My Account</span>
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full py-3 bg-white text-cyan-600 rounded-lg shadow-md font-bold active:scale-95 transition-transform cursor-pointer">
                    Login / Sign Up
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-10 text-black/70 italic text-sm text-center">
            <Search size={40} className="mb-4 opacity-20" />
            <p>Searching for "{localSearch || "..."}"</p>
            <p className="mt-2 text-xs">Results are updating on your home screen</p>
            <button
              onClick={() => setIsSearching(false)}
              className="mt-6 text-black underline font-bold"
            >
              Back to Menu
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
