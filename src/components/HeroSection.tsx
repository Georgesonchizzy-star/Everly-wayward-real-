import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Truck, CreditCard, Building2 } from 'lucide-react';

interface HeroSectionProps {
  onShopClick: () => void;
  onOpenCheckoutDirect: () => void;
  onOpenLookbook: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onOpenCheckoutDirect,
  onOpenLookbook
}) => {
  return (
    <div className="relative bg-zinc-950 text-white overflow-hidden border-b border-zinc-800">
      {/* Background Graphic & Accent Light */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <img
          src="/src/assets/images/hero_editorial_1785762356687.jpg"
          alt="Everly Wayward Collection"
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-400 font-mono tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            NEW CAPSULE COLLECTION &bull; HARMATTAN/AUTUMN '26
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif leading-tight">
            DEFINING MODERN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-amber-400">
              WAYWARD COUTURE
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
            High-density organic cottons, Japanese selvedge denim, and structured outerwear tailored between Lagos and Milan. Seamless self-checkout supporting all major Nigerian banks, instant transfer verification & USSD.
          </p>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onShopClick}
              className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold px-7 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2 cursor-pointer"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCheckoutDirect}
              className="bg-zinc-900/90 hover:bg-zinc-800 text-white border border-emerald-500/40 hover:border-emerald-400 px-6 py-3.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Nigerian Bank Checkout</span>
            </button>

            <button
              onClick={onOpenLookbook}
              className="text-zinc-300 hover:text-white underline underline-offset-8 text-sm font-medium px-2 py-2 transition-colors cursor-pointer"
            >
              View Lookbook
            </button>
          </div>

          {/* Feature Badges */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-zinc-800/80 text-xs text-zinc-400">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-semibold text-zinc-200">Direct Bank Transfer</p>
                <p className="text-[11px] text-zinc-400">GTB, Zenith, Kuda, UBA</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-semibold text-zinc-200">USSD Self-Checkout</p>
                <p className="text-[11px] text-zinc-400">Instant code generation</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <p className="font-semibold text-zinc-200">Verve / Mastercard</p>
                <p className="text-[11px] text-zinc-400">3D Secure 2.0 OTP</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <p className="font-semibold text-zinc-200">Express Delivery</p>
                <p className="text-[11px] text-zinc-400">GIG Logistics & DHL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
