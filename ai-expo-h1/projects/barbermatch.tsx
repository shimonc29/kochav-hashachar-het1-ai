import React, { useState, useEffect } from 'react';
import { 
  Scissors, Search, Calendar, User, Shield, Star, MapPin, Phone, 
  Clock, Plus, CheckCircle, XCircle, Edit, Trash2, Heart, Filter, 
  ChevronLeft, ArrowRight, Settings, LogOut, Check, Sparkles, 
  Menu, X, AlertCircle, Share2, Award, DollarSign, ShieldCheck, Upload, Eye, Image as ImageIcon
} from 'lucide-react';

// ==========================================
// MOCK DATA & INITIAL STATE
// ==========================================
const INITIAL_SUBSCRIPTION_TIERS = [
  { id: 'free', name: 'חינם (Free)', price: 0, photosLimit: 5, staffLimit: 1, analytics: false, badge: false },
  { id: 'basic', name: 'בסיסי (Basic)', price: 49, photosLimit: 15, staffLimit: 2, analytics: false, badge: false },
  { id: 'pro', name: 'מקצועי (Pro)', price: 99, photosLimit: 50, staffLimit: 5, analytics: true, badge: true },
  { id: 'premium', name: 'פרימיום (Premium)', price: 179, photosLimit: 999, staffLimit: 99, analytics: true, badge: true }
];

