import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Header
    searchPlaceholder: 'Search for anything',
    login: 'Log In',
    signup: 'Sign Up',
    dashboard: 'Dashboard',
    profile: 'My Profile',
    logout: 'Log Out',
    
    // Home
    heroTitle: 'Rent Anything, Anytime',
    heroSubtitle: 'Discover thousands of items to rent from people in your community.',
    recentlyAdded: 'Recently Added',
    perDay: 'per day',
    
    // Dashboard
    myDashboard: 'My Dashboard',
    addNewItem: 'Add New Item',
    myRentals: 'My Rentals',
    myItems: 'My Items',
    pending: 'Pending',
    confirmed: 'Confirmed',
    completed: 'Completed',
    canceled: 'Canceled',
    active: 'Active',
    bookings: 'bookings',
    
    // Profile
    myProfile: 'My Profile',
    manageAccount: 'Manage your account settings and preferences',
    profileInfo: 'Profile Info',
    security: 'Security',
    edit: 'Edit',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    fullName: 'Full Name',
    email: 'Email',
    phoneNumber: 'Phone Number',
    dateOfBirth: 'Date of Birth',
    city: 'City',
    address: 'Address',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    updatePassword: 'Update Password',
    
    // Login
    welcomeBack: 'Welcome Back',
    forgotPassword: 'Forgot Password?',
    or: 'or',
    continueWithGoogle: 'Continue with Google',
    dontHaveAccount: "Don't have an account?",
    createAccount: 'Create an Account',
    
    // SignUp
    createYourAccount: 'Create Your Account',
    joinMessage: 'Join DZ-RentIt and start renting today',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    iAgree: 'I agree to the',
    termsOfService: 'Terms of Service',
    and: 'and',
    privacyPolicy: 'Privacy Policy',
    alreadyHaveAccount: 'Already have an account?',
    passwordsDontMatch: 'Passwords do not match',
    accountCreated: 'Account created successfully!',
    selectCity: 'Select your city',
    
    // Publish
    listYourItem: 'List Your Item for Rent',
    itemDetails: 'Item Details',
    title: 'Title',
    whatAreYouRenting: 'What are you renting?',
    description: 'Description',
    describeYourItem: 'Describe your item, its condition, and what\'s included...',
    category: 'Category',
    selectCategory: 'Select a category',
    electronics: 'Electronics',
    photography: 'Photography',
    gaming: 'Gaming',
    sports: 'Sports',
    music: 'Music',
    tools: 'Tools',
    vehicles: 'Vehicles',
    other: 'Other',
    pricing: 'Pricing',
    dailyRate: 'Daily Rate (DZD)',
    location: 'Location',
    
    // Cities
    algiers: 'Algiers',
    oran: 'Oran',
    constantine: 'Constantine',
    annaba: 'Annaba',
    blida: 'Blida',
    batna: 'Batna',
    setif: 'Setif',
    sidibelabbes: 'Sidi Bel Abbès',
    biskra: 'Biskra',
    tebessa: 'Tébessa',
    tlemcen: 'Tlemcen',
    bejaia: 'Béjaïa',
    tiaret: 'Tiaret',
    bordjbouarreridj: 'Bordj Bou Arreridj',
    djelfa: 'Djelfa',
    mostaganem: 'Mostaganem'
  },
  ar: {
    // Header
    searchPlaceholder: 'ابحث عن أي شيء',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    dashboard: 'لوحة التحكم',
    profile: 'ملفي الشخصي',
    logout: 'تسجيل الخروج',
    
    // Home
    heroTitle: 'استأجر أي شيء، في أي وقت',
    heroSubtitle: 'اكتشف آلاف العناصر المتاحة للإيجار من الأشخاص في مجتمعك.',
    recentlyAdded: 'المضافة حديثاً',
    perDay: 'في اليوم',
    
    // Dashboard
    myDashboard: 'لوحة التحكم الخاصة بي',
    addNewItem: 'إضافة عنصر جديد',
    myRentals: 'إيجاراتي',
    myItems: 'عناصري',
    pending: 'قيد الانتظار',
    confirmed: 'مؤكد',
    completed: 'مكتمل',
    canceled: 'ملغى',
    active: 'نشط',
    bookings: 'حجوزات',
    
    // Profile
    myProfile: 'ملفي الشخصي',
    manageAccount: 'إدارة إعدادات حسابك وتفضيلاتك',
    profileInfo: 'معلومات الملف الشخصي',
    security: 'الأمان',
    edit: 'تعديل',
    saveChanges: 'حفظ التغييرات',
    cancel: 'إلغاء',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phoneNumber: 'رقم الهاتف',
    dateOfBirth: 'تاريخ الميلاد',
    city: 'المدينة',
    address: 'العنوان',
    changePassword: 'تغيير كلمة المرور',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    confirmNewPassword: 'تأكيد كلمة المرور الجديدة',
    updatePassword: 'تحديث كلمة المرور',
    
    // Login
    welcomeBack: 'مرحباً بعودتك',
    forgotPassword: 'نسيت كلمة المرور؟',
    or: 'أو',
    continueWithGoogle: 'متابعة مع جوجل',
    dontHaveAccount: 'ليس لديك حساب؟',
    createAccount: 'إنشاء حساب',
    
    // SignUp
    createYourAccount: 'إنشاء حسابك',
    joinMessage: 'انضم إلى DZ-RentIt وابدأ التأجير اليوم',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    iAgree: 'أوافق على',
    termsOfService: 'شروط الخدمة',
    and: 'و',
    privacyPolicy: 'سياسة الخصوصية',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    passwordsDontMatch: 'كلمات المرور غير متطابقة',
    accountCreated: 'تم إنشاء الحساب بنجاح!',
    selectCity: 'اختر مدينتك',
    
    // Publish
    listYourItem: 'أدرج عنصرك للإيجار',
    itemDetails: 'تفاصيل العنصر',
    title: 'العنوان',
    whatAreYouRenting: 'ماذا تؤجر؟',
    description: 'الوصف',
    describeYourItem: 'صف عنصرك، حالته، وما هو مشمول...',
    category: 'الفئة',
    selectCategory: 'اختر الفئة',
    electronics: 'إلكترونيات',
    photography: 'تصوير',
    gaming: 'ألعاب',
    sports: 'رياضة',
    music: 'موسيقى',
    tools: 'أدوات',
    vehicles: 'مركبات',
    other: 'أخرى',
    pricing: 'التسعير',
    dailyRate: 'السعر اليومي (دج)',
    location: 'الموقع',
    
    // Cities
    algiers: 'الجزائر',
    oran: 'وهران',
    constantine: 'قسنطينة',
    annaba: 'عنابة',
    blida: 'البليدة',
    batna: 'باتنة',
    setif: 'سطيف',
    sidibelabbes: 'سيدي بلعباس',
    biskra: 'بسكرة',
    tebessa: 'تبسة',
    tlemcen: 'تلمسان',
    bejaia: 'بجاية',
    tiaret: 'تيارت',
    bordjbouarreridj: 'برج بوعريريج',
    djelfa: 'الجلفة',
    mostaganem: 'مستغانم'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Check if language is stored in localStorage
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
      setIsRTL(storedLanguage === 'ar');
      document.documentElement.dir = storedLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = storedLanguage;
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    setIsRTL(newLanguage === 'ar');
    localStorage.setItem('language', newLanguage);
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    isRTL,
    toggleLanguage,
    t
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
