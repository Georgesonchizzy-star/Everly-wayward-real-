import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [unit, setUnit] = useState<'cm' | 'inches'>('inches');

  const topsData = [
    { size: 'XS', chest: unit === 'inches' ? '34 - 36"' : '86 - 91 cm', length: unit === 'inches' ? '27"' : '68 cm' },
    { size: 'S', chest: unit === 'inches' ? '36 - 38"' : '91 - 96 cm', length: unit === 'inches' ? '28"' : '71 cm' },
    { size: 'M', chest: unit === 'inches' ? '38 - 40"' : '96 - 101 cm', length: unit === 'inches' ? '29"' : '74 cm' },
    { size: 'L', chest: unit === 'inches' ? '40 - 42"' : '101 - 106 cm', length: unit === 'inches' ? '30"' : '76 cm' },
    { size: 'XL', chest: unit === 'inches' ? '42 - 45"' : '106 - 114 cm', length: unit === 'inches' ? '31"' : '79 cm' },
    { size: 'XXL', chest: unit === 'inches' ? '45 - 48"' : '114 - 122 cm', length: unit === 'inches' ? '32"' : '81 cm' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-zinc-950 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold font-serif text-white">Everly Wayward Garment Measurements</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400 font-mono">Unisex & Oversized Street Silhouette</span>
            <div className="bg-zinc-950 p-1 rounded-lg border border-zinc-800 flex gap-1 font-mono">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                  unit === 'inches' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                  unit === 'cm' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Centimeters
              </button>
            </div>
          </div>

          <table className="w-full text-left text-xs text-zinc-300 font-mono border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-amber-400 uppercase text-[11px]">
                <th className="py-2.5">Size Tag</th>
                <th className="py-2.5">Chest Width</th>
                <th className="py-2.5">Garment Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {topsData.map((row) => (
                <tr key={row.size} className="hover:bg-zinc-800/40">
                  <td className="py-2.5 font-bold text-white">{row.size}</td>
                  <td className="py-2.5">{row.chest}</td>
                  <td className="py-2.5">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 text-xs text-zinc-400 space-y-1">
            <p className="font-semibold text-zinc-200">Fit Guidance:</p>
            <p className="text-[11px]">
              Our tops and hoodies feature an intentionally dropped-shoulder, oversized fit. If you prefer a standard tailored silhouette, order one size down.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
