import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Heart, ShieldCheck, MapPin, ChevronDown, Compass } from 'lucide-react';
import { Category, Currency } from '../types';

interface NavbarProps {
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenTrackOrder: () => void;
  onOpenLookbook: () => void;
  onOpenCheckoutDirect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  currency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  onOpenTrackOrder,
  onOpenLookbook,
  onOpenCheckoutDirect
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories: Category[] = [
    'All',
    'Outerwear',
    'Hoodies & Sweats',
    'Tops & Tees',
    'Trousers',
    'Dresses',
    'Accessories'
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 text-zinc-100 transition-all">
      {/* Top Banner Notice for Nigerian Bank Self Checkout */}
      <div className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-amber-950 text-xs py-1.5 px-4 text-center border-b border-zinc-800/80 flex items-center justify-between">
        <div className="hidden sm:flex items-center space-x-2 text-zinc-400">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>Flagship Stores: Victoria Island, Lagos & Maitama, Abuja</span>
        </div>
        <div className="flex-1 text-center font-medium text-zinc-200 flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Instant Nigerian Bank Transfer & USSD Self-Checkout Active</span>
          <span className="hidden md:inline text-zinc-400">(GTB, Zenith, Access, Kuda & 12+ Banks)</span>
        </div>
        <div className="hidden md:flex items-center space-x-3 text-zinc-400 text-xs">
          <button 
            onClick={onOpenTrackOrder}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Track Order
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onSelectCategory('All'); }}
              className="inline-block"
            >
              <span className="text-xl sm:text-2xl font-extrabold tracking-[0.25em] text-white uppercase font-serif">
                EVERLY WAYWARD
              </span>
              <span className="block text-[10px] tracking-[0.4em] text-amber-500/90 uppercase -mt-1 font-sans">
                LAGOS &bull; MILAN &bull; PARIS
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs tracking-widest font-medium uppercase text-zinc-300">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`transition-colors py-2 relative cursor-pointer ${
                  activeCategory === cat
                    ? 'text-amber-400 font-semibold'
                    : 'hover:text-white'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            ))}
            <button
              onClick={onOpenLookbook}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors py-2 cursor-pointer font-semibold"
            >
              <Compass className="w-3.5 h-3.5" />
              Lookbook
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Currency Selector */}
            <div className="relative text-xs">
              <select
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                className="bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer appearance-none pr-7 font-mono"
              >
                <option value="NGN">NGN (₦)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
              <ChevronDown className="w-3 h-3 text-zinc-400 absolute right-2 top-2.5 pointer-events-none" />
            </div>

            {/* Search Input toggle */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-full px-3 py-1">
                  <input
                    type="text"
                    placeholder="Search collections..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="bg-transparent text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none w-32 sm:w-48"
                    autoFocus
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-zinc-400 hover:text-white ml-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-full transition-colors cursor-pointer"
                  title="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-full transition-colors relative cursor-pointer"
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-amber-500 text-zinc-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 text-white px-3 py-2 rounded-full border border-zinc-700 transition-all cursor-pointer shadow-sm"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold font-mono">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-4 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-md transition-colors ${
                  activeCategory === cat
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-zinc-800 flex flex-col space-y-2 text-xs">
            <button
              onClick={() => { onOpenLookbook(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-emerald-400 py-2 font-medium"
            >
              <Compass className="w-4 h-4" />
              Explore Editorial Lookbook
            </button>
            <button
              onClick={() => { onOpenTrackOrder(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-zinc-300 py-2 font-medium"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Track Existing Order
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
