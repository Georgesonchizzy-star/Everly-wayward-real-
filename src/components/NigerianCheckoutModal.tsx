import React, { useState, useEffect } from 'react';
import { CartItem, Currency, DeliveryDetails, Order, PaymentMethod } from '../types';
import { NIGERIAN_BANKS, NIGERIAN_STATES, TEST_CARDS } from '../data/banks';
import { 
  X, ShieldCheck, CheckCircle2, Copy, Check, Clock, Phone, MapPin, 
  CreditCard, Building2, Smartphone, QrCode, ArrowLeft, ArrowRight, 
  Lock, AlertCircle, RefreshCw, Printer, Download, Truck, ChevronRight
} from 'lucide-react';

interface NigerianCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  onOrderComplete: (order: Order) => void;
}

export const NigerianCheckoutModal: React.FC<NigerianCheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onOrderComplete
}) => {
  if (!isOpen) return null;

  // Flow Step: 'details' | 'payment' | 'otp' | 'verifying' | 'success'
  const [step, setStep] = useState<'details' | 'payment' | 'otp' | 'verifying' | 'success'>('details');

  // Delivery details form state
  const [delivery, setDelivery] = useState<DeliveryDetails>({
    email: 'georgesonchizzy@gmail.com',
    firstName: 'Chizzy',
    lastName: 'Georges',
    phone: '+234 814 902 3841',
    address: 'Plot 14, Admiralty Way, Lekki Phase 1',
    city: 'Lagos',
    state: 'Lagos',
    notes: 'Please call before delivery',
    deliveryOption: 'express'
  });

  // Selected Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('transfer');

  // Virtual Account Details generated for Transfer
  const [virtualAccount, setVirtualAccount] = useState({
    bankName: 'Moniepoint Microfinance Bank / Paystack',
    accountNumber: '9948271039',
    accountName: 'EVERLY WAYWARD APPAREL NIGERIA',
    reference: `EW-NG-${Math.floor(100000 + Math.random() * 900000)}`,
    expiresInSeconds: 900 // 15 mins
  });

  // Selected USSD Bank
  const [selectedUssdBank, setSelectedUssdBank] = useState(NIGERIAN_BANKS[0]);

  // Card payment state
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    pin: '',
    otp: ''
  });
  const [inputOtp, setInputOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  // Copy Feedback state
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [copiedUssd, setCopiedUssd] = useState(false);

  // Countdown timer for bank transfer
  const [timer, setTimer] = useState(900);

  // Verifying state progress message
  const [verifyProgress, setVerifyProgress] = useState('Connecting to NIBSS Interbank Network...');

  // Completed Order state
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Calculate pricing
  const subtotalNGN = cart.reduce((acc, item) => acc + item.product.priceNGN * item.quantity, 0);
  const subtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);

  const shippingFeeNGN = delivery.deliveryOption === 'express' 
    ? (subtotalNGN >= 100000 ? 0 : 5000) 
    : (delivery.deliveryOption === 'standard' ? 2500 : 0);

  const totalNGN = subtotalNGN + shippingFeeNGN;
  const totalUSD = subtotalUSD + (shippingFeeNGN / 1500);

  // Timer effect for Virtual Account expiration
  useEffect(() => {
    let interval: any;
    if (step === 'payment' && paymentMethod === 'transfer') {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, paymentMethod]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string, type: 'account' | 'amount' | 'ussd') => {
    navigator.clipboard.writeText(text);
    if (type === 'account') {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    } else if (type === 'amount') {
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2000);
    } else {
      setCopiedUssd(true);
      setTimeout(() => setCopiedUssd(false), 2000);
    }
  };

  const handleLoadTestCard = (card: typeof TEST_CARDS[0]) => {
    setCardDetails({
      number: card.number,
      expiry: card.expiry,
      cvv: card.cvv,
      pin: card.pin,
      otp: card.otp
    });
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const executePaymentVerification = () => {
    setStep('verifying');
    setVerifyProgress('Connecting to NIBSS Interbank Switch Network...');
    
    setTimeout(() => {
      setVerifyProgress('Matching Transaction Reference ' + virtualAccount.reference + '...');
    }, 1500);

    setTimeout(() => {
      setVerifyProgress('Confirming Deposit Account Clearance with Moniepoint MFB...');
    }, 3000);

    setTimeout(() => {
      // Payment Verified! Create final Order record
      const newOrder: Order = {
        id: `EW-${Date.now()}`,
        orderNumber: virtualAccount.reference,
        items: [...cart],
        subtotalNGN,
        shippingFeeNGN,
        discountNGN: 0,
        totalNGN,
        currency,
        deliveryDetails: delivery,
        paymentMethod,
        bankUsed: paymentMethod === 'ussd' ? selectedUssdBank.name : 'Moniepoint MFB / Paystack',
        virtualAccount: paymentMethod === 'transfer' ? virtualAccount : undefined,
        paymentStatus: 'paid',
        createdAt: new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short', year: 'numeric' }),
        estimatedDeliveryDate: delivery.deliveryOption === 'express' ? 'Within 24-48 Hours' : 'Within 3-5 Business Days',
        trackingStatus: 'Payment Verified'
      };

      setCompletedOrder(newOrder);
      onOrderComplete(newOrder);
      setStep('success');
    }, 4500);
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
      alert('Please fill out all bank card details');
      return;
    }
    // Launch 3D Secure OTP Step
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    if (inputOtp === cardDetails.otp || inputOtp === '123456' || inputOtp.length >= 4) {
      executePaymentVerification();
    } else {
      setOtpError('Invalid OTP code. Use test OTP: ' + (cardDetails.otp || '123456'));
    }
  };

  const ussdDialCode = `${selectedUssdBank.ussdPrefix}000*${totalNGN}*${virtualAccount.reference.replace(/\D/g, '').slice(0, 6)}#`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <Building2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif text-white tracking-wide">
                EVERLY WAYWARD &bull; NIGERIAN SELF-CHECKOUT
              </h3>
              <p className="text-[11px] text-zinc-400 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                NIBSS Interbank Verified Deposit Switch &bull; 256-Bit SSL Encrypted
              </p>
            </div>
          </div>
          
          {step !== 'verifying' && step !== 'success' && (
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Stepper Header */}
        {step !== 'verifying' && step !== 'success' && (
          <div className="bg-zinc-950 px-6 py-3 border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
            <div className={`flex items-center gap-2 ${step === 'details' ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 'details' ? 'bg-amber-400 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-300'}`}>1</span>
              <span>Delivery Information</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
            <div className={`flex items-center gap-2 ${step === 'payment' || step === 'otp' ? 'text-amber-400 font-bold' : 'text-zinc-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 'payment' || step === 'otp' ? 'bg-amber-400 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-300'}`}>2</span>
              <span>Nigerian Bank Payment</span>
            </div>
          </div>
        )}

        {/* STEP 1: DELIVERY & CONTACT DETAILS */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Email Address for Receipt *
                </label>
                <input
                  type="email"
                  required
                  value={delivery.email}
                  onChange={(e) => setDelivery({ ...delivery, email: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-amber-400 font-sans"
                  placeholder="name@domain.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Nigerian Phone Number (WhatsApp Updates) *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={delivery.phone}
                    onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white rounded-lg pl-9 pr-3.5 py-2.5 focus:outline-none focus:border-amber-400 font-mono"
                    placeholder="+234 800 000 0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={delivery.firstName}
                  onChange={(e) => setDelivery({ ...delivery, firstName: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={delivery.lastName}
                  onChange={(e) => setDelivery({ ...delivery, lastName: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Delivery Street Address *
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={delivery.address}
                    onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white rounded-lg pl-9 pr-3.5 py-2.5 focus:outline-none focus:border-amber-400"
                    placeholder="House / Apartment number, Street Name, Estate or Area"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  City / Locality *
                </label>
                <input
                  type="text"
                  required
                  value={delivery.city}
                  onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Nigerian State / Territory *
                </label>
                <select
                  value={delivery.state}
                  onChange={(e) => setDelivery({ ...delivery, state: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-amber-400 cursor-pointer font-sans"
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Delivery Methods */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Select Logistics & Shipping Method:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setDelivery({ ...delivery, deliveryOption: 'express' })}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    delivery.deliveryOption === 'express'
                      ? 'border-amber-400 bg-amber-500/10 text-white font-medium'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-zinc-200">Express Courier (GIG / DHL)</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {subtotalNGN >= 100000 ? 'FREE' : '₦5,000'}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">Doorstep delivery within 24-48 hours nationwide.</p>
                </div>

                <div
                  onClick={() => setDelivery({ ...delivery, deliveryOption: 'standard' })}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    delivery.deliveryOption === 'standard'
                      ? 'border-amber-400 bg-amber-500/10 text-white font-medium'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-zinc-200">Standard Delivery</span>
                    <span className="font-mono text-amber-400 font-bold">₦2,500</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">Regular dispatch (3-5 business days).</p>
                </div>
              </div>
            </div>

            {/* Order Total summary bar */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-zinc-400 block">Total Amount Payable</span>
                <span className="text-xl font-extrabold font-mono text-amber-400">
                  ₦ {totalNGN.toLocaleString('en-NG')}
                </span>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-bold px-6 py-3 rounded-xl uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Continue to Bank Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: NIGERIAN BANK PAYMENT METHOD OPTIONS */}
        {step === 'payment' && (
          <div className="p-6 space-y-6">
            {/* Payment Mode Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-zinc-800 pb-4">
              <button
                onClick={() => setPaymentMethod('transfer')}
                className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'transfer'
                    ? 'bg-amber-400 text-zinc-950 shadow-lg scale-102'
                    : 'bg-zinc-950 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Bank Transfer</span>
              </button>

              <button
                onClick={() => setPaymentMethod('ussd')}
                className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'ussd'
                    ? 'bg-amber-400 text-zinc-950 shadow-lg scale-102'
                    : 'bg-zinc-950 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>USSD Code</span>
              </button>

              <button
                onClick={() => setPaymentMethod('card')}
                className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-amber-400 text-zinc-950 shadow-lg scale-102'
                    : 'bg-zinc-950 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Bank Card</span>
              </button>

              <button
                onClick={() => setPaymentMethod('qr')}
                className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'qr'
                    ? 'bg-amber-400 text-zinc-950 shadow-lg scale-102'
                    : 'bg-zinc-950 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>NIBSS QR Code</span>
              </button>
            </div>

            {/* OPTION A: DIRECT BANK TRANSFER */}
            {paymentMethod === 'transfer' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/40 p-5 rounded-2xl border border-emerald-500/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span className="text-xs font-medium text-zinc-300">Session Expires In:</span>
                    </div>
                    <span className="text-sm font-bold font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                      {formatTime(timer)}
                    </span>
                  </div>

                  {/* Virtual Deposit Card Box */}
                  <div className="space-y-3">
                    <p className="text-xs text-zinc-400">
                      Transfer exact amount to the dedicated virtual deposit account below using your mobile banking app (GTWorld, Kuda, Zenith, Access, Moniepoint, OPay, UBA, etc.):
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                      {/* Account Number */}
                      <div>
                        <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">Account Number</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xl font-extrabold font-mono text-white tracking-widest">
                            {virtualAccount.accountNumber}
                          </span>
                          <button
                            onClick={() => handleCopy(virtualAccount.accountNumber, 'account')}
                            className="p-1.5 bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-300 rounded transition-colors cursor-pointer"
                            title="Copy Account Number"
                          >
                            {copiedAccount ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Bank Name */}
                      <div>
                        <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">Bank Name</span>
                        <span className="text-sm font-bold text-emerald-400 mt-1 block">
                          {virtualAccount.bankName}
                        </span>
                      </div>

                      {/* Account Name */}
                      <div>
                        <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">Beneficiary Name</span>
                        <span className="text-xs font-semibold text-zinc-200 mt-1 block">
                          {virtualAccount.accountName}
                        </span>
                      </div>

                      {/* Exact Amount */}
                      <div>
                        <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">Exact Transfer Amount</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-extrabold font-mono text-amber-400">
                            ₦ {totalNGN.toLocaleString('en-NG')}
                          </span>
                          <button
                            onClick={() => handleCopy(totalNGN.toString(), 'amount')}
                            className="p-1.5 bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-300 rounded transition-colors cursor-pointer"
                            title="Copy Amount"
                          >
                            {copiedAmount ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-zinc-400 flex items-center gap-2 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Your payment will be matched automatically by NIBSS within seconds of transfer completion.</span>
                  </div>
                </div>

                {/* Trigger Verification Action */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('details')}
                    className="px-4 py-3 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs font-medium border border-zinc-800 transition-colors cursor-pointer"
                  >
                    Back to Details
                  </button>
                  <button
                    onClick={executePaymentVerification}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>I Have Made This Bank Transfer</span>
                  </button>
                </div>
              </div>
            )}

            {/* OPTION B: NIGERIAN USSD BANK CODES */}
            {paymentMethod === 'ussd' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Select Your Bank:
                    </label>
                    <select
                      value={selectedUssdBank.code}
                      onChange={(e) => {
                        const found = NIGERIAN_BANKS.find(b => b.code === e.target.value);
                        if (found) setSelectedUssdBank(found);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-700 text-xs text-white rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-amber-400 cursor-pointer font-sans"
                    >
                      {NIGERIAN_BANKS.map((bank) => (
                        <option key={bank.code} value={bank.code}>
                          {bank.name} ({bank.ussdPrefix}...)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-4 rounded-xl border border-amber-500/30 text-center space-y-2">
                    <span className="text-[11px] text-zinc-400 uppercase tracking-widest block font-mono">
                      Dial this USSD String on your registered mobile line:
                    </span>
                    <div className="flex items-center justify-center gap-2 bg-zinc-950 py-3 px-4 rounded-lg border border-zinc-800 inline-block">
                      <span className="text-lg font-bold font-mono text-amber-400 tracking-wider">
                        {ussdDialCode}
                      </span>
                      <button
                        onClick={() => handleCopy(ussdDialCode, 'ussd')}
                        className="p-1.5 bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-300 rounded transition-colors cursor-pointer"
                        title="Copy USSD Code"
                      >
                        {copiedUssd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <p className="text-[11px] text-zinc-400 pt-1">
                      Works on all Nigerian networks (MTN, Airtel, Globacom, 9mobile).
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('details')}
                    className="px-4 py-3 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs font-medium border border-zinc-800 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={executePaymentVerification}
                    className="flex-1 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Confirm USSD Payment</span>
                  </button>
                </div>
              </div>
            )}

            {/* OPTION C: NIGERIAN CARD PAYMENT (Verve / Mastercard / Visa) */}
            {paymentMethod === 'card' && (
              <form onSubmit={handleCardSubmit} className="space-y-4 animate-fadeIn">
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Preset Test Cards (Click to auto-fill):
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TEST_CARDS.map((tc, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleLoadTestCard(tc)}
                        className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-[11px] px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer font-mono"
                      >
                        <CreditCard className="w-3 h-3 text-amber-400" />
                        <span>{tc.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="5061 0000 0000 0000"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white rounded-lg px-3.5 py-2.5 font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                        Card PIN
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        placeholder="****"
                        value={cardDetails.pin}
                        onChange={(e) => setCardDetails({ ...cardDetails, pin: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Pay ₦{totalNGN.toLocaleString('en-NG')} via Card</span>
                </button>
              </form>
            )}

            {/* OPTION D: NIBSS INSTANT QR CODE */}
            {paymentMethod === 'qr' && (
              <div className="space-y-4 animate-fadeIn text-center">
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-3 flex flex-col items-center">
                  <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                    Scan with any Nigerian Bank App:
                  </span>
                  
                  {/* Generated Stylized QR Pattern */}
                  <div className="p-4 bg-white rounded-2xl shadow-xl inline-block border-4 border-amber-400">
                    <div className="w-48 h-48 bg-zinc-950 p-2 rounded-lg flex flex-col justify-between relative">
                      <div className="grid grid-cols-6 gap-1.5 h-full">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`rounded-sm ${
                              (i % 2 === 0 || i % 5 === 0 || i === 0 || i === 5 || i === 30 || i === 35) 
                                ? 'bg-amber-400' 
                                : (i % 3 === 0 ? 'bg-emerald-400' : 'bg-zinc-800')
                            }`}
                          />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-zinc-900 text-amber-400 font-extrabold text-[10px] px-2 py-1 rounded font-mono border border-amber-400">
                          EW-NIBSS
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 max-w-sm">
                    Open GTWorld, Zenith Mobile, Kuda, Access More, or OPay and scan this NIBSS QR Code for automated payment clearance.
                  </p>
                </div>

                <button
                  onClick={executePaymentVerification}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>I Have Scanned & Paid</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: 3D SECURE OTP SIMULATION */}
        {step === 'otp' && (
          <div className="p-8 text-center space-y-5 animate-fadeIn">
            <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-white font-serif">NIBSS 3D-Secure 2.0 Authorization</h4>
              <p className="text-xs text-zinc-400 mt-1">
                A 6-digit One-Time Password (OTP) was sent to your phone <span className="text-white font-mono">{delivery.phone}</span>
              </p>
            </div>

            <div className="max-w-xs mx-auto space-y-3">
              <input
                type="text"
                maxLength={6}
                value={inputOtp}
                onChange={(e) => setInputOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full text-center text-xl font-mono font-bold tracking-widest bg-zinc-950 border border-amber-400 text-white py-3 rounded-xl focus:outline-none"
              />

              <div className="text-[11px] text-zinc-500 font-mono">
                Test OTP: <span className="text-amber-400 font-bold">{cardDetails.otp || '554433'}</span>
              </div>

              {otpError && <p className="text-xs text-rose-400 font-medium">{otpError}</p>}

              <button
                onClick={handleVerifyOtp}
                className="w-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Submit OTP Authorization
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: INTERBANK VERIFICATION PROGRESS ANIMATION */}
        {step === 'verifying' && (
          <div className="p-12 text-center space-y-6 animate-fadeIn">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 border-4 border-zinc-800 border-t-amber-400 rounded-full animate-spin" />
              <Building2 className="w-6 h-6 text-amber-400 absolute inset-0 m-auto" />
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-bold text-white font-serif">Verifying Payment Clearance</h4>
              <p className="text-xs text-amber-400 font-mono animate-pulse">{verifyProgress}</p>
            </div>

            <div className="max-w-md mx-auto bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-[11px] text-zinc-400 space-y-1 text-left font-mono">
              <div className="flex justify-between">
                <span>Interbank Switch:</span>
                <span className="text-emerald-400">ONLINE (NIBSS)</span>
              </div>
              <div className="flex justify-between">
                <span>Reference ID:</span>
                <span className="text-zinc-200">{virtualAccount.reference}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount Clearance:</span>
                <span className="text-amber-400">₦{totalNGN.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: PAYMENT SUCCESS & OFFICIAL DIGITAL RECEIPT */}
        {step === 'success' && completedOrder && (
          <div className="p-6 sm:p-8 space-y-6 animate-fadeIn max-h-[85vh] overflow-y-auto">
            {/* Header checkmark */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-white">Payment Confirmed!</h3>
              <p className="text-xs text-zinc-400 font-mono">
                Official Order Reference: <span className="text-amber-400 font-bold">{completedOrder.orderNumber}</span>
              </p>
            </div>

            {/* Official Digital Printable Receipt */}
            <div id="receipt-print-area" className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-4 text-xs">
              <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
                <div>
                  <h4 className="font-serif text-lg font-bold tracking-widest text-white uppercase">EVERLY WAYWARD</h4>
                  <p className="text-[10px] text-zinc-500 font-mono">LAGOS &bull; MILAN &bull; PARIS</p>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded text-[11px] font-mono font-bold">
                    PAID VIA NIBSS
                  </span>
                  <p className="text-[11px] text-zinc-400 font-mono mt-1">{completedOrder.createdAt}</p>
                </div>
              </div>

              {/* Items summary */}
              <div className="space-y-2 py-2 border-b border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider block">Ordered Garments:</span>
                {completedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-medium text-white">{it.product.name}</span>
                      <span className="text-zinc-500 text-[11px] block">Size: {it.selectedSize} | Qty: {it.quantity}</span>
                    </div>
                    <span className="font-mono text-zinc-300">
                      ₦ {(it.product.priceNGN * it.quantity).toLocaleString('en-NG')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery info */}
              <div className="grid grid-cols-2 gap-4 text-[11px] py-2 border-b border-zinc-800">
                <div>
                  <span className="text-zinc-500 uppercase font-mono block">Customer Info:</span>
                  <p className="font-medium text-white">{completedOrder.deliveryDetails.firstName} {completedOrder.deliveryDetails.lastName}</p>
                  <p className="text-zinc-400">{completedOrder.deliveryDetails.email}</p>
                  <p className="text-zinc-400 font-mono">{completedOrder.deliveryDetails.phone}</p>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase font-mono block">Shipping Destination:</span>
                  <p className="text-zinc-300">{completedOrder.deliveryDetails.address}</p>
                  <p className="text-zinc-300">{completedOrder.deliveryDetails.city}, {completedOrder.deliveryDetails.state}</p>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="space-y-1 text-xs font-mono pt-2">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal:</span>
                  <span>₦{completedOrder.subtotalNGN.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Logistics Courier Fee:</span>
                  <span>₦{completedOrder.shippingFeeNGN.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-amber-400 pt-2 border-t border-zinc-800">
                  <span>Total Paid (NGN):</span>
                  <span>₦{completedOrder.totalNGN.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <span>Complete & Return to Shop</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
