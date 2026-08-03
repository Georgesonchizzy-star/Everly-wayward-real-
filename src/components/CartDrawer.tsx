import React, { useState } from 'react';
import { CartItem, Currency } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Plus, Minus, Lock } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const subtotalNGN = cart.reduce((acc, item) => acc + item.product.priceNGN * item.quantity, 0);
  const subtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);

  const discountNGN = (subtotalNGN * discountPercent) / 100;
  const discountUSD = (subtotalUSD * discountPercent) / 100;

  const finalNGN = subtotalNGN - discountNGN;
  const finalUSD = subtotalUSD - discountUSD;

  // Free shipping threshold: ₦100,000
  const freeShippingThresholdNGN = 100000;
  const progressPercent = Math.min(100, (subtotalNGN / freeShippingThresholdNGN) * 100);
  const remainingNGN = Math.max(0, freeShippingThresholdNGN - subtotalNGN);

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

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'WAYWARD10') {
      setDiscountPercent(10);
      setPromoSuccess('10% VIP Discount Applied!');
      setPromoError('');
    } else if (promoCode.trim().toUpperCase() === 'LAGOS20') {
      setDiscountPercent(20);
      setPromoSuccess('20% Lagos Special Discount Applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try WAYWARD10');
      setPromoSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-900 border-l border-zinc-800 text-zinc-100 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold font-serif uppercase tracking-wider text-white">Your Shopping Bag</h2>
              <span className="bg-zinc-800 text-amber-400 font-mono text-xs px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress bar */}
          <div className="bg-zinc-950 px-6 py-3 border-b border-zinc-800 text-xs">
            {remainingNGN > 0 ? (
              <p className="text-zinc-300 font-sans mb-1.5">
                Add <span className="font-bold text-amber-400 font-mono">₦{remainingNGN.toLocaleString()}</span> more for <span className="text-emerald-400 font-semibold">FREE Express Nigerian Delivery</span>!
              </p>
            ) : (
              <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Congratulations! You qualified for FREE Express Delivery across Nigeria!
              </p>
            )}
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-zinc-800/60">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-zinc-400 space-y-4">
                <div className="p-4 rounded-full bg-zinc-800/80 text-zinc-500">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-base font-medium text-zinc-200">Your bag is currently empty</p>
                  <p className="text-xs text-zinc-400 mt-1">Explore our new capsule collection to add items.</p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full transition-all cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="pt-4 first:pt-0 flex gap-4">
                  <div className="w-20 h-24 bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.name}</h4>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                        <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 font-mono">Size: {item.selectedSize}</span>
                        {item.selectedColor && (
                          <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">{item.selectedColor}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-950 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(index, -1)}
                          className="p-1 hover:bg-zinc-800 text-zinc-300 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, 1)}
                          className="p-1 hover:bg-zinc-800 text-zinc-300 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold font-mono text-amber-400">
                        {formatPrice(item.product.priceNGN * item.quantity, item.product.priceUSD * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-950 space-y-4">
              {/* Promo Code Input */}
              <div className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. WAYWARD10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:border-amber-400 uppercase font-mono"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && <p className="text-[11px] text-emerald-400 font-medium">{promoSuccess}</p>}
                {promoError && <p className="text-[11px] text-rose-400">{promoError}</p>}
              </div>

              {/* Order Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-200">{formatPrice(subtotalNGN, subtotalUSD, currency)}</span>
                </div>
                {discountNGN > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono">-{formatPrice(discountNGN, discountUSD, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery (Nigeria)</span>
                  <span className="font-mono text-zinc-200">
                    {subtotalNGN >= freeShippingThresholdNGN ? 'FREE' : 'Calculated at Checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total Amount</span>
                  <span className="font-mono text-amber-400">{formatPrice(finalNGN, finalUSD, currency)}</span>
                </div>
              </div>

              {/* Instant Nigerian Checkout CTA */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-extrabold text-xs py-4 px-6 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-amber-500/20 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Self-Checkout via Nigerian Banks</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </button>

              <div className="text-center">
                <span className="text-[10px] text-zinc-500 font-mono">
                  Guaranteed NIBSS Interbank & 3D-Secure Encrypted
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
