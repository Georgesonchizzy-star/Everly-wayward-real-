import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, size: string, color: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [addedToast, setAddedToast] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const formatPrice = (ngn: number, usd: number, curr: Currency) => {
    if (curr === 'NGN') {
      return `₦ ${ngn.toLocaleString('en-NG')}`;
    } else if (curr === 'USD') {
      return `$ ${usd.toLocaleString('en-US')}`;
    } else {
      const gbp = Math.round(usd * 0.78);
      return `£ ${gbp.toLocaleString('en-GB')}`;
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1800);
  };

  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col h-full relative">
      {/* Product Image Stage */}
      <div 
        className="relative aspect-[3/4] bg-zinc-950 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
        onMouseEnter={() => product.images[1] && setCurrentImgIndex(1)}
        onMouseLeave={() => setCurrentImgIndex(0)}
      >
        <img
          src={product.images[currentImgIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-amber-400 text-zinc-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-emerald-500 text-zinc-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 cursor-pointer ${
            isWishlisted
              ? 'bg-amber-500 text-zinc-950'
              : 'bg-zinc-900/70 text-zinc-300 hover:text-white hover:bg-zinc-800'
          }`}
          aria-label="Save item"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hidden sm:flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full bg-zinc-950/90 hover:bg-zinc-900 text-zinc-200 border border-zinc-700 text-xs py-2 rounded-lg font-medium flex items-center justify-center gap-1.5 backdrop-blur-md transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick Preview
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span className="uppercase font-mono tracking-wider text-[11px]">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-[11px] font-medium">{product.rating}</span>
            </div>
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            className="text-sm font-semibold text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer font-sans"
          >
            {product.name}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-1 mt-1 font-serif italic">
            {product.fabric}
          </p>
        </div>

        <div className="pt-2 border-t border-zinc-800/80 space-y-2">
          {/* Size Selector Strip */}
          <div className="flex items-center justify-between text-[11px] text-zinc-400">
            <span>Size:</span>
            <div className="flex gap-1 overflow-x-auto py-0.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                    selectedSize === s
                      ? 'bg-amber-400 text-zinc-950 font-bold'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Add to Cart button */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-base font-bold text-white font-mono">
                {formatPrice(product.priceNGN, product.priceUSD, currency)}
              </span>
            </div>

            <button
              onClick={handleQuickAdd}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                addedToast
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200'
              }`}
            >
              {addedToast ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