const INITIAL_BUSINESSES = [
  {
    id: 'b1',
    name: 'King Cut Barbershop',
    city: 'תל אביב',
    address: 'דיזנגוף 142, תל אביב',
    phone: '03-5551234',
    rating: 4.9,
    reviewsCount: 124,
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=200&q=80',
    description: 'מספרת גברים יוקרתית בלב תל אביב. התמחות ב-Fade מדויק, עיצוב זקן ואווירה מנצחת.',
    status: 'approved',
    tier: 'pro',
    ownerEmail: 'king@barber.co.il',
    hours: 'א-ה: 09:00 - 20:00, ו: 09:00 - 15:00',
    services: [
      { id: 's1', name: 'תספורת גבר קלאסית / Fade', price: 90, duration: '30 דק\'' },
      { id: 's2', name: 'תספורת + עיצוב זקן', price: 130, duration: '45 דק\'' }
    ],
    barbers: [
      { id: 'bar1', name: 'אבי כהן', role: 'מאסטר ברבר' },
      { id: 'bar2', name: 'דניאל לוי', role: 'מומחה Fade' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512864696010-09fc1cf0b5ca?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'b2',
    name: 'New Style Barbershop',
    city: 'חיפה',
    address: 'הנביאים 45, חיפה',
    phone: '04-5554321',
    rating: 4.7,
    reviewsCount: 45,
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1517832606293-7ae2fcff44aa?auto=format&fit=crop&w=200&q=80',
    description: 'מספרה צעירה המציעה את כל הטרנדים החדשים בעולם תספורות הגברים.',
    status: 'approved',
    tier: 'free',
    ownerEmail: 'newstyle@barber.co.il',
    hours: 'א-ה: 10:00 - 19:00',
    services: [
      { id: 's3', name: 'תספורת צעירים / סטודנט', price: 70, duration: '30 דק\'' }
    ],
    barbers: [
      { id: 'bar3', name: 'רועי חדד', role: 'ספר בכיר' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=80'
    ]
  }
];

const INITIAL_HAIRCUTS = [
  {
    id: 'h1',
    name: 'Low Fade',
    category: 'Fade',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    description: 'מעבר הדרגתי ונקי שמתחיל נמוך ליד האוזניים. מתאים מאוד לפנים עגלגלות ומרובעות.',
    maintenance: 'בינונית (ביקורת כל 2-3 שבועות)',
    instructions: 'בקש מהספר "Low Skin Fade" בצדדים ובגב, ושמור על אורך בחלק העליון עם טקסטורה.',
    popular: true,
    rating: 4.9,
    businessId: 'b1',
    barberName: 'אבי כהן'
  },
  {
    id: 'h2',
    name: 'French Crop',
    category: 'French Crop',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    description: 'שיער קצר עם פוני קצוץ קדימה וטקסטורה עשירה. מעולה למי שלא רוצה להשקיע זמן בבוקר.',
    maintenance: 'נמוכה',
    instructions: 'בקש קרופ צר קדימה עם דירוג בצדדים ומעט חומר עיצוב מט (חימר או וואקס).',
    popular: true,
    rating: 4.8,
    businessId: 'b1',
    barberName: 'דניאל לוי'
  },
  {
    id: 'h3',
    name: 'Buzz Cut',
    category: 'Buzz Cut',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    description: 'תספורת קצוצה אחידה עם מכונה. גברית, נקייה ודורשת אפס תחזוקה ביום-יום.',
    maintenance: 'נמוכה מאוד',
    instructions: 'בקש מספר 1 או 2 אחיד בכל הראש, או עם דירוג קל בצדדים (Buzz with fade).',
    popular: true,
    rating: 4.7,
    businessId: 'b2',
    barberName: 'רועי חדד'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState('customer'); // 'customer', 'business', 'admin'
  const [businesses, setBusinesses] = useState(INITIAL_BUSINESSES);
  const [subscriptionTiers, setSubscriptionTiers] = useState(INITIAL_SUBSCRIPTION_TIERS);
  const [haircuts, setHaircuts] = useState(INITIAL_HAIRCUTS);
  const [favorites, setFavorites] = useState(['h1', 'h5']);
  
  // Current logged in business owner (for business dashboard demo)
  const [currentBusinessId, setCurrentBusinessId] = useState('b2'); // starts with Free business
  
  // Appointments state
  const [appointments, setAppointments] = useState([
    {
      id: 'a1',
      businessId: 'b1',
      businessName: 'King Cut Barbershop',
      serviceName: 'תספורת גבר קלאסית / Fade',
      barberName: 'אבי כהן',
      date: '2026-06-12',
      time: '14:00',
      price: 90,
      status: 'confirmed',
      customerName: 'ישראל ישראלי'
    }
  ]);

  // Gallery state (Section 14 & 15)
  const [galleryCategory, setGalleryCategory] = useState('הכל');
  const [gallerySearch, setGallerySearch] = useState('');
  const [gallerySort, setGallerySort] = useState('popularity');
  const [lightboxCut, setLightboxCut] = useState(null);

  // Upload Photo Modal state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newPhotoForm, setNewPhotoForm] = useState({
    name: '',
    category: 'Fade',
    image: '',
    description: '',
    instructions: ''
  });

  // Onboarding Business Modal (Section 16 & 20)
  const [onboardModalOpen, setOnboardModalOpen] = useState(false);
  const [newBizForm, setNewBizForm] = useState({
    name: '',
    ownerName: '',
    phone: '',
    email: '',
    city: 'תל אביב',
    address: '',
    description: '',
    tier: 'free'
  });

  // AI Recommendation State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiAnswers, setAiAnswers] = useState({
    hairType: 'חלק',
    hairLength: 'בינוני',
    faceShape: 'עגול',
    style: 'מודרני'
  });
  const [aiResults, setAiResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Booking Flow State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBusinessForBooking, setSelectedBusinessForBooking] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    serviceId: '',
    barberId: '',
    date: '2026-06-15',
    time: '11:00',
    name: 'ישראל ישראלי',
    phone: '050-1234567'
  });

  // Search & Filter State
  const [searchCity, setSearchCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBusinessDetail, setSelectedBusinessDetail] = useState(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
      showToast('הוסר מהמועדפים / ההשראה האישית');
    } else {
      setFavorites([...favorites, id]);
      showToast('נוסף בהצלחה לגלריית ההשראה האישית שלך!');
    }
  };

  // AI Recommendation Trigger
  const handleGenerateAI = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiResults([haircuts[0], haircuts[1], haircuts[2]]);
      setActiveTab('ai-results');
      showToast('הבינה המלאכותית ניתחה את הנתונים והתאימה לך תספורות!');
    }, 1400);
  };

  // Handle Photo Upload Submit with Limit Enforcement
  const handleUploadPhotoSubmit = (e) => {
    e.preventDefault();
    const currentBiz = businesses.find(b => b.id === currentBusinessId) || businesses[0];
    const currentTierConfig = subscriptionTiers.find(t => t.id === currentBiz.tier) || subscriptionTiers[0];
    const currentBizPhotosCount = haircuts.filter(h => h.businessId === currentBiz.id).length;

    if (userRole === 'business' && currentBizPhotosCount >= currentTierConfig.photosLimit) {
      showToast(`הגעת למגבלת התמונות במסלול ${currentTierConfig.name} (${currentTierConfig.photosLimit} תמונות). שדרג מסלול להעלאת תמונות נוספות!`);
      return;
    }

    const newCut = {
      id: 'cut_' + Date.now(),
      name: newPhotoForm.name,
      category: newPhotoForm.category,
      image: newPhotoForm.image || 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
      description: newPhotoForm.description,
      instructions: newPhotoForm.instructions || 'בקש מהספר עיצוב מדויק לפי התמונה.',
      maintenance: 'בינונית',
      popular: false,
      rating: 5.0,
      businessId: currentBiz.id,
      barberName: currentBiz.barbers[0]?.name || 'ספר ראשי'
    };

    setHaircuts([newCut, ...haircuts]);
    setUploadModalOpen(false);
    showToast('התמונה הועלתה בהצלחה לגלריה!');
  };

  // Handle Onboarding Business Submit
  const handleOnboardSubmit = (e) => {
    e.preventDefault();
    const newBiz = {
      id: 'b_' + Date.now(),
      name: newBizForm.name,
      city: newBizForm.city,
      address: newBizForm.address || newBizForm.city,
      phone: newBizForm.phone,
      rating: 5.0,
      reviewsCount: 1,
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
      logo: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=200&q=80',
      description: newBizForm.description || 'מספרת גברים מקצועית.',
      status: 'approved',
      tier: newBizForm.tier,
      ownerEmail: newBizForm.email,
      hours: 'א-ה: 09:00 - 20:00',
      services: [
        { id: 's_def', name: 'תספורת גבר', price: 80, duration: '30 דק\'' }
      ],
      barbers: [
        { id: 'bar_def', name: newBizForm.ownerName || 'בעל העסק', role: 'מאסטר ברבר' }
      ],
      gallery: []
    };

    setBusinesses([newBiz, ...businesses]);
    setCurrentBusinessId(newBiz.id);
    setOnboardModalOpen(false);
    showToast('העסק נוסף בהצלחה למערכת! ברוך הבא למסלול ' + (newBizForm.tier === 'free' ? 'החינמי' : newBizForm.tier));
    setUserRole('business');
    setActiveTab('business-dashboard');
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const biz = selectedBusinessForBooking || businesses[0];
    const serv = biz.services[0];
    const barb = biz.barbers[0];

    const newAppt = {
      id: 'app_' + Date.now(),
      businessId: biz.id,
      businessName: biz.name,
      serviceName: serv.name,
      barberName: barb.name,
      date: bookingForm.date,
      time: bookingForm.time,
      price: serv.price,
      status: 'confirmed',
      customerName: bookingForm.name
    };

    setAppointments([newAppt, ...appointments]);
    setBookingModalOpen(false);
    showToast('התור נקבע בהצלחה! אישור נשלח למערכת.');
    setActiveTab('customer-area');
  };

  const upgradeBusinessTier = (bizId, newTier) => {
    setBusinesses(businesses.map(b => b.id === bizId ? { ...b, tier: newTier } : b));
    showToast(`העסק שודרג בהצלחה למסלול ${newTier.toUpperCase()}!`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans rtl selection:bg-amber-500 selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-amber-500 text-black px-6 py-3 rounded-xl shadow-2xl font-bold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-5 h-5" />
          {toastMessage}
        </div>
      )}

      {/* TOP HEADER ROLE SWITCHER */}
      <div className="bg-[#121212] border-b border-gray-800 py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-gray-400">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> BARBER MATCH ישראל
            </span>
            <span>|</span>
            <span>פלטפורמה חכמה לתספורות, גלריות וקביעת תורים</span>
          </div>

          <div className="flex items-center gap-2 bg-black/60 p-1 rounded-lg border border-gray-800">
            <span className="text-gray-400 px-2">מצב מערכת:</span>
            <button 
              onClick={() => { setUserRole('customer'); setActiveTab('home'); }} 
              className={`px-3 py-1 rounded-md transition ${userRole === 'customer' ? 'bg-amber-500 text-black font-bold' : 'text-gray-300 hover:text-white'}`}
            >
              לקוח
            </button>
            <button 
              onClick={() => { setUserRole('business'); setActiveTab('business-dashboard'); }} 
              className={`px-3 py-1 rounded-md transition ${userRole === 'business' ? 'bg-amber-500 text-black font-bold' : 'text-gray-300 hover:text-white'}`}
            >
              בעל עסק
            </button>
            <button 
              onClick={() => { setUserRole('admin'); setActiveTab('admin-dashboard'); }} 
              className={`px-3 py-1 rounded-md transition ${userRole === 'admin' ? 'bg-amber-500 text-black font-bold' : 'text-gray-300 hover:text-white'}`}
            >
              מנהל ראשי
            </button>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="sticky top-0 z-40 bg-[#171717]/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Scissors className="w-6 h-6 text-black transform rotate-90" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-wider text-white">BARBER <span className="text-amber-400">MATCH</span></span>
                <span className="block text-[10px] text-amber-500/80 tracking-widest font-medium uppercase">גלריית תספורות וקביעת תורים</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-1 font-medium text-sm">
              <button onClick={() => setActiveTab('home')} className={`px-4 py-2 rounded-lg transition ${activeTab === 'home' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-gray-300 hover:bg-gray-800'}`}>
                דף הבית
              </button>
              <button onClick={() => setActiveTab('gallery')} className={`px-4 py-2 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'gallery' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-gray-300 hover:bg-gray-800'}`}>
                <ImageIcon className="w-4 h-4 text-amber-400" />
                גלריית תספורות
              </button>
              <button onClick={() => setActiveTab('ai-quiz')} className={`px-4 py-2 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'ai-quiz' || activeTab === 'ai-results' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-gray-300 hover:bg-gray-800'}`}>
                <Sparkles className="w-4 h-4 text-amber-400" />
                התאמת AI אישית
              </button>
              <button onClick={() => setActiveTab('directory')} className={`px-4 py-2 rounded-lg transition ${activeTab === 'directory' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-gray-300 hover:bg-gray-800'}`}>
                חיפוש ברברשופים
              </button>

              {userRole === 'customer' && (
                <button onClick={() => setActiveTab('customer-area')} className={`px-4 py-2 rounded-lg transition ${activeTab === 'customer-area' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-gray-300 hover:bg-gray-800'}`}>
                  אזור אישי
                </button>
              )}

              {userRole === 'business' && (
                <button onClick={() => setActiveTab('business-dashboard')} className={`px-4 py-2 rounded-lg transition ${activeTab === 'business-dashboard' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-gray-300 hover:bg-gray-800'}`}>
                  ניהול עסק
                </button>
              )}

              {userRole === 'admin' && (
                <button onClick={() => setActiveTab('admin-dashboard')} className={`px-4 py-2 rounded-lg transition ${activeTab === 'admin-dashboard' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-gray-300 hover:bg-gray-800'}`}>
                  פאנל מנהל
                </button>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <button 
                onClick={() => setOnboardModalOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                הוסף את העסק שלך (חינם!)
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ========================================== */}
      {/* 1. HOME PAGE */}
      {/* ========================================== */}
      {activeTab === 'home' && (
        <div>
          {/* Hero Section */}
          <div className="relative bg-[#121212] py-24 px-4 overflow-hidden border-b border-gray-800">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"></div>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <span className="inline-block bg-amber-500/10 text-amber-400 border border-amber-500/30 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                ✨ גלריית תספורות מקצועית, המלצות AI וקביעת תורים
              </span>
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6">
                התספורת הבאה שלך <span className="text-amber-400 underline decoration-amber-500/30">מתחילה כאן</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                דפדף בגלריית ההשראה, מצא את הלוק האהוב עליך וקבע תור אצל הספר המוביל באזורך.
              </p>

              {/* Big AI Prompt Input */}
              <div className="bg-[#1a1a1a] p-3 rounded-2xl border border-gray-700 shadow-2xl max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
                <input 
                  type="text"
                  placeholder="תאר איזה מראה אתה מחפש... (למשל: Low fade נקי, שיער עבה, מתאים לעבודה)"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-500 focus:outline-none text-sm"
                />
                <button 
                  onClick={handleGenerateAI}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold px-8 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4" />
                  מצא לי תספורת
                </button>
              </div>

              <div className="mt-6 flex justify-center gap-6">
                <button onClick={() => setActiveTab('gallery')} className="text-amber-400 hover:underline text-sm font-medium flex items-center gap-1">
                  עבור לגלריית התספורות המלאה <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={() => setOnboardModalOpen(true)} className="text-gray-300 hover:text-white text-sm font-medium flex items-center gap-1">
                  בעל עסק? הצטרף בחינם <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Featured Grid on Home */}
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-amber-400 text-sm font-bold tracking-wider uppercase">מצא את הלוק שלך</span>
                <h2 className="text-3xl font-black text-white mt-1">גלריית השראה מובילה</h2>
              </div>
              <button onClick={() => setActiveTab('gallery')} className="text-amber-400 hover:underline font-semibold text-sm flex items-center gap-1">
                לכל הגלריה <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {haircuts.map((cut) => (
                <div key={cut.id} className="bg-[#141414] rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-500/50 transition group shadow-lg">
                  <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setLightboxCut(cut)}>
                    <img src={cut.image} alt={cut.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(cut.id); }}
                      className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md transition ${favorites.includes(cut.id) ? 'bg-amber-500 text-black' : 'bg-black/50 text-white hover:bg-black'}`}
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                    <span className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-amber-400 text-xs px-3 py-1 rounded-full border border-amber-500/30">
                      {cut.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{cut.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{cut.description}</p>
                    <div className="flex items-center gap-3 pt-2 border-t border-gray-800">
                      <button 
                        onClick={() => setLightboxCut(cut)}
                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-xl text-xs font-bold transition text-center"
                      >
                        פרטים וטיפים
                      </button>
                      <button 
                        onClick={() => { setSelectedBusinessForBooking(businesses[0]); setBookingModalOpen(true); }}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-black py-2.5 rounded-xl text-xs font-bold transition text-center"
                      >
                        קבע תור
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 14 & 15. HAIRCUT PHOTO GALLERY */}
      {/* ========================================== */}
      {activeTab === 'gallery' && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">גלריית תספורות מקצועית</span>
              <h1 className="text-3xl font-black text-white mt-1">בחר תספורת, קבל השראה וקבע תור</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setUploadModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-lg flex items-center gap-2"
              >
                <Upload className="w-4 h-4" /> העלה תמונה לגלריה
              </button>
            </div>
          </div>

          {/* Search, Filter Categories & Sorting */}
          <div className="bg-[#141414] p-6 rounded-2xl border border-gray-800 mb-10 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-500" />
                <input 
                  type="text"
                  placeholder="חפש לפי שם תספורת, סגנון או ברבר..."
                  value={gallerySearch}
                  onChange={(e) => setGallerySearch(e.target.value)}
                  className="w-full bg-black/60 border border-gray-800 rounded-xl pr-12 pl-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="w-full sm:w-48">
                <select 
                  value={gallerySort}
                  onChange={(e) => setGallerySort(e.target.value)}
                  className="w-full bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="popularity">מיון לפי פופולריות</option>
                  <option value="rating">מיון לפי דירוג</option>
                  <option value="newest">נוספו לאחרונה</option>
                </select>
              </div>
            </div>

            {/* Categories Scrollable Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {['הכל', 'Fade', 'Low Fade', 'Mid Fade', 'High Fade', 'Taper Fade', 'Buzz Cut', 'French Crop', 'שיער מתולתל', 'קלאסי'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${galleryCategory === cat ? 'bg-amber-500 text-black font-bold shadow-md' : 'bg-black/60 text-gray-300 hover:bg-gray-800 border border-gray-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {haircuts
              .filter(cut => galleryCategory === 'הכל' || cut.category === galleryCategory)
              .filter(cut => gallerySearch === '' || cut.name.toLowerCase().includes(gallerySearch.toLowerCase()) || cut.description.toLowerCase().includes(gallerySearch.toLowerCase()))
              .map((cut) => (
                <div key={cut.id} className="bg-[#141414] rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-500/50 transition group shadow-xl flex flex-col justify-between">
                  <div className="relative h-72 cursor-pointer overflow-hidden" onClick={() => setLightboxCut(cut)}>
                    <img src={cut.image} alt={cut.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(cut.id); }}
                      className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md transition ${favorites.includes(cut.id) ? 'bg-amber-500 text-black' : 'bg-black/50 text-white hover:bg-black'}`}
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                    <span className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-amber-400 text-xs px-3 py-1 rounded-full border border-amber-500/30">
                      {cut.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{cut.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{cut.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-800">
                      <span>ספר: <strong className="text-gray-200">{cut.barberName}</strong></span>
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" /> {cut.rating}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex gap-3">
                    <button 
                      onClick={() => setLightboxCut(cut)}
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl text-xs font-bold transition text-center"
                    >
                      פרטים וטיפים
                    </button>
                    <button 
                      onClick={() => { setSelectedBusinessForBooking(businesses[0]); setBookingModalOpen(true); }}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-black py-3 rounded-xl text-xs font-bold transition text-center shadow-md"
                    >
                      קבע תור
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* LIGHTBOX MODAL */}
      {/* ========================================== */}
      {lightboxCut && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141414] border border-gray-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8">
            <button 
              onClick={() => setLightboxCut(null)}
              className="absolute top-6 left-6 z-10 bg-black/60 p-2 rounded-full text-white hover:bg-black transition"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-80 md:h-full min-h-[300px]">
                <img src={lightboxCut.image} alt={lightboxCut.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold">
                    {lightboxCut.category}
                  </span>
                  <h2 className="text-2xl font-black text-white mt-3 mb-2">{lightboxCut.name}</h2>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{lightboxCut.description}</p>

                  <div className="bg-black/50 p-4 rounded-2xl border border-gray-800 space-y-2 mb-4">
                    <div className="text-xs font-bold text-amber-400">מה לבקש מהספר:</div>
                    <p className="text-gray-300 text-xs leading-relaxed">{lightboxCut.instructions}</p>
                  </div>

                  <div className="text-xs text-gray-400 space-y-1">
                    <div><strong className="text-gray-300">רמת תחזוקה:</strong> {lightboxCut.maintenance}</div>
                    <div><strong className="text-gray-300">בוצע על ידי:</strong> {lightboxCut.barberName}</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-gray-800">
                  <button 
                    onClick={() => toggleFavorite(lightboxCut.id)}
                    className={`w-full py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border ${favorites.includes(lightboxCut.id) ? 'bg-amber-500 text-black border-amber-500' : 'bg-gray-800 text-white border-gray-700'}`}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    {favorites.includes(lightboxCut.id) ? 'שמור במועדפים' : 'הוסף לגלריית ההשראה שלי'}
                  </button>

                  <button 
                    onClick={() => {
                      setLightboxCut(null);
                      setSelectedBusinessForBooking(businesses[0]);
                      setBookingModalOpen(true);
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3.5 rounded-xl text-xs transition shadow-lg text-center"
                  >
                    מצא לי ספר וקבע תור לתספורת הזו
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* UPLOAD PHOTO MODAL (WITH TIER LIMIT CHECK) */}
      {/* ========================================== */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-gray-800 p-8 rounded-3xl w-full max-w-lg shadow-2xl relative">
            <button onClick={() => setUploadModalOpen(false)} className="absolute top-6 left-6 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-black text-white mb-2">העלאת תספורת חדשה לגלריה</h2>
            <p className="text-gray-400 text-xs mb-6">שתף עבודות מקצועיות מן הברברשופ שלך.</p>

            <form onSubmit={handleUploadPhotoSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">שם התספורת:</label>
                <input 
                  type="text" 
                  required
                  placeholder="למשל: Textured Crop Fade"
                  value={newPhotoForm.name}
                  onChange={(e) => setNewPhotoForm({...newPhotoForm, name: e.target.value})}
                  className="w-full bg-black/60 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">קטגוריה:</label>
                <select 
                  value={newPhotoForm.category}
                  onChange={(e) => setNewPhotoForm({...newPhotoForm, category: e.target.value})}
                  className="w-full bg-black/60 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="Fade">Fade</option>
                  <option value="Low Fade">Low Fade</option>
                  <option value="Mid Fade">Mid Fade</option>
                  <option value="Buzz Cut">Buzz Cut</option>
                  <option value="French Crop">French Crop</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">קישור לתמונה (URL):</label>
                <input 
                  type="text" 
                  placeholder="https://images.unsplash.com/..."
                  value={newPhotoForm.image}
                  onChange={(e) => setNewPhotoForm({...newPhotoForm, image: e.target.value})}
                  className="w-full bg-black/60 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">תיאור קצר:</label>
                <textarea 
                  rows="2"
                  value={newPhotoForm.description}
                  onChange={(e) => setNewPhotoForm({...newPhotoForm, description: e.target.value})}
                  className="w-full bg-black/60 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3.5 rounded-xl text-sm shadow-xl transition">
                  העלה תמונה לגלריה
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 16 & 20. ONBOARD NEW BUSINESS MODAL (FREE TIER) */}
      {/* ========================================== */}
      {onboardModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141414] border border-gray-800 p-8 rounded-3xl w-full max-w-xl shadow-2xl relative my-8">
            <button onClick={() => setOnboardModalOpen(false)} className="absolute top-6 left-6 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-black text-white mb-2">הוסף את העסק שלך ל-BARBER MATCH</h2>
            <p className="text-gray-400 text-xs mb-6">התחל מיד במסלול <strong className="text-amber-400">החינמי לתמיד</strong> (0 ₪) ללא התחייבות וללא אשראי.</p>

            <form onSubmit={handleOnboardSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">שם הברברשופ:</label>
                  <input 
                    type="text" required
                    placeholder="למשל: Elite Cuts"
                    value={newBizForm.name}
                    onChange={(e) => setNewBizForm({...newBizForm, name: e.target.value})}
                    className="w-full bg-black/60 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">שם בעל העסק:</label>
                  <input 
                    type="text" required
                    placeholder="שם מלא"
                    value={newBizForm.ownerName}
                    onChange={(e) => setNewBizForm({...newBizForm, ownerName: e.target.value})}
                    className="w-full bg-black/60 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">מספר טלפון:</label>
                  <input 
                    type="text" required
                    placeholder="050-0000000"
                    value={newBizForm.phone}
                    onChange={(e) => setNewBizForm({...newBizForm, phone: e.target.value})}
                    className="w-full bg-black/60 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">עיר:</label>
                  <select 
                    value={newBizForm.city}
                    onChange={(e) => setNewBizForm({...newBizForm, city: e.target.value})}
                    className="w-full bg-black/60 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="תל אביב">תל אביב</option>
                    <option value="ירושלים">ירושלים</option>
                    <option value="חיפה">חיפה</option>
                    <option value="באר שבע">באר שבע</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">תיאור קצר על העסק:</label>
                <textarea 
                  rows="2"
                  value={newBizForm.description}
                  onChange={(e) => setNewBizForm({...newBizForm, description: e.target.value})}
                  className="w-full bg-black/60 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-amber-400 text-sm">מסלול רישום: חינם לתמיד (Free)</div>
                  <div className="text-gray-300 text-xs mt-0.5">כולל פרופיל עסקי, הופעה בחיפוש ועד 5 תמונות בגלריה. ללא אשראי!</div>
                </div>
                <span className="text-2xl font-black text-amber-400">0 ₪</span>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3.5 rounded-xl text-sm shadow-xl transition">
                  פתח את העסק שלי בחינם
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. AI QUIZ */}
      {/* ========================================== */}
      {activeTab === 'ai-quiz' && (
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-[#141414] border border-gray-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
            <div className="text-center mb-10">
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-semibold mb-3 inline-flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> מערכת התאמה אישית חכמה
              </span>
              <h1 className="text-3xl font-black text-white mt-2">מצא את התספורת המושלמת עבורך</h1>
            </div>

            <form onSubmit={handleGenerateAI} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">תאר במילים שלך איזה מראה אתה רוצה:</label>
                <textarea 
                  rows="3"
                  className="w-full bg-black/60 border border-gray-800 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 text-sm"
                  placeholder="למשל: מחפש מראה קצר, נקי ומסודר שמתאים לעבודה במשרד..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">סוג השיער שלך:</label>
                  <select 
                    value={aiAnswers.hairType}
                    onChange={(e) => setAiAnswers({...aiAnswers, hairType: e.target.value})}
                    className="w-full bg-black/60 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="חלק">חלק</option>
                    <option value="גלי">גלי</option>
                    <option value="מתולתל">מתולתל</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">צורת פנים:</label>
                  <select 
                    value={aiAnswers.faceShape}
                    onChange={(e) => setAiAnswers({...aiAnswers, faceShape: e.target.value})}
                    className="w-full bg-black/60 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="עגול">עגול</option>
                    <option value="מרובע">מרובע</option>
                    <option value="אובלי">אובלי / אורך</option>
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-4 rounded-xl shadow-xl transition flex items-center justify-center gap-2 text-base"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      מנתח את הנתונים...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      הצג לי תספורות מומלצות
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. AI RESULTS VIEW */}
      {/* ========================================== */}
      {activeTab === 'ai-results' && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-10">
            <div>
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">התוצאות עבורך</span>
              <h1 className="text-3xl font-black text-white mt-1">התספורות המומלצות ביותר עבורך</h1>
            </div>
            <button onClick={() => setActiveTab('ai-quiz')} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition">
              ערוך שאלון מחדש
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(aiResults || haircuts.slice(0, 3)).map((cut, idx) => (
              <div key={cut.id || idx} className="bg-[#141414] rounded-2xl overflow-hidden border border-gray-800 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="relative h-64 cursor-pointer" onClick={() => setLightboxCut(cut)}>
                    <img src={cut.image} alt={cut.name} className="w-full h-full object-cover" />
                    <span className="absolute top-4 right-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      התאמה גבוהה #{idx + 1}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{cut.name}</h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">{cut.description}</p>
                    
                    <div className="bg-black/40 p-4 rounded-xl border border-gray-800 mb-4 space-y-2">
                      <div className="text-xs text-amber-400 font-bold">מה לבקש מהספר:</div>
                      <p className="text-gray-300 text-xs leading-relaxed">{cut.instructions}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button 
                    onClick={() => { setSelectedBusinessForBooking(businesses[0]); setBookingModalOpen(true); }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
                  >
                    מצא לי ספר וקבע תור <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. DIRECTORY */}
      {/* ========================================== */}
      {activeTab === 'directory' && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl font-black text-white mb-3">חיפוש ברברשופים וספרים</h1>
            <p className="text-gray-400 text-sm">מצא את המספרה הקרובה אליך ביותר.</p>
          </div>

          <div className="bg-[#141414] p-6 rounded-2xl border border-gray-800 mb-10 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-500" />
              <input 
                type="text"
                placeholder="חפש לפי שם מספרה או כתובת..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-gray-800 rounded-xl pr-12 pl-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="w-full sm:w-64">
              <select 
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
              >
                <option value="">כל הערים בארץ</option>
                <option value="תל אביב">תל אביב</option>
                <option value="ירושלים">ירושלים</option>
                <option value="חיפה">חיפה</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businesses
              .filter(b => b.status === 'approved')
              .filter(b => searchCity === '' || b.city.includes(searchCity))
              .filter(b => searchQuery === '' || b.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((biz) => (
                <div key={biz.id} className="bg-[#141414] rounded-2xl overflow-hidden border border-gray-800 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="relative h-52">
                      <img src={biz.image} alt={biz.name} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" /> {biz.rating}
                      </div>
                      {biz.tier === 'free' && (
                        <span className="absolute top-4 right-4 bg-gray-800 text-gray-300 text-[10px] px-2.5 py-1 rounded-full">
                          מסלול חינמי
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{biz.name}</h3>
                      <p className="text-gray-400 text-sm flex items-center gap-1.5 mb-3">
                        <MapPin className="w-4 h-4 text-amber-400" /> {biz.address}
                      </p>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{biz.description}</p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex gap-3">
                    <button 
                      onClick={() => { setSelectedBusinessDetail(biz); setActiveTab('business-profile'); }}
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl text-xs font-bold transition text-center"
                    >
                      עמוד עסק
                    </button>
                    <button 
                      onClick={() => { setSelectedBusinessForBooking(biz); setBookingModalOpen(true); }}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-black py-3 rounded-xl text-xs font-bold transition text-center shadow-md"
                    >
                      קבע תור
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 5. BUSINESS PROFILE */}
      {/* ========================================== */}
      {activeTab === 'business-profile' && selectedBusinessDetail && (
        <div className="max-w-5xl mx-auto px-4 py-16">
          <button onClick={() => setActiveTab('directory')} className="text-amber-400 hover:underline text-sm font-semibold mb-6 flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" /> חזרה לחיפוש הברברשופים
          </button>

          <div className="bg-[#141414] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl mb-10">
            <div className="relative h-80">
              <img src={selectedBusinessDetail.image} alt={selectedBusinessDetail.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-6 right-6 flex items-end gap-4">
                <img src={selectedBusinessDetail.logo} alt="logo" className="w-20 h-20 rounded-2xl border-2 border-amber-500 object-cover bg-black" />
                <div>
                  <h1 className="text-3xl font-black text-white">{selectedBusinessDetail.name}</h1>
                  <p className="text-gray-300 text-sm flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4 text-amber-400" /> {selectedBusinessDetail.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-bold text-white">אודות העסק</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{selectedBusinessDetail.description}</p>
                </div>

                <div className="bg-black/60 p-6 rounded-2xl border border-gray-800 md:w-80 space-y-4">
                  <h4 className="font-bold text-white text-sm">שעות פעילות</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{selectedBusinessDetail.hours}</p>
                  <button 
                    onClick={() => { setSelectedBusinessForBooking(selectedBusinessDetail); setBookingModalOpen(true); }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3.5 rounded-xl text-sm shadow-lg transition"
                  >
                    קבע תור עכשיו
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 6 & 17 & 20. BUSINESS OWNER DASHBOARD (WITH UPGRADE & FREE TIER) */}
      {/* ========================================== */}
      {activeTab === 'business-dashboard' && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          {(() => {
            const currentBiz = businesses.find(b => b.id === currentBusinessId) || businesses[0];
            const currentTierConfig = subscriptionTiers.find(t => t.id === currentBiz.tier) || subscriptionTiers[0];
            const bizPhotosCount = haircuts.filter(h => h.businessId === currentBiz.id).length;

            return (
              <div className="space-y-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">פאנל ניהול עסק - {currentBiz.name}</span>
                    <h1 className="text-3xl font-black text-white mt-1">ניהול הברברשופ שלך ומסלול מנוי</h1>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-xl text-xs font-bold border ${currentBiz.tier === 'free' ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                      מסלול נוכחי: {currentTierConfig.name} ({currentTierConfig.price} ₪/חודש)
                    </span>
                    <button 
                      onClick={() => setUploadModalOpen(true)}
                      className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-lg flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" /> העלה תמונה ({bizPhotosCount}/{currentTierConfig.photosLimit})
                    </button>
                  </div>
                </div>

                {/* Subscription Tier Upgrade & Comparison Section */}
                <div className="bg-[#141414] p-8 rounded-3xl border border-gray-800 shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-2">ניהול ושדרוג מסלול עסק</h3>
                  <p className="text-gray-400 text-xs mb-6">המסלול החינמי מאפשר ניהול בסיסי לתמיד. רוצה יותר חשיפה ותמונות? שדרג מתי שתרצה.</p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {subscriptionTiers.map((tier) => (
                      <div key={tier.id} className={`p-6 rounded-2xl border transition flex flex-col justify-between ${currentBiz.tier === tier.id ? 'bg-amber-500/10 border-amber-500' : 'bg-black/40 border-gray-800'}`}>
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-white text-base">{tier.name}</h4>
                            <span className="text-amber-400 font-black text-lg">{tier.price} ₪</span>
                          </div>
                          <ul className="text-xs text-gray-300 space-y-2 mb-6">
                            <li>✅ עד {tier.photosLimit} תמונות בגלריה</li>
                            <li>✅ עד {tier.staffLimit} ספרים בעסק</li>
                            <li>{tier.analytics ? '✅ סטטיסטיקות מתקדמות' : '❌ ללא סטטיסטיקות'}</li>
                          </ul>
                        </div>

                        {currentBiz.tier === tier.id ? (
                          <div className="w-full bg-amber-500 text-black font-bold py-2.5 rounded-xl text-xs text-center">
                            המסלול הנוכחי שלך
                          </div>
                        ) : (
                          <button 
                            onClick={() => upgradeBusinessTier(currentBiz.id, tier.id)}
                            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2.5 rounded-xl text-xs transition text-center"
                          >
                            {tier.price === 0 ? 'מעבר למסלול חינמי' : `שדרג למסלול ${tier.name}`}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="bg-[#141414] p-6 rounded-2xl border border-gray-800 space-y-6">
                    <h3 className="font-bold text-white text-lg">סיכום פעילות</h3>
                    <div className="space-y-4">
                      <div className="bg-black/50 p-4 rounded-xl border border-gray-800 flex justify-between items-center">
                        <span className="text-gray-400 text-sm">תורים היום</span>
                        <span className="text-amber-400 font-black text-xl">3</span>
                      </div>
                      <div className="bg-black/50 p-4 rounded-xl border border-gray-800 flex justify-between items-center">
                        <span className="text-gray-400 text-sm">תמונות בגלריה</span>
                        <span className="text-amber-400 font-black text-xl">{bizPhotosCount} / {currentTierConfig.photosLimit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-[#141414] p-6 rounded-2xl border border-gray-800 space-y-6">
                    <h3 className="font-bold text-white text-lg">תורים שהתקבלו</h3>
                    <div className="space-y-4">
                      {appointments.filter(a => a.businessId === currentBiz.id).map(appt => (
                        <div key={appt.id} className="bg-black/50 border border-gray-800 p-4 rounded-xl flex justify-between items-center">
                          <div>
                            <div className="font-bold text-white text-sm">{appt.customerName} - {appt.serviceName}</div>
                            <div className="text-xs text-gray-400 mt-1">{appt.date} בשעה {appt.time} (ספר: {appt.barberName})</div>
                          </div>
                          <span className="text-amber-400 font-bold text-sm">₪{appt.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================== */}
      {/* 7. ADMIN DASHBOARD */}
      {/* ========================================== */}
      {activeTab === 'admin-dashboard' && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-10">
            <div>
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">פאנל מנהל ראשי (Admin)</span>
              <h1 className="text-3xl font-black text-white mt-1">ניהול פלטפורמת BARBER MATCH ומסלולים</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-[#141414] p-6 rounded-2xl border border-gray-800">
              <div className="text-gray-400 text-xs font-semibold mb-1">סך הכל עסקים</div>
              <div className="text-3xl font-black text-white">{businesses.length}</div>
            </div>
            <div className="bg-[#141414] p-6 rounded-2xl border border-gray-800">
              <div className="text-gray-400 text-xs font-semibold mb-1">מסלול חינמי פעיל</div>
              <div className="text-3xl font-black text-amber-400">{businesses.filter(b => b.tier === 'free').length} עסקים</div>
            </div>
            <div className="bg-[#141414] p-6 rounded-2xl border border-gray-800">
              <div className="text-gray-400 text-xs font-semibold mb-1">תורים במערכת</div>
              <div className="text-3xl font-black text-white">{appointments.length}</div>
            </div>
          </div>

          <div className="bg-[#141414] p-8 rounded-3xl border border-gray-800 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">ניהול עסקים רשומים במערכת</h3>
            <div className="space-y-4">
              {businesses.map(biz => (
                <div key={biz.id} className="bg-black/50 border border-gray-800 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <h4 className="font-bold text-white text-base">{biz.name} ({biz.city})</h4>
                    <p className="text-gray-400 text-xs mt-1">בעלים: {biz.ownerEmail} | מסלול: <span className="text-amber-400 font-bold uppercase">{biz.tier}</span></p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select 
                      value={biz.tier}
                      onChange={(e) => {
                        const newT = e.target.value;
                        setBusinesses(businesses.map(b => b.id === biz.id ? {...b, tier: newT} : b));
                        showToast(`עודכן מסלול לעסק ${biz.name}`);
                      }}
                      className="bg-black border border-gray-700 rounded-xl px-3 py-2 text-white text-xs"
                    >
                      <option value="free">חינם (Free)</option>
                      <option value="basic">בסיסי (Basic)</option>
                      <option value="pro">מקצועי (Pro)</option>
                      <option value="premium">פרימיום (Premium)</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 8. CUSTOMER PERSONAL AREA */}
      {/* ========================================== */}
      {activeTab === 'customer-area' && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="mb-10">
            <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">אזור אישי ללקוח</span>
            <h1 className="text-3xl font-black text-white mt-1">התורים והמועדפים שלך</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#141414] p-6 rounded-2xl border border-gray-800 space-y-6">
              <h3 className="font-bold text-white text-lg">התורים הקרובים שלי</h3>
              <div className="space-y-4">
                {appointments.map(appt => (
                  <div key={appt.id} className="bg-black/50 border border-gray-800 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white text-sm">{appt.businessName}</div>
                      <div className="text-xs text-gray-400 mt-1">{appt.serviceName} | {appt.date} בשעה {appt.time}</div>
                    </div>
                    <button 
                      onClick={() => {
                        setAppointments(appointments.filter(a => a.id !== appt.id));
                        showToast('התור בוטל בהצלחה');
                      }}
                      className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                    >
                      ביטול תור
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#141414] p-6 rounded-2xl border border-gray-800 space-y-6">
              <h3 className="font-bold text-white text-lg">גלריית ההשראה השמורה שלי ({favorites.length})</h3>
              <div className="grid grid-cols-2 gap-4">
                {haircuts.filter(h => favorites.includes(h.id)).map(cut => (
                  <div key={cut.id} className="relative h-40 rounded-xl overflow-hidden border border-gray-800">
                    <img src={cut.image} alt={cut.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex items-end p-3">
                      <span className="text-white font-bold text-xs">{cut.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* BOOKING MODAL */}
      {/* ========================================== */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-gray-800 p-8 rounded-3xl w-full max-w-md shadow-2xl relative">
            <button onClick={() => setBookingModalOpen(false)} className="absolute top-6 left-6 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-black text-white mb-2">קביעת תור מהירה</h2>
            <p className="text-gray-400 text-xs mb-6">בחר תאריך, שעה וקבע תור אצל הספר.</p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">בחר תאריך:</label>
                <input 
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                  className="w-full bg-black/60 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">שעה פנויה:</label>
                <select 
                  value={bookingForm.time}
                  onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                  className="w-full bg-black/60 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="10:00">10:00</option>
                  <option value="11:30">11:30</option>
                  <option value="13:00">13:00</option>
                  <option value="15:30">15:30</option>
                  <option value="18:00">18:00</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">שם מלא:</label>
                <input 
                  type="text" required
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  className="w-full bg-black/60 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3.5 rounded-xl text-sm shadow-xl transition">
                  אישור וקביעת תור
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}