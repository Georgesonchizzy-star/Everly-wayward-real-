export type Category = 'All' | 'Outerwear' | 'Hoodies & Sweats' | 'Tops & Tees' | 'Trousers' | 'Dresses' | 'Accessories';

export type Currency = 'NGN' | 'USD' | 'GBP';

export interface Product {
  id: string;
  name: string;
  priceNGN: number;
  priceUSD: number;
  category: Category;
  gender: 'Unisex' | 'Men' | 'Women';
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  description: string;
  details: string[];
  fabric: string;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface NigerianBank {
  code: string;
  name: string;
  ussdPrefix: string;
  logoText: string;
  color: string;
}

export type PaymentMethod = 'transfer' | 'card' | 'ussd' | 'qr';

export interface DeliveryDetails {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  notes?: string;
  deliveryOption: 'standard' | 'express' | 'pickup';
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotalNGN: number;
  shippingFeeNGN: number;
  discountNGN: number;
  totalNGN: number;
  currency: Currency;
  deliveryDetails: DeliveryDetails;
  paymentMethod: PaymentMethod;
  bankUsed?: string;
  virtualAccount?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    reference: string;
    expiresInMinutes: number;
  };
  paymentStatus: 'pending' | 'verifying' | 'paid' | 'failed';
  createdAt: string;
  estimatedDeliveryDate: string;
  trackingStatus: 'Order Placed' | 'Payment Verified' | 'Garment Processing' | 'Dispatched (GIG Logistics)' | 'Out for Delivery' | 'Delivered';
}
