import React from 'react';
import { Product, Currency } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  currency: Currency;
  onRemoveFromWishlist: (p: Product) => void;
  onAddToCart: (p: Product, size: string, color: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  currency,
  onRemoveFromWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const formatPrice = (ngn: number, usd: number, curr: Currency) => {
    if (curr === 'NGN') return `₦ ${ngn.toLocaleString('en-NG')}`;
    if (curr === 'USD') return `$ ${usd.toLocaleString('en-US')}`;
    return `£ ${Math.round(usd * 0.78).toLocaleString('en-GB')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-900 border-l border-zinc-800 text-zinc-100 flex flex-col justify-between shadow-2xl">
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-amber-400 fill-current" />
              <h2 className="text-lg font-bold font-serif uppercase tracking-wider text-white">Saved Garments</h2>
              <span className="bg-zinc-800 text-amber-400 font-mono text-xs px-2 py-0.5 rounded-full font-bold">
                {wishlist.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-zinc-800/60">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-zinc-400 space-y-4">
                <div className="p-4 rounded-full bg-zinc-800/80 text-zinc-500">
                  <Heart className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-base font-medium text-zinc-200">No saved items yet</p>
                  <p className="text-xs text-zinc-400 mt-1">Click the heart icon on any product to save it here.</p>
                </div>
              </div>
            ) : (
              wishlist.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  <div className="w-20 h-24 bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                        <button
                          onClick={() => onRemoveFromWishlist(item)}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400 mt-1 block">
                        {formatPrice(item.priceNGN, item.priceUSD, currency)}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(item, item.sizes[0] || 'M', item.colors[0]?.name || '');
                        onRemoveFromWishlist(item);
                      }}
                      className="w-full mt-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold py-2 rounded-lg uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Move to Bag
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
