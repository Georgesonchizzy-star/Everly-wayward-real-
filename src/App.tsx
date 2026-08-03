import React, { useState } from 'react';
import { Category, Currency, CartItem, Product, Order } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { NigerianCheckoutModal } from './components/NigerianCheckoutModal';
import { LookbookSection } from './components/LookbookSection';
import { TrackOrderModal } from './components/TrackOrderModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { Footer } from './components/Footer';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<Currency>('NGN');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Men' | 'Women' | 'Unisex'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Cart & Wishlist local state
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedSize: 'L',
      selectedColor: 'Noir Black',
      quantity: 1
    }
  ]);
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1]]);

  // Completed Orders history
  const [orders, setOrders] = useState<Order[]>([]);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart logic
  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, { product, selectedSize: size, selectedColor: color, quantity: 1 }];
      }
    });
  };

  const handleUpdateCartQuantity = (index: number, delta: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const newQty = newCart[index].quantity + delta;
      if (newQty <= 0) {
        return newCart.filter((_, i) => i !== index);
      } else {
        newCart[index].quantity = newQty;
        return newCart;
      }
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleOrderComplete = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Clear cart after order completion
  };

  const handleDirectCheckoutProduct = (product: Product, size: string, color: string) => {
    // Set cart to single item for express direct checkout
    setCart([{ product, selectedSize: size, selectedColor: color, quantity: 1 }]);
    setIsCheckoutOpen(true);
  };

  // Filtering & Sorting
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fabric.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGender = genderFilter === 'All' || p.gender === genderFilter || p.gender === 'Unisex';
    
    return matchesCategory && matchesSearch && matchesGender;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.priceNGN - b.priceNGN;
    if (sortBy === 'price-high') return b.priceNGN - a.priceNGN;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-400 selection:text-zinc-950">
      {/* Navigation Header */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenLookbook={() => {
          const el = document.getElementById('lookbook-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCheckoutDirect={() => setIsCheckoutOpen(true)}
      />

      {/* Hero Banner Showcase */}
      <HeroSection
        onShopClick={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCheckoutDirect={() => setIsCheckoutOpen(true)}
        onOpenLookbook={() => {
          const el = document.getElementById('lookbook-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Catalog Section */}
      <main id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {/* Section Header & Sub-filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>HANDCRAFTED CAPSULE CATALOG</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
              {activeCategory === 'All' ? 'FULL COLLECTION' : activeCategory.toUpperCase()}
            </h2>
          </div>

          {/* Sub-filters & Sorting */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Gender filter tabs */}
            <div className="bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex gap-1 font-mono">
              {(['All', 'Men', 'Women', 'Unisex'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGenderFilter(g)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    genderFilter === g
                      ? 'bg-amber-400 text-zinc-950 font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-zinc-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer font-sans"
              >
                <option value="featured" className="bg-zinc-900">Featured Releases</option>
                <option value="price-low" className="bg-zinc-900">Price: Low to High</option>
                <option value="price-high" className="bg-zinc-900">Price: High to Low</option>
                <option value="rating" className="bg-zinc-900">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-zinc-900/60 rounded-3xl border border-zinc-800 p-12 text-center text-zinc-400 space-y-3">
            <SlidersHorizontal className="w-10 h-10 mx-auto text-zinc-600 mb-2" />
            <p className="text-base font-medium text-white">No garments match your current search criteria.</p>
            <p className="text-xs text-zinc-500">Try adjusting your category filter or search terms.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setGenderFilter('All');
              }}
              className="mt-2 bg-amber-400 text-zinc-950 text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                isWishlisted={wishlist.some((p) => p.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={setQuickViewProduct}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* Lookbook Section */}
      <div id="lookbook-section">
        <LookbookSection
          products={PRODUCTS}
          currency={currency}
          onQuickView={setQuickViewProduct}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Footer */}
      <Footer
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenCheckoutDirect={() => setIsCheckoutOpen(true)}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        currency={currency}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        currency={currency}
        isWishlisted={quickViewProduct ? wishlist.some((p) => p.id === quickViewProduct.id) : false}
        onClose={() => setQuickViewProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenCheckoutDirect={handleDirectCheckoutProduct}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <NigerianCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        currency={currency}
        onOrderComplete={handleOrderComplete}
      />

      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        orders={orders}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
