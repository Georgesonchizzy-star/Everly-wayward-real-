import { NigerianBank } from '../types';

export const NIGERIAN_BANKS: NigerianBank[] = [
  { code: '058', name: 'GTBank (Guaranty Trust Bank)', ussdPrefix: '*737*', logoText: 'GTB', color: '#e05c14' },
  { code: '057', name: 'Zenith Bank', ussdPrefix: '*966*', logoText: 'ZNB', color: '#d9251c' },
  { code: '044', name: 'Access Bank', ussdPrefix: '*901*', logoText: 'ACC', color: '#003366' },
  { code: '011', name: 'First Bank of Nigeria', ussdPrefix: '*894*', logoText: 'FBN', color: '#00205b' },
  { code: '033', name: 'United Bank for Africa (UBA)', ussdPrefix: '*919*', logoText: 'UBA', color: '#d4001a' },
  { code: '562', name: 'Kuda Microfinance Bank', ussdPrefix: '*5573*', logoText: 'KUD', color: '#40196d' },
  { code: '50515', name: 'Moniepoint Microfinance Bank', ussdPrefix: '*5573*', logoText: 'MPB', color: '#0052cc' },
  { code: '999991', name: 'OPay Nigeria', ussdPrefix: '*955*', logoText: 'OPY', color: '#00b875' },
  { code: '039', name: 'Stanbic IBTC Bank', ussdPrefix: '*909*', logoText: 'SIB', color: '#0033a0' },
  { code: '232', name: 'Sterling Bank', ussdPrefix: '*822*', logoText: 'STR', color: '#d0021b' },
  { code: '214', name: 'FCMB (First City Monument)', ussdPrefix: '*329*', logoText: 'FCM', color: '#5b2b82' },
  { code: '070', name: 'Fidelity Bank', ussdPrefix: '*770*', logoText: 'FDL', color: '#003b6d' },
  { code: '035', name: 'Wema Bank (ALAT)', ussdPrefix: '*945*', logoText: 'WMA', color: '#681c63' },
  { code: '032', name: 'Union Bank of Nigeria', ussdPrefix: '*826*', logoText: 'UBN', color: '#0097d9' },
  { code: '101', name: 'Providus Bank', ussdPrefix: '*737*', logoText: 'PRV', color: '#00263e' },
  { code: '215', name: 'Unity Bank', ussdPrefix: '*7799*', logoText: 'UNT', color: '#138b37' },
];

export const NIGERIAN_STATES = [
  'Lagos',
  'FCT Abuja',
  'Rivers (Port Harcourt)',
  'Oyo (Ibadan)',
  'Enugu',
  'Anambra (Awka/Onitsha)',
  'Delta (Asaba/Warri)',
  'Kano',
  'Kaduna',
  'Edo (Benin City)',
  'Ogun (Abeokuta)',
  'Ondo (Akure)',
  'Abia (Aba/Umuahia)',
  'Akwa Ibom (Uyo)',
  'Cross River (Calabar)',
  'Imo (Owerri)',
  'Kwara (Ilorin)',
  'Osun (Osogbo)',
  'Ekiti (Ado-Ekiti)',
  'Bayelsa (Yenagoa)',
  'Benue (Makurdi)',
  'Borno (Maiduguri)',
  'Ebonyi (Abakaliki)',
  'Gombe',
  'Jigawa',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Nasarawa',
  'Niger',
  'Plateau (Jos)',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara'
];

export const TEST_CARDS = [
  {
    name: 'Nigerian Verve Card (Successful)',
    number: '5061 1234 5678 9012',
    expiry: '12/28',
    cvv: '321',
    pin: '1234',
    otp: '554433',
    type: 'Verve'
  },
  {
    name: 'GTBank Mastercard (3D Secure OTP)',
    number: '5399 4110 8823 9941',
    expiry: '08/27',
    cvv: '884',
    pin: '4321',
    otp: '889900',
    type: 'Mastercard'
  },
  {
    name: 'Zenith Visa Card (Instant Approval)',
    number: '4111 2222 3333 4444',
    expiry: '05/29',
    cvv: '123',
    pin: '0000',
    otp: '112233',
    type: 'Visa'
  }
];
