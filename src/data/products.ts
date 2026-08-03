import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'ew-001',
    name: 'Wayward Heavyweight Oversized Hoodie',
    priceNGN: 65000,
    priceUSD: 45,
    category: 'Hoodies & Sweats',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Noir Black', hex: '#121212' },
      { name: 'Warm Charcoal', hex: '#2b2b2b' },
      { name: 'Oatmeal', hex: '#d8cfca' }
    ],
    images: [
      '/src/assets/images/hero_editorial_1785762356687.jpg',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Crafted from 450 GSM double-faced combed organic cotton. Features custom dropped shoulders, double-stitched ribbing, and subtle embossed Everly Wayward tonal branding on the chest.',
    details: [
      '450 GSM Heavyweight French Terry Cotton',
      'Pre-shrunk double-washed for soft hand feel',
      'Reinforced kangaroo pocket with hidden key stash',
      'Artisanal metal aglets and custom drawstrings',
      'Ethically tailored in Lagos & Milan'
    ],
    fabric: '100% Organic Heavyweight Cotton',
    inStock: true,
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: 'ew-002',
    name: 'Everly Sculpted Double-Breasted Trench Coat',
    priceNGN: 145000,
    priceUSD: 98,
    category: 'Outerwear',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Deep Espresso', hex: '#241a15' },
      { name: 'Sandstone Beige', hex: '#c5b69f' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1000',
      '/src/assets/images/lookbook_banner_1785762370269.jpg'
    ],
    description: 'An architectural silhouette crafted from water-repellent Italian cotton gabardine. Features structured shoulder pads, storm flap, horn buttons, and an oversized waist belt.',
    details: [
      'Structured Italian Cotton Gabardine',
      'Water and wind resistant finish',
      'Fully lined in cupro satin',
      'Deep welt side pockets and internal phone pocket',
      'Back vent for fluid movement'
    ],
    fabric: 'Italian Cotton Gabardine / Cupro Satin Lining',
    inStock: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 19
  },
  {
    id: 'ew-003',
    name: 'Architect Raw Denim Wide Trouser',
    priceNGN: 72000,
    priceUSD: 50,
    category: 'Trousers',
    gender: 'Unisex',
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Deep Indigo', hex: '#1b2a47' },
      { name: 'Washed Charcoal', hex: '#343438' }
    ],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=1000'
    ],
    description: '14.5oz Japanese selvedge denim cut in a wide-leg architectural silhouette with front double pleats and vintage bronze hardware.',
    details: [
      '14.5oz Japanese Selvedge Denim',
      'Deep double front pleats',
      'Custom stamped leather rear patch',
      'Wide leg opening with subtle taper'
    ],
    fabric: '100% Selvedge Raw Cotton',
    inStock: true,
    isBestseller: true,
    rating: 4.8,
    reviewsCount: 42
  },
  {
    id: 'ew-004',
    name: 'Monogram Silk-Blend Resort Shirt',
    priceNGN: 52000,
    priceUSD: 36,
    category: 'Tops & Tees',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Midnight Onyx', hex: '#0f0f10' },
      { name: 'Raw Ivory', hex: '#f4f1ea' }
    ],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Breathable mulberry silk and Tencel blend camp collar shirt adorned with the signature Everly Wayward geometric geometric monogram print.',
    details: [
      '30% Mulberry Silk, 70% Tencel',
      'Relaxed camp collar construction',
      'Mother-of-pearl buttons',
      'Side slit hem for effortless drape'
    ],
    fabric: 'Silk-Tencel Luxury Weave',
    inStock: true,
    isNew: false,
    rating: 4.7,
    reviewsCount: 26
  },
  {
    id: 'ew-005',
    name: 'Signature Wayward Modular Cargo Pant',
    priceNGN: 85000,
    priceUSD: 59,
    category: 'Trousers',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Military Olive', hex: '#3e4537' },
      { name: 'Obsidian', hex: '#171717' }
    ],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Utility meets high fashion. High-density cotton twill cargo trousers with magnetic Fidlock buckle pockets and adjustable cuff straps.',
    details: [
      'High-density 320 GSM Cotton Twill',
      '6 strategic utility pockets',
      'Magnetic buckle closures',
      'Adjustable ankle cinches'
    ],
    fabric: '100% Reinforced Cotton Twill',
    inStock: true,
    isBestseller: true,
    rating: 4.9,
    reviewsCount: 54
  },
  {
    id: 'ew-006',
    name: 'Wayward Essential Boxy Studio Tee',
    priceNGN: 38000,
    priceUSD: 26,
    category: 'Tops & Tees',
    gender: 'Unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Optical White', hex: '#ffffff' },
      { name: 'Washed Black', hex: '#1a1a1a' },
      { name: 'Sage Green', hex: '#7b8c7b' }
    ],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'The definitive daily tee. 280 GSM heavyweight jersey with a structured high mock neck collar and vintage boxy street drape.',
    details: [
      '280 GSM Organic Cotton Jersey',
      'Thick 1.25" rib knit collar',
      'Tonal minimalist embroidery on sleeve',
      'Pre-shrunk for consistent fit'
    ],
    fabric: '100% Organic Heavy Cotton',
    inStock: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 88
  },
  {
    id: 'ew-007',
    name: 'Asymmetric Sculpted Pleated Dress',
    priceNGN: 110000,
    priceUSD: 75,
    category: 'Dresses',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Emerald Noir', hex: '#0f2b23' },
      { name: 'Champagne Gold', hex: '#d4af37' }
    ],
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Fluid yet structured. High-heat knife pleated midi dress featuring an asymmetrical shoulder neckline and dynamic movement drape.',
    details: [
      'Heat-set Japanese Pleated Microfiber',
      'Hidden side zip closure',
      'Includes detachable waist sash',
      'Crease-resistant luxury drape'
    ],
    fabric: 'Japanese Pleated Microfiber',
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 15
  },
  {
    id: 'ew-008',
    name: 'Wayward Padded Quilted Bomber Jacket',
    priceNGN: 125000,
    priceUSD: 85,
    category: 'Outerwear',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Graphite Grey', hex: '#333333' },
      { name: 'Dark Taupe', hex: '#4a443f' }
    ],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Insulated aviator-inspired bomber jacket with diamond quilting, heavy 2-way matte zipper, and ribbed wool storm collar.',
    details: [
      'Waterproof Recycled Nylon Shell',
      'Lightweight thermal insulation fill',
      'Heavy-duty YKK double-zipper',
      'Internal zippered chest pocket'
    ],
    fabric: 'Satin Finish Recycled Nylon / Thermal Fill',
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviewsCount: 22
  },
  {
    id: 'ew-009',
    name: 'Artisanal Structured Leather Crossbody',
    priceNGN: 95000,
    priceUSD: 65,
    category: 'Accessories',
    gender: 'Unisex',
    sizes: ['One Size'],
    colors: [
      { name: 'Onyx Black', hex: '#0a0a0a' },
      { name: 'Raw Saddle', hex: '#794726' }
    ],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Handcrafted full-grain calfskin leather bag with magnetic flap fold, adjustable woven strap, and custom engraved brass hardware.',
    details: [
      '100% Full-Grain Italian Calfskin',
      'Soft suede interior lining with card slots',
      'Heavy antique brass magnetic clasp',
      'Debossed Everly Wayward seal'
    ],
    fabric: 'Full-Grain Calfskin Leather',
    inStock: true,
    isBestseller: true,
    rating: 5.0,
    reviewsCount: 31
  },
  {
    id: 'ew-010',
    name: 'Ribbed Heavy Merino Knit Turtleneck',
    priceNGN: 68000,
    priceUSD: 46,
    category: 'Hoodies & Sweats',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Bone White', hex: '#f0ede6' },
      { name: 'Espresso', hex: '#1c1410' }
    ],
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Soft 100% extra-fine Merino wool knitted sweater with thick fisherman ribbing and comfortable fold-over collar.',
    details: [
      '100% Extra-Fine Australian Merino Wool',
      '7-gauge heavy fisherman rib knit',
      'Naturally temperature-regulating',
      'Seamless shoulder transition'
    ],
    fabric: 'Extra-Fine Merino Wool',
    inStock: true,
    rating: 4.8,
    reviewsCount: 19
  }
];
