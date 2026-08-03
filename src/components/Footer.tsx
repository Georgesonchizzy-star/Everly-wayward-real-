import React, { useState } from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Instagram, ArrowRight, Check, Building2 } from 'lucide-react';
import { NIGERIAN_BANKS } from '../data/banks';

interface FooterProps {
  onOpenTrackOrder: () => void;
  onOpenCheckoutDirect: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTrackOrder, onOpenCheckoutDirect }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-extrabold font-serif text-white tracking-[0.2em] uppercase">
              EVERLY WAYWARD
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Artisanal apparel house merging contemporary streetwear silhouettes with Italian tailoring standards. Designed and ethically crafted between Lagos, Milan, and Paris.
            </p>

            <div className="pt-2 flex items-center gap-3 text-zinc-300">
              <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <button 
                onClick={onOpenTrackOrder}
                className="flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-mono ml-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Track Order</span>
              </button>
            </div>
          </div>

          {/* Stores */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-serif">
              Flagship Stores
            </h4>
            <div className="space-y-3 text-xs text-zinc-400">
              <div>
                <span className="font-semibold text-zinc-200 block">Lagos Store:</span>
                <p>24b Bishop Oluwole St, Victoria Island, Lagos</p>
                <p className="font-mono text-emerald-400 text-[11px]">+234 814 902 3841</p>
              </div>
              <div>
                <span className="font-semibold text-zinc-200 block">Abuja Store:</span>
                <p>Plot 821 Ibrahim Babangida Way, Maitama, FCT Abuja</p>
                <p className="font-mono text-emerald-400 text-[11px]">+234 809 112 0044</p>
              </div>
            </div>
          </div>

          {/* Direct Nigerian Self-Checkout Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-serif">
              Nigerian Self-Checkout
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenCheckoutDirect} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Instant NIBSS Bank Transfer
                </button>
              </li>
              <li>
                <button onClick={onOpenCheckoutDirect} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  USSD Bank Codes (*737#, *966#...)
                </button>
              </li>
              <li>
                <button onClick={onOpenCheckoutDirect} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Nigerian Cards (Verve, Mastercard, Visa)
                </button>
              </li>
              <li>
                <button onClick={onOpenCheckoutDirect} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  NIBSS Direct Instant QR Scanner
                </button>
              </li>
              <li>
                <button onClick={onOpenTrackOrder} className="text-emerald-400 hover:underline cursor-pointer font-mono text-[11px] mt-1 block">
                  Look Up Existing Receipt & Order
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-serif">
              Wayward Private Club
            </h4>
            <p className="text-xs text-zinc-400">
              Subscribe for early access to limited edition drop releases and private sample sales in Lagos.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 rounded-lg pl-3 pr-10 py-2.5 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-md transition-colors cursor-pointer"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5 text-emerald-950" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && <p className="text-[11px] text-emerald-400 font-medium">Welcome to the Wayward List.</p>}
            </form>
          </div>
        </div>

        {/* Bank Logos Strip */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Supported Nigerian Banks:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {NIGERIAN_BANKS.slice(0, 8).map((bank) => (
              <span 
                key={bank.code} 
                className="bg-zinc-900 text-zinc-300 font-mono text-[10px] px-2 py-1 rounded border border-zinc-800 font-bold"
                style={{ borderColor: bank.color + '40' }}
              >
                {bank.name.split(' ')[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-[11px] text-zinc-500 font-mono gap-2">
          <p>&copy; {new Date().getFullYear()} EVERLY WAYWARD APPAREL LTD. ALL RIGHTS RESERVED.</p>
          <p>NIGERIAN BANK SELF-CHECKOUT GATEWAY INTEGRATED</p>
        </div>
      </div>
    </footer>
  );
};
