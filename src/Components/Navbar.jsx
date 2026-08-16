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
  const cartCount = cartItems.length;
  const navigate = useNavigate();

  const clearSearchOnly = () => {
    setLocalSearch("");
    setSearchText("");
    setIsSearching(false);
  };

  const resetAllFilters = () => {
    setLocalSearch("");
    setSearchText("");
    setFilterCategory("");
    setIsSearching(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    setSearchText(value);

    if (value.trim()) {
      setFilterCategory("");
      navigate("/home");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setIsSearching(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setIsSearching(false);
  };

  return (
    <nav className="min-h-[72px] bg-cyan-500/95 text-black shadow-md sticky top-0 z-50 flex items-center border-b border-white/20 backdrop-blur">
      <div className="max-w-7xl mx-auto w-full px-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-black tracking-tight z-[60] transition hover:text-white"
          onClick={() => {
            resetAllFilters();
            closeMobileMenu();
          }}
        >
          JerseyStore
        </Link>

        {/* DESKTOP SEARCH */}
        <div className="hidden md:block flex-1 max-w-md relative mx-4">
          <input
            type="text"
            value={localSearch}
            placeholder="Search jerseys..."
            className="w-full px-10 py-2.5 rounded-full bg-white/70 text-sm shadow-inner focus:bg-white outline-none"
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-3 text-gray-600" size={18} />
          {localSearch && (
            <button
              onClick={clearSearchOnly}
              className="absolute right-3 top-3 text-gray-600 cursor-pointer"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6 text-lg">

          <Link className="hover:text-white transition-colors" to="/home" onClick={resetAllFilters}>Home</Link>
          <Link className="hover:text-white transition-colors" to="/about">About</Link>

          {/* CATEGORY */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors"
              aria-expanded={dropdownOpen}
            >
              Category <ChevronDown size={18} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 bg-white rounded-lg shadow-xl mt-3 w-48 py-2 border border-slate-200 overflow-hidden">
                <button
                  className="block w-full text-left px-4 py-2.5 hover:bg-cyan-50"
                  onClick={() => {
                    clearSearchOnly();
                    setFilterCategory("club");
                    setDropdownOpen(false);
                    navigate("/home");
                  }}
                >
                  Club Jerseys
                </button>
                <button
                  className="block w-full text-left px-4 py-2.5 hover:bg-cyan-50"
                  onClick={() => {
                    clearSearchOnly();
                    setFilterCategory("country");
                    setDropdownOpen(false);
                    navigate("/home");
                  }}
                >
                  Country Jerseys
                </button>
              </div>
            )}
          </div>

          <Link className="hover:text-white transition-colors" to="/contact">Contact</Link>

          {/* CART */}
          <Link to="/cart" className="relative cursor-pointer rounded-full p-2 hover:bg-white/25 transition" aria-label="View cart">
            <ShoppingCart size={26} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-1 bg-white text-cyan-600 rounded cursor-pointer">
                Login
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* MOBILE ICONS */}
        <div className="flex md:hidden items-center gap-4 z-[60]">
          <button
            onClick={() => setIsSearching((prev) => !prev)}
            className="cursor-pointer p-1 active:scale-95 transition-transform"
            aria-label="Toggle search"
          >
            <Search size={24} />
          </button>

          <Link to="/cart" className="relative cursor-pointer" onClick={closeMobileMenu}>
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={toggleMobileMenu}
            className="cursor-pointer p-1 active:scale-95 transition-transform"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {isSearching && (
        <div className="absolute left-0 right-0 top-full z-[54] border-t border-cyan-700/20 bg-cyan-500/95 px-4 py-3 shadow-lg md:hidden">
          <div className="relative">
            <input
              type="text"
              value={localSearch}
              placeholder="Search jerseys..."
              className="w-full rounded-full bg-white px-10 py-3 text-sm outline-none"
              onChange={handleSearch}
              autoFocus
            />
            <Search className="absolute left-3 top-3.5 text-gray-600" size={18} />
            {localSearch && (
              <button
                onClick={clearSearchOnly}
                className="absolute right-3 top-3.5 text-gray-600"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* BACKDROP */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[54]"
          onClick={closeMobileMenu}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[min(82vw,320px)] bg-cyan-500 z-[55]
        transform transition-transform duration-300 shadow-2xl
        ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="pt-24 px-6 flex flex-col space-y-6 text-lg font-medium">

          <Link className="rounded-lg px-2 py-1 hover:bg-white/20" to="/home" onClick={() => { resetAllFilters(); closeMobileMenu(); }}>
            Home
          </Link>

          <Link className="rounded-lg px-2 py-1 hover:bg-white/20" to="/about" onClick={closeMobileMenu}>
            About
          </Link>

          {/* CATEGORY SECTION */}
          <div className="pt-4 border-t border-black/20">
            <p className="text-xs uppercase opacity-60 mb-3">
              Categories
            </p>

            <div className="flex flex-col space-y-3">
              <button
                className="text-left cursor-pointer rounded-lg px-2 py-1 hover:bg-white/20"
                onClick={() => {
                  clearSearchOnly();
                  setFilterCategory("club");
                  closeMobileMenu();
                  navigate("/home");
                }}
              >
                Club Jerseys
              </button>

              <button
                className="text-left cursor-pointer rounded-lg px-2 py-1 hover:bg-white/20"
                onClick={() => {
                  clearSearchOnly();
                  setFilterCategory("country");
                  closeMobileMenu();
                  navigate("/home");
                }}
              >
                Country Jerseys
              </button>
            </div>
          </div>

          <Link className="rounded-lg px-2 py-1 hover:bg-white/20" to="/contact" onClick={closeMobileMenu}>
            Contact
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
