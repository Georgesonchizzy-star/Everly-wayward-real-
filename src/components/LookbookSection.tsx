import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { Compass, ShoppingBag, ArrowRight, Eye, Star } from 'lucide-react';

interface LookbookSectionProps {
  products: Product[];
  currency: Currency;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, size: string, color: string) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  products,
  currency,
  onQuickView,
  onAddToCart
}) => {
  const [activeLook, setActiveLook] = useState(0);

  const looks = [
    {
      title: 'LOOK 01 &bull; NOIR MINIMALISM',
      subtitle: 'Harmattan Street-Couture Capsule',
      image: '/src/assets/images/lookbook_banner_1785762370269.jpg',
      featuredProducts: [products[0], products[2]],
      description: 'Layering 450 GSM French Terry Hoodies with 14.5oz Japanese Selvedge Raw Denim.'
    },
    {
      title: 'LOOK 02 &bull; SCULPTED TRENCH',
      subtitle: 'Milano x Lagos Architecture',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200',
      featuredProducts: [products[1], products[8]],
      description: 'Double-breasted Italian cotton gabardine trench paired with handcrafted calfskin crossbody bag.'
    },
    {
      title: 'LOOK 03 &bull; MODULAR UTILITY',
      subtitle: 'Artisanal Tactical Streetwear',
      image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=1200',
      featuredProducts: [products[4], products[5]],
      description: 'Magnetic Fidlock buckle cargo trousers with 280 GSM heavyweight studio tee.'
    }
  ];

  const currentLook = looks[activeLook];

  const formatPrice = (ngn: number, usd: number, curr: Currency) => {
    if (curr === 'NGN') return `₦ ${ngn.toLocaleString('en-NG')}`;
    if (curr === 'USD') return `$ ${usd.toLocaleString('en-US')}`;
    return `£ ${Math.round(usd * 0.78).toLocaleString('en-GB')}`;
  };

  return (
    <section className="bg-zinc-950 py-16 border-t border-zinc-800 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-mono tracking-widest uppercase mb-2">
              <Compass className="w-4 h-4" />
              <span>EDITORIAL LOOKBOOK '26</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight text-white">
              WAYWARD SILHOUETTES
            </h2>
          </div>

          {/* Look Selector Tabs */}
          <div className="flex gap-2">
            {looks.map((lk, idx) => (
              <button
                key={idx}
                onClick={() => setActiveLook(idx)}
                className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeLook === idx
                    ? 'bg-amber-400 text-zinc-950 font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                Look 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Look Display Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-900 border border-zinc-800 rounded-3xl p-6 lg:p-8">
          {/* Main Look Image */}
          <div className="lg:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
            <img
              src={currentLook.image}
              alt={currentLook.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-mono text-amber-400 tracking-wider block">{currentLook.subtitle}</span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">{currentLook.title}</h3>
              <p className="text-xs text-zinc-300 mt-1 max-w-lg">{currentLook.description}</p>
            </div>
          </div>

          {/* Featured Garments in this look */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">
              Garments in this Editorial:
            </h4>

            <div className="space-y-3">
              {currentLook.featuredProducts.filter(Boolean).map((prod) => (
                <div 
                  key={prod.id} 
                  className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80 hover:border-zinc-700 transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-14 h-16 object-cover rounded-lg bg-zinc-900"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-white line-clamp-1">{prod.name}</h5>
                      <span className="text-[11px] text-zinc-400 font-serif italic block">{prod.fabric}</span>
                      <span className="text-xs font-bold font-mono text-amber-400 mt-1 block">
                        {formatPrice(prod.priceNGN, prod.priceUSD, currency)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => onQuickView(prod)}
                      className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Quick Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onAddToCart(prod, prod.sizes[0] || 'M', prod.colors[0]?.name || '')}
                      className="p-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-lg font-bold transition-colors cursor-pointer"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
