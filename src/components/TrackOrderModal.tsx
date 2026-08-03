import React, { useState } from 'react';
import { Order } from '../types';
import { X, Search, ShieldCheck, Truck, CheckCircle2, Clock, MapPin, Package, Building2 } from 'lucide-react';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  orders
}) => {
  if (!isOpen) return null;

  const [searchRef, setSearchRef] = useState('');
  const [activeOrder, setActiveOrder] = useState<Order | null>(orders[0] || null);
  const [searchError, setSearchError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRef.trim()) return;

    const found = orders.find(
      (o) => o.orderNumber.toLowerCase().includes(searchRef.trim().toLowerCase()) ||
             o.id.toLowerCase().includes(searchRef.trim().toLowerCase()) ||
             o.deliveryDetails.phone.includes(searchRef.trim())
    );

    if (found) {
      setActiveOrder(found);
      setSearchError('');
    } else {
      setSearchError('No order found matching "' + searchRef + '". Check reference ID or phone number.');
    }
  };

  const steps = [
    { label: 'Order Placed', status: 'completed', icon: Package },
    { label: 'Payment Verified (NIBSS)', status: 'completed', icon: Building2 },
    { label: 'Garment Processing', status: 'completed', icon: Clock },
    { label: 'Dispatched (GIG Logistics)', status: 'active', icon: Truck },
    { label: 'Out for Delivery', status: 'pending', icon: MapPin },
    { label: 'Delivered', status: 'pending', icon: CheckCircle2 }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-zinc-950 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold font-serif text-white">Track Your Order Status</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Lookup Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Enter Order Reference (e.g. EW-NG-884920 or +234 Phone)"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white rounded-xl pl-9 pr-3.5 py-2.5 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer"
            >
              Lookup
            </button>
          </form>

          {searchError && (
            <p className="text-xs text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">{searchError}</p>
          )}

          {/* Active Order Details */}
          {activeOrder ? (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-wrap justify-between items-center gap-4 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block">Order Number</span>
                  <span className="font-bold text-amber-400">{activeOrder.orderNumber}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Estimated Delivery</span>
                  <span className="text-emerald-400 font-bold">{activeOrder.estimatedDeliveryDate}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Amount Paid</span>
                  <span className="text-white font-bold">₦{activeOrder.totalNGN.toLocaleString()}</span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
                  Live Fulfillment Progress:
                </h4>

                <div className="space-y-3">
                  {steps.map((st, idx) => {
                    const IconComp = st.icon;
                    return (
                      <div key={idx} className="flex items-center gap-4 text-xs">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          st.status === 'completed'
                            ? 'bg-emerald-500 text-zinc-950 font-bold'
                            : (st.status === 'active' ? 'bg-amber-400 text-zinc-950 font-bold animate-pulse' : 'bg-zinc-800 text-zinc-500')
                        }`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${st.status === 'completed' || st.status === 'active' ? 'text-white' : 'text-zinc-500'}`}>
                            {st.label}
                          </p>
                          {st.status === 'active' && (
                            <p className="text-[11px] text-amber-400 font-mono">Dispatched via GIG Logistics Courier (AWB #GIG-884920)</p>
                          )}
                        </div>
                        {st.status === 'completed' && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            Verified
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-zinc-500 text-xs">
              <Package className="w-10 h-10 mx-auto text-zinc-600 mb-2" />
              <p>Enter your order reference above to view live courier status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
