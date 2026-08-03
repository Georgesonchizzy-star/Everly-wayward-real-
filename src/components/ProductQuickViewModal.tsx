import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { X, Heart, ShoppingBag, ShieldCheck, Check, Star, Ruler, Truck, RotateCcw } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  currency: Currency;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product, size: string, color: string) => void;
  onOpenCheckoutDirect: (p: Product, size: string, color: string) => void;
  onOpenSizeGuide: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  currency,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
  onOpenCheckoutDirect,
  onOpenSizeGuide
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [addedSuccess, setAddedSuccess] = useState(false);

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

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-950/70 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Column */}
          <div className="bg-zinc-950 p-6 flex flex-col justify-between">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900 mb-4 border border-zinc-800">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      activeImageIndex === idx ? 'border-amber-400 opacity-100 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span className="uppercase tracking-widest font-mono text-amber-400">{product.category} &bull; {product.gender}</span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium text-xs">{product.rating} ({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold font-serif text-white tracking-tight">{product.name}</h2>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-extrabold font-mono text-amber-400">
                  {formatPrice(product.priceNGN, product.priceUSD, currency)}
                </span>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                  Instant Bank Checkout Eligible
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mt-5">
                  <label className="block text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wider">
                    Select Color: <span className="text-amber-400 font-mono">{selectedColor}</span>
                  </label>
                  <div className="flex gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? 'border-amber-400 bg-zinc-800 text-white font-medium'
                            : 'border-zinc-700 bg-zinc-950 text-zinc-400 hover:border-zinc-500'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border border-zinc-600" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                    Select Size:
                  </label>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-[44px] h-10 px-3 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-amber-400 text-zinc-950 shadow-md scale-105'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric Details & Features */}
              <div className="mt-6 pt-4 border-t border-zinc-800 text-xs space-y-2">
                <p className="text-zinc-400 font-semibold uppercase tracking-wider">Garment Craftsmanship:</p>
                <ul className="list-disc list-inside text-zinc-300 space-y-1 text-xs">
                  {product.details.map((det, i) => (
                    <li key={i}>{det}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-500 text-zinc-950'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added To Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-amber-400" />
                      Add To Bag
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenCheckoutDirect(product, selectedSize, selectedColor);
                  }}
                  className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-extrabold text-xs py-3.5 px-4 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Instant Bank Checkout
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Doorstep Nigerian Express Courier</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>7-Day Return Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
