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
    home: 'Home',
    categories: 'Categories',
    contactUs: 'Contact Us',
    
    // Home
    heroTitle: 'Rent Anything, Anytime',
    heroSubtitle: 'Discover thousands of items to rent from people in your community.',
    recentlyAdded: 'Recently Added',
    browseByCategory: 'Browse by Category',
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
    mostaganem: 'Mostaganem',
    
    // Footer
    aboutUs: 'About Us',
    aboutDescription: 'DZ-RentIt is Algeria\'s premier peer-to-peer rental platform, connecting people who need items with those who have them.',
    quickLinks: 'Quick Links',
    howItWorks: 'How It Works',
    termsConditions: 'Terms & Conditions',
    support: 'Support',
    faq: 'FAQ',
    helpCenter: 'Help Center',
    contactSupport: 'Contact Support',
    followUs: 'Follow Us',
    allRightsReserved: 'All rights reserved.',
    madeWithLove: 'Made with ❤️ in Algeria',
    
    // Payments
    payments: 'Payments',
    manageTransactions: 'Manage your transactions and payment history',
    backToDashboard: 'Back to Dashboard',
    received: 'Received',
    sent: 'Sent',
    totalEarnings: 'Total earnings',
    totalSpent: 'Total spent',
    awaitingProcessing: 'Awaiting processing',
    allTransactions: 'All Transactions',
    paymentMethods: 'Payment Methods',
    noTransactionsFound: 'No transactions found',
    transactionHistory: 'Your payment history will appear here',
    paymentFrom: 'Payment from',
    paymentTo: 'Payment to',
    pendingFrom: 'Pending from',
    viewReceipt: 'View Receipt',
    transactionId: 'Transaction ID',
    
    // Messages
    messages: 'Messages',
    search: 'Search',
    searchConversations: 'Search conversations...',
    typeMessage: 'Type a message...',
    noConversationsYet: 'No conversations yet',
    startChatting: 'Start chatting with item owners or renters',
    selectConversation: 'Select a conversation',
    chooseConversation: 'Choose a conversation from the list to start chatting',
    
    // Dashboard
    notifications: 'Notifications',
    items: 'Items',
    rentals: 'Rentals',
    markAllAsRead: 'Mark all as read',
    noNotifications: 'No notifications',
    allCaughtUp: 'You are all caught up!',
    quickAccess: 'Quick Access',
    viewRentalsItems: 'View your rentals & items',
    chatWithUsers: 'Chat with owners & renters',
    publishItem: 'Publish Item',
    listNewRental: 'List a new rental item',
    settings: 'Settings',
    accountPreferences: 'Account & preferences',
    
    // Item Detail
    availability: 'Availability',
    available: 'Available',
    unavailable: 'Unavailable',
    owner: 'Owner',
    rentNow: 'Rent Now',
    sendMessage: 'Send Message',
    reviews: 'Reviews',
    noReviewsYet: 'No reviews yet',
    firstToReview: 'Be the first to review this item',
    similarItems: 'Similar Items',
    
    // Public Profile
    itemsListed: 'Items Listed',
    rating: 'Rating',
    memberSince: 'Member Since',
    viewAllItems: 'View All Items',
    ownerReviews: 'Owner Reviews',
    writeReview: 'Write a Review',
    yourReview: 'Your Review',
    submitReview: 'Submit Review',
    helpful: 'Helpful',
    professional: 'Professional',
    responsive: 'Responsive'
  },
  ar: {
    // Header
    searchPlaceholder: 'ابحث عن أي شيء',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    dashboard: 'لوحة التحكم',
    profile: 'ملفي الشخصي',
    logout: 'تسجيل الخروج',
    home: 'الرئيسية',
    categories: 'الفئات',
    contactUs: 'اتصل بنا',
    
    // Home
    heroTitle: 'استأجر أي شيء، في أي وقت',
    heroSubtitle: 'اكتشف آلاف العناصر المتاحة للإيجار من الأشخاص في مجتمعك.',
    recentlyAdded: 'المضافة حديثاً',
    browseByCategory: 'تصفح حسب الفئة',
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
    mostaganem: 'مستغانم',
    
    // Footer
    aboutUs: 'من نحن',
    aboutDescription: 'DZ-RentIt هي منصة التأجير الرائدة في الجزائر، تربط الأشخاص الذين يحتاجون إلى عناصر مع أولئك الذين لديهم.',
    quickLinks: 'روابط سريعة',
    howItWorks: 'كيف يعمل',
    termsConditions: 'الشروط والأحكام',
    support: 'الدعم',
    faq: 'الأسئلة الشائعة',
    helpCenter: 'مركز المساعدة',
    contactSupport: 'اتصل بالدعم',
    followUs: 'تابعنا',
    allRightsReserved: 'جميع الحقوق محفوظة.',
    madeWithLove: 'صنع بـ ❤️ في الجزائر',
    
    // Payments
    payments: 'المدفوعات',
    manageTransactions: 'إدارة معاملاتك وسجل الدفع',
    backToDashboard: 'العودة إلى لوحة التحكم',
    received: 'مستلم',
    sent: 'مرسل',
    totalEarnings: 'إجمالي الأرباح',
    totalSpent: 'إجمالي المصروفات',
    awaitingProcessing: 'في انتظار المعالجة',
    allTransactions: 'جميع المعاملات',
    paymentMethods: 'طرق الدفع',
    noTransactionsFound: 'لم يتم العثور على معاملات',
    transactionHistory: 'سيظهر سجل الدفع الخاص بك هنا',
    paymentFrom: 'دفعة من',
    paymentTo: 'دفعة إلى',
    pendingFrom: 'معلق من',
    viewReceipt: 'عرض الإيصال',
    transactionId: 'رقم المعاملة',
    
    // Messages
    messages: 'الرسائل',
    search: 'بحث',
    searchConversations: 'البحث في المحادثات...',
    typeMessage: 'اكتب رسالة...',
    noConversationsYet: 'لا توجد محادثات بعد',
    startChatting: 'ابدأ الدردشة مع أصحاب العناصر أو المستأجرين',
    selectConversation: 'اختر محادثة',
    chooseConversation: 'اختر محادثة من القائمة لبدء الدردشة',
    
    // Dashboard
    notifications: 'الإشعارات',
    items: 'العناصر',
    rentals: 'الإيجارات',
    markAllAsRead: 'وضع علامة مقروء على الكل',
    noNotifications: 'لا توجد إشعارات',
    allCaughtUp: 'أنت على اطلاع بكل شيء!',
    quickAccess: 'وصول سريع',
    viewRentalsItems: 'عرض إيجاراتك وعناصرك',
    chatWithUsers: 'الدردشة مع الملاك والمستأجرين',
    publishItem: 'نشر عنصر',
    listNewRental: 'إدراج عنصر إيجار جديد',
    settings: 'الإعدادات',
    accountPreferences: 'الحساب والتفضيلات',
    
    // Item Detail
    availability: 'التوفر',
    available: 'متاح',
    unavailable: 'غير متاح',
    owner: 'المالك',
    rentNow: 'استأجر الآن',
    sendMessage: 'إرسال رسالة',
    reviews: 'التقييمات',
    noReviewsYet: 'لا توجد تقييمات بعد',
    firstToReview: 'كن أول من يقيم هذا العنصر',
    similarItems: 'عناصر مشابهة',
    
    // Public Profile
    itemsListed: 'العناصر المدرجة',
    rating: 'التقييم',
    memberSince: 'عضو منذ',
    viewAllItems: 'عرض جميع العناصر',
    ownerReviews: 'تقييمات المالك',
    writeReview: 'كتابة تقييم',
    yourReview: 'تقييمك',
    submitReview: 'إرسال التقييم',
    helpful: 'متعاون',
    professional: 'محترف',
    responsive: 'سريع الاستجابة'
  },
  kab: {
    // Header - Amazigh Latin
    searchPlaceholder: 'Nadi ɣef wayen tebɣiḍ',
    login: 'Kcem',
    signup: 'Jerred',
    dashboard: 'Tafelwit n usenqed',
    profile: 'Amaɣnu-inu',
    logout: 'Ffeɣ',
    home: 'Agejdan',
    categories: 'Taggayin',
    contactUs: 'Nermes-aɣ',
    
    // Home
    heroTitle: 'Ssuɣer kra, melmi tebɣiḍ',
    heroSubtitle: 'Af-d akk n teɣawsiwin i yezmer ad tessuɣreḍ seg yimdanen n temɣiwent-inek.',
    recentlyAdded: 'Yernin melmi kan',
    browseByCategory: 'Snirem s taggayin',
    perDay: 's wass',
    
    // Dashboard
    myDashboard: 'Tafelwit-inu n usenqed',
    addNewItem: 'Rnu afaris amaynu',
    myRentals: 'Isuɣra-inu',
    myItems: 'Tiɣawsiwin-inu',
    pending: 'Yettrajju',
    confirmed: 'Yettwasentem',
    completed: 'Yekfa',
    canceled: 'Yettwasefsex',
    active: 'Yermid',
    bookings: 'isiɣren',
    
    // Profile
    myProfile: 'Amaɣnu-inu',
    manageAccount: 'Sefrek iɣewwaṛen n umiḍan-ik d usmenyif',
    profileInfo: 'Talɣut n umaɣnu',
    security: 'Taɣellist',
    edit: 'Ẓreg',
    saveChanges: 'Ḥrez ibeddilen',
    cancel: 'Sefsex',
    fullName: 'Isem ummid',
    email: 'Imayl',
    phoneNumber: 'Uṭṭun n tiliɣri',
    dateOfBirth: 'Azemz n tlalit',
    city: 'Tamdint',
    address: 'Tansa',
    changePassword: 'Beddel awal uffir',
    currentPassword: 'Awal uffir n tura',
    newPassword: 'Awal uffir amaynu',
    confirmNewPassword: 'Sentem awal uffir amaynu',
    updatePassword: 'Leqqem awal uffir',
    
    // Login
    welcomeBack: 'Ansuf yis-k i tuɣalin',
    forgotPassword: 'Tettuḍ awal uffir?',
    or: 'neɣ',
    continueWithGoogle: 'Kemmel s Google',
    dontHaveAccount: 'Ur tesɛiḍ ara amiḍan?',
    createAccount: 'Rnu amiḍan',
    
    // SignUp
    createYourAccount: 'Rnu amiḍan-ik',
    joinMessage: 'Ddu ɣer DZ-RentIt u bdu ad tessuɣreḍ ass-a',
    password: 'Awal uffir',
    confirmPassword: 'Sentem awal uffir',
    iAgree: 'Qebleɣ',
    termsOfService: 'Tiwtilin n umeẓlu',
    and: 'd',
    privacyPolicy: 'Tasertit n tbaḍnit',
    alreadyHaveAccount: 'Tesɛiḍ yakan amiḍan?',
    passwordsDontMatch: 'Awalen uffiren ur mṣadan ara',
    accountCreated: 'Amiḍan yettwarna!',
    selectCity: 'Fren tamdint-ik',
    
    // Publish
    listYourItem: 'Bḍu afaris-ik i usuɣur',
    itemDetails: 'Talɣut n ufaris',
    title: 'Azwel',
    whatAreYouRenting: 'D acu i tessuɣreḍ?',
    description: 'Aglam',
    describeYourItem: 'Glem afaris-ik, addad-is, d wayen yellan deg-s...',
    category: 'Taggayt',
    selectCategory: 'Fren taggayt',
    electronics: 'Tiliksas',
    photography: 'Tasukkent',
    gaming: 'Uraren',
    sports: 'Addal',
    music: 'Aẓawan',
    tools: 'Ifecka',
    vehicles: 'Tkerrusin',
    other: 'Nniḍen',
    pricing: 'Ssuma',
    dailyRate: 'Ssuma n wass (DZD)',
    location: 'Adig',
    
    // Cities
    algiers: 'Lezzayer',
    oran: 'Wehran',
    constantine: 'Qsentina',
    annaba: 'Ɛennaba',
    blida: 'Leblida',
    batna: 'Tbatent',
    setif: 'Sṭif',
    sidibelabbes: 'Sidi Bel-Ɛebbes',
    biskra: 'Biskra',
    tebessa: 'Tbessa',
    tlemcen: 'Tlemsen',
    bejaia: 'Bgayet',
    tiaret: 'Tiaret',
    bordjbouarreridj: 'Bordj Bu-Ɛerridj',
    djelfa: 'Jelfa',
    mostaganem: 'Mustaghanem',
    
    // Footer
    aboutUs: 'Ɣef-nneɣ',
    aboutDescription: 'DZ-RentIt d talɣubliṭ tameqqrant n usuɣur deg Lezzayer, tessedukul imdanen yellan ɣur-sen tiɣawsiwin akked wid yebɣan ad tent-sssuɣren.',
    quickLinks: 'Iseɣwan uraren',
    howItWorks: 'Amek iteddu',
    termsConditions: 'Tiwtilin d tnaffutin',
    support: 'Tallalt',
    faq: 'Isteqsiyen',
    helpCenter: 'Ammas n tallalt',
    contactSupport: 'Nermes tallalt',
    followUs: 'Ḍfer-aɣ',
    allRightsReserved: 'Izerfan meṛṛa ttwḥerzen.',
    madeWithLove: 'Yettwag s ❤️ deg Lezzayer',
    
    // Payments
    payments: 'Lexlaṣat',
    manageTransactions: 'Sefrek tinawayin-ik d umezruy n lexlaṣ',
    backToDashboard: 'Uɣal ɣer tfelwit n usenqed',
    received: 'Yettwarem',
    sent: 'Yettwazen',
    totalEarnings: 'Asmekti n tqaɛin',
    totalSpent: 'Asmekti n usaraf',
    awaitingProcessing: 'Yettrajju asesfer',
    allTransactions: 'Akk tinawayin',
    paymentMethods: 'Tarrayin n lexlaṣ',
    noTransactionsFound: 'Ulac tinawayin',
    transactionHistory: 'Amezruy n lexlaṣat-ik ad d-iban dagi',
    paymentFrom: 'Lexlaṣ seg',
    paymentTo: 'Lexlaṣ ɣer',
    pendingFrom: 'Yettrajju seg',
    viewReceipt: 'Wali afecku',
    transactionId: 'Uṭṭun n tnawayt',
    
    // Messages
    messages: 'Iznan',
    search: 'Nadi',
    searchConversations: 'Nadi deg idiwenniyen...',
    typeMessage: 'Aru izen...',
    noConversationsYet: 'Ulac idiwenniyen ar tura',
    startChatting: 'Bdu adiwenni akked yimawlan n teɣawsiwin neɣ iseɣren',
    selectConversation: 'Fren adiwenni',
    chooseConversation: 'Fren adiwenni seg tebdart i wakken ad tebduḍ',
    
    // Dashboard
    notifications: 'Ilɣa',
    items: 'Tiɣawsiwin',
    rentals: 'Isuɣra',
    markAllAsRead: 'Creḍ meṛṛa d iɣran',
    noNotifications: 'Ulac ilɣa',
    allCaughtUp: 'Teẓriḍ kullec!',
    quickAccess: 'Anekcum arurad',
    viewRentalsItems: 'Wali isuɣra-k d teɣawsiwin-ik',
    chatWithUsers: 'Mmeslay akked yimawlan d iseɣren',
    publishItem: 'Bḍu afaris',
    listNewRental: 'Bḍu afaris amaynu n usuɣur',
    settings: 'Iɣewwaṛen',
    accountPreferences: 'Amiḍan d usmenyif',
    
    // Item Detail
    availability: 'Tiwizi',
    available: 'Yellan',
    unavailable: 'Ulac-it',
    owner: 'Bab',
    rentNow: 'Ssuɣer tura',
    sendMessage: 'Azen izen',
    reviews: 'Tikturin',
    noReviewsYet: 'Ulac tikturin ar tura',
    firstToReview: 'Ili d amezwaru ara d-yefken tikti',
    similarItems: 'Tiɣawsiwin icudden',
    
    // Public Profile
    itemsListed: 'Tiɣawsiwin yettwabḍan',
    rating: 'Takturt',
    memberSince: 'Aɛeggal seg',
    viewAllItems: 'Wali akk tiɣawsiwin',
    ownerReviews: 'Tikturin n umawlan',
    writeReview: 'Aru takturt',
    yourReview: 'Takturt-ik',
    submitReview: 'Azen takturt',
    helpful: 'Yettɛiwen',
    professional: 'Asnawan',
    responsive: 'Yettɛawan s tɛeggelt'
  },
  kab_tfng: {
    // Header - Amazigh Tifinagh
    searchPlaceholder: 'ⵏⴰⴷⵉ ⵖⴼ ⵡⴰⵢⴻⵏ ⵜⴻⴱⵖⵉⴹ',
    login: 'ⴽⵛⴻⵎ',
    signup: 'ⵊⴻⵔⵔⴻⴷ',
    dashboard: 'ⵜⴰⴼⴻⵍⵡⵉⵜ ⵏ ⵓⵙⴻⵏⵇⴻⴷ',
    profile: 'ⴰⵎⴰⵖⵏⵓ-ⵉⵏⵓ',
    logout: 'ⴼⴼⴻⵖ',
    home: 'ⴰⴳⴻⵊⴷⴰⵏ',
    categories: 'ⵜⴰⴳⴳⴰⵢⵉⵏ',
    contactUs: 'ⵏⴻⵔⵎⴻⵙ-ⴰⵖ',
    
    // Home
    heroTitle: 'ⵙⵙⵓⵖⴻⵔ ⴽⵔⴰ, ⵎⴻⵍⵎⵉ ⵜⴻⴱⵖⵉⴹ',
    heroSubtitle: 'ⴰⴼ-ⴷ ⴰⴽⴽ ⵏ ⵜⴻⵖⴰⵡⵙⵉⵡⵉⵏ ⵉ ⵢⴻⵣⵎⴻⵔ ⴰⴷ ⵜⴻⵙⵙⵓⵖⵔⴻⴹ ⵙⴻⴳ ⵢⵉⵎⴷⴰⵏⴻⵏ ⵏ ⵜⴻⵎⵖⵉⵡⴻⵏⵜ-ⵉⵏⴻⴽ.',
    recentlyAdded: 'ⵢⴻⵔⵏⵉⵏ ⵎⴻⵍⵎⵉ ⴽⴰⵏ',
    browseByCategory: 'ⵙⵏⵉⵔⴻⵎ ⵙ ⵜⴰⴳⴳⴰⵢⵉⵏ',
    perDay: 'ⵙ ⵡⴰⵙⵙ',
    
    // Dashboard
    myDashboard: 'ⵜⴰⴼⴻⵍⵡⵉⵜ-ⵉⵏⵓ ⵏ ⵓⵙⴻⵏⵇⴻⴷ',
    addNewItem: 'ⵔⵏⵓ ⴰⴼⴰⵔⵉⵙ ⴰⵎⴰⵢⵏⵓ',
    myRentals: 'ⵉⵙⵓⵖⵔⴰ-ⵉⵏⵓ',
    myItems: 'ⵜⵉⵖⴰⵡⵙⵉⵡⵉⵏ-ⵉⵏⵓ',
    pending: 'ⵢⴻⵜⵜⵔⴰⵊⵊⵓ',
    confirmed: 'ⵢⴻⵜⵜⵡⴰⵙⴻⵏⵜⴻⵎ',
    completed: 'ⵢⴻⴽⴼⴰ',
    canceled: 'ⵢⴻⵜⵜⵡⴰⵙⴻⴼⵙⴻⵅ',
    active: 'ⵢⴻⵔⵎⵉⴷ',
    bookings: 'ⵉⵙⵉⵖⵔⴻⵏ',
    
    // Profile
    myProfile: 'ⴰⵎⴰⵖⵏⵓ-ⵉⵏⵓ',
    manageAccount: 'ⵙⴻⴼⵔⴻⴽ ⵉⵖⴻⵡⵡⴰⵕⴻⵏ ⵏ ⵓⵎⵉⴹⴰⵏ-ⵉⴽ ⴷ ⵓⵙⵎⴻⵏⵢⵉⴼ',
    profileInfo: 'ⵜⴰⵍⵖⵓⵜ ⵏ ⵓⵎⴰⵖⵏⵓ',
    security: 'ⵜⴰⵖⴻⵍⵍⵉⵙⵜ',
    edit: 'ⵥⵔⴻⴳ',
    saveChanges: 'ⵃⵔⴻⵣ ⵉⴱⴻⴷⴷⵉⵍⴻⵏ',
    cancel: 'ⵙⴻⴼⵙⴻⵅ',
    fullName: 'ⵉⵙⴻⵎ ⵓⵎⵎⵉⴷ',
    email: 'ⵉⵎⴰⵢⵍ',
    phoneNumber: 'ⵓⵟⵟⵓⵏ ⵏ ⵜⵉⵍⵉⵖⵔⵉ',
    dateOfBirth: 'ⴰⵣⴻⵎⵣ ⵏ ⵜⵍⴰⵍⵉⵜ',
    city: 'ⵜⴰⵎⴷⵉⵏⵜ',
    address: 'ⵜⴰⵏⵙⴰ',
    changePassword: 'ⴱⴻⴷⴷⴻⵍ ⴰⵡⴰⵍ ⵓⴼⵉⵔ',
    currentPassword: 'ⴰⵡⴰⵍ ⵓⴼⵉⵔ ⵏ ⵜⵓⵔⴰ',
    newPassword: 'ⴰⵡⴰⵍ ⵓⴼⵉⵔ ⴰⵎⴰⵢⵏⵓ',
    confirmNewPassword: 'ⵙⴻⵏⵜⴻⵎ ⴰⵡⴰⵍ ⵓⴼⵉⵔ ⴰⵎⴰⵢⵏⵓ',
    updatePassword: 'ⵍⴻⵇⵇⴻⵎ ⴰⵡⴰⵍ ⵓⴼⵉⵔ',
    
    // Login
    welcomeBack: 'ⴰⵏⵙⵓⴼ ⵢⵉⵙ-ⴽ ⵉ ⵜⵓⵖⴰⵍⵉⵏ',
    forgotPassword: 'ⵜⴻⵜⵜⵓⴹ ⴰⵡⴰⵍ ⵓⴼⵉⵔ?',
    or: 'ⵏⴻⵖ',
    continueWithGoogle: 'ⴽⴻⵎⵎⴻⵍ ⵙ Google',
    dontHaveAccount: 'ⵓⵔ ⵜⴻⵙⵄⵉⴹ ⴰⵔⴰ ⴰⵎⵉⴹⴰⵏ?',
    createAccount: 'ⵔⵏⵓ ⴰⵎⵉⴹⴰⵏ',
    
    // SignUp
    createYourAccount: 'ⵔⵏⵓ ⴰⵎⵉⴹⴰⵏ-ⵉⴽ',
    joinMessage: 'ⴷⴷⵓ ⵖⴻⵔ DZ-RentIt ⵓ ⴱⴷⵓ ⴰⴷ ⵜⴻⵙⵙⵓⵖⵔⴻⴹ ⴰⵙⵙ-ⴰ',
    password: 'ⴰⵡⴰⵍ ⵓⴼⵉⵔ',
    confirmPassword: 'ⵙⴻⵏⵜⴻⵎ ⴰⵡⴰⵍ ⵓⴼⵉⵔ',
    iAgree: 'ⵇⴻⴱⵍⴻⵖ',
    termsOfService: 'ⵜⵉⵡⵜⵉⵍⵉⵏ ⵏ ⵓⵎⴻⵥⵍⵓ',
    and: 'ⴷ',
    privacyPolicy: 'ⵜⴰⵙⴻⵔⵜⵉⵜ ⵏ ⵜⴱⴰⴹⵏⵉⵜ',
    alreadyHaveAccount: 'ⵜⴻⵙⵄⵉⴹ ⵢⴰⴽⴰⵏ ⴰⵎⵉⴹⴰⵏ?',
    passwordsDontMatch: 'ⴰⵡⴰⵍⴻⵏ ⵓⴼⵉⵔⴻⵏ ⵓⵔ ⵎⵚⴰⴷⴰⵏ ⴰⵔⴰ',
    accountCreated: 'ⴰⵎⵉⴹⴰⵏ ⵢⴻⵜⵜⵡⴰⵔⵏⴰ!',
    selectCity: 'ⴼⵔⴻⵏ ⵜⴰⵎⴷⵉⵏⵜ-ⵉⴽ',
    
    // Publish
    listYourItem: 'ⴱⴹⵓ ⴰⴼⴰⵔⵉⵙ-ⵉⴽ ⵉ ⵓⵙⵓⵖⵓⵔ',
    itemDetails: 'ⵜⴰⵍⵖⵓⵜ ⵏ ⵓⴼⴰⵔⵉⵙ',
    title: 'ⴰⵣⵡⴻⵍ',
    whatAreYouRenting: 'ⴷ ⴰⵛⵓ ⵉ ⵜⴻⵙⵙⵓⵖⵔⴻⴹ?',
    description: 'ⴰⴳⵍⴰⵎ',
    describeYourItem: 'ⴳⵍⴻⵎ ⴰⴼⴰⵔⵉⵙ-ⵉⴽ, ⴰⴷⴷⴰⴷ-ⵉⵙ, ⴷ ⵡⴰⵢⴻⵏ ⵢⴻⵍⵍⴰⵏ ⴷⴻⴳ-ⵙ...',
    category: 'ⵜⴰⴳⴳⴰⵢⵜ',
    selectCategory: 'ⴼⵔⴻⵏ ⵜⴰⴳⴳⴰⵢⵜ',
    electronics: 'ⵜⵉⵍⵉⴽⵙⴰⵙ',
    photography: 'ⵜⴰⵙⵓⴽⴽⴻⵏⵜ',
    gaming: 'ⵓⵔⴰⵔⴻⵏ',
    sports: 'ⴰⴷⴷⴰⵍ',
    music: 'ⴰⵥⴰⵡⴰⵏ',
    tools: 'ⵉⴼⴻⵛⴽⴰ',
    vehicles: 'ⵜⴽⴻⵔⵔⵓⵙⵉⵏ',
    other: 'ⵏⵏⵉⴹⴻⵏ',
    pricing: 'ⵙⵙⵓⵎⴰ',
    dailyRate: 'ⵙⵙⵓⵎⴰ ⵏ ⵡⴰⵙⵙ (DZD)',
    location: 'ⴰⴷⵉⴳ',
    
    // Cities
    algiers: 'ⵍⴻⵣⵣⴰⵢⴻⵔ',
    oran: 'ⵡⴻⵀⵔⴰⵏ',
    constantine: 'ⵇⵙⴻⵏⵜⵉⵏⴰ',
    annaba: 'ⵄⴻⵏⵏⴰⴱⴰ',
    blida: 'ⵍⴻⴱⵍⵉⴷⴰ',
    batna: 'ⵜⴱⴰⵜⴻⵏⵜ',
    setif: 'ⵙⵟⵉⴼ',
    sidibelabbes: 'ⵙⵉⴷⵉ ⴱⴻⵍ-ⵄⴻⴱⴱⴻⵙ',
    biskra: 'ⴱⵉⵙⴽⵔⴰ',
    tebessa: 'ⵜⴱⴻⵙⵙⴰ',
    tlemcen: 'ⵜⵍⴻⵎⵙⴻⵏ',
    bejaia: 'ⴱⴳⴰⵢⴻⵜ',
    tiaret: 'ⵜⵉⴰⵔⴻⵜ',
    bordjbouarreridj: 'ⴱⵓⵔⴷⵊ ⴱⵓ-ⵄⴻⵔⵔⵉⴷⵊ',
    djelfa: 'ⵊⴻⵍⴼⴰ',
    mostaganem: 'ⵎⵓⵙⵜⴰⵖⴰⵏⴻⵎ',
    
    // Footer
    aboutUs: 'ⵖⴼ-ⵏⵏⴻⵖ',
    aboutDescription: 'DZ-RentIt ⴷ ⵜⴰⵍⵖⵓⴱⵍⵉⵟ ⵜⴰⵎⴻⵇⵇⵔⴰⵏⵜ ⵏ ⵓⵙⵓⵖⵓⵔ ⴷⴻⴳ ⵍⴻⵣⵣⴰⵢⴻⵔ, ⵜⴻⵙⵙⴻⴷⵓⴽⵓⵍ ⵉⵎⴷⴰⵏⴻⵏ ⵢⴻⵍⵍⴰⵏ ⵖⵓⵔ-ⵙⴻⵏ ⵜⵉⵖⴰⵡⵙⵉⵡⵉⵏ ⴰⴽⴽⴻⴷ ⵡⵉⴷ ⵢⴻⴱⵖⴰⵏ ⴰⴷ ⵜⴻⵏⵜ-ⵙⵙⵙⵓⵖⵔⴻⵏ.',
    quickLinks: 'ⵉⵙⴻⵖⵡⴰⵏ ⵓⵔⴰⵔⴻⵏ',
    howItWorks: 'ⴰⵎⴻⴽ ⵉⵜⴻⴷⴷⵓ',
    termsConditions: 'ⵜⵉⵡⵜⵉⵍⵉⵏ ⴷ ⵜⵏⴰⴼⴼⵓⵜⵉⵏ',
    support: 'ⵜⴰⵍⵍⴰⵍⵜ',
    faq: 'ⵉⵙⵜⴻⵇⵙⵉⵢⴻⵏ',
    helpCenter: 'ⴰⵎⵎⴰⵙ ⵏ ⵜⴰⵍⵍⴰⵍⵜ',
    contactSupport: 'ⵏⴻⵔⵎⴻⵙ ⵜⴰⵍⵍⴰⵍⵜ',
    followUs: 'ⴹⴼⴻⵔ-ⴰⵖ',
    allRightsReserved: 'ⵉⵣⴻⵔⴼⴰⵏ ⵎⴻⵕⵕⴰ ⵜⵜⵡⵃⴻⵔⵣⴻⵏ.',
    madeWithLove: 'ⵢⴻⵜⵜⵡⴰⴳ ⵙ ❤️ ⴷⴻⴳ ⵍⴻⵣⵣⴰⵢⴻⵔ',
    
    // Payments
    payments: 'ⵍⴻⵅⵍⴰⵚⴰⵜ',
    manageTransactions: 'ⵙⴻⴼⵔⴻⴽ ⵜⵉⵏⴰⵡⴰⵢⵉⵏ-ⵉⴽ ⴷ ⵓⵎⴻⵣⵔⵓⵢ ⵏ ⵍⴻⵅⵍⴰⵚ',
    backToDashboard: 'ⵓⵖⴰⵍ ⵖⴻⵔ ⵜⴼⴻⵍⵡⵉⵜ ⵏ ⵓⵙⴻⵏⵇⴻⴷ',
    received: 'ⵢⴻⵜⵜⵡⴰⵔⴻⵎ',
    sent: 'ⵢⴻⵜⵜⵡⴰⵣⴻⵏ',
    totalEarnings: 'ⴰⵙⵎⴻⴽⵜⵉ ⵏ ⵜⵇⴰⵄⵉⵏ',
    totalSpent: 'ⴰⵙⵎⴻⴽⵜⵉ ⵏ ⵓⵙⴰⵔⴰⴼ',
    awaitingProcessing: 'ⵢⴻⵜⵜⵔⴰⵊⵊⵓ ⴰⵙⴻⵙⴼⴻⵔ',
    allTransactions: 'ⴰⴽⴽ ⵜⵉⵏⴰⵡⴰⵢⵉⵏ',
    paymentMethods: 'ⵜⴰⵔⵔⴰⵢⵉⵏ ⵏ ⵍⴻⵅⵍⴰⵚ',
    noTransactionsFound: 'ⵓⵍⴰⵛ ⵜⵉⵏⴰⵡⴰⵢⵉⵏ',
    transactionHistory: 'ⴰⵎⴻⵣⵔⵓⵢ ⵏ ⵍⴻⵅⵍⴰⵚⴰⵜ-ⵉⴽ ⴰⴷ ⴷ-ⵉⴱⴰⵏ ⴷⴰⴳⵉ',
    paymentFrom: 'ⵍⴻⵅⵍⴰⵚ ⵙⴻⴳ',
    paymentTo: 'ⵍⴻⵅⵍⴰⵚ ⵖⴻⵔ',
    pendingFrom: 'ⵢⴻⵜⵜⵔⴰⵊⵊⵓ ⵙⴻⴳ',
    viewReceipt: 'ⵡⴰⵍⵉ ⴰⴼⴻⵛⴽⵓ',
    transactionId: 'ⵓⵟⵟⵓⵏ ⵏ ⵜⵏⴰⵡⴰⵢⵜ',
    
    // Messages
    messages: 'ⵉⵣⵏⴰⵏ',
    search: 'ⵏⴰⴷⵉ',
    searchConversations: 'ⵏⴰⴷⵉ ⴷⴻⴳ ⵉⴷⵉⵡⴻⵏⵏⵉⵢⴻⵏ...',
    typeMessage: 'ⴰⵔⵓ ⵉⵣⴻⵏ...',
    noConversationsYet: 'ⵓⵍⴰⵛ ⵉⴷⵉⵡⴻⵏⵏⵉⵢⴻⵏ ⴰⵔ ⵜⵓⵔⴰ',
    startChatting: 'ⴱⴷⵓ ⴰⴷⵉⵡⴻⵏⵏⵉ ⴰⴽⴽⴻⴷ ⵢⵉⵎⴰⵡⵍⴰⵏ ⵏ ⵜⴻⵖⴰⵡⵙⵉⵡⵉⵏ ⵏⴻⵖ ⵉⵙⴻⵖⵔⴻⵏ',
    selectConversation: 'ⴼⵔⴻⵏ ⴰⴷⵉⵡⴻⵏⵏⵉ',
    chooseConversation: 'ⴼⵔⴻⵏ ⴰⴷⵉⵡⴻⵏⵏⵉ ⵙⴻⴳ ⵜⴻⴱⴷⴰⵔⵜ ⵉ ⵡⴰⴽⴽⴻⵏ ⴰⴷ ⵜⴻⴱⴷⵓⴹ',
    
    // Dashboard
    notifications: 'ⵉⵍⵖⴰ',
    items: 'ⵜⵉⵖⴰⵡⵙⵉⵡⵉⵏ',
    rentals: 'ⵉⵙⵓⵖⵔⴰ',
    markAllAsRead: 'ⵛⵔⴻⴹ ⵎⴻⵕⵕⴰ ⴷ ⵉⵖⵔⴰⵏ',
    noNotifications: 'ⵓⵍⴰⵛ ⵉⵍⵖⴰ',
    allCaughtUp: 'ⵜⴻⵥⵔⵉⴹ ⴽⵓⵍⵍⴻⵛ!',
    quickAccess: 'ⴰⵏⴻⴽⵛⵓⵎ ⴰⵔⵓⵔⴰⴷ',
    viewRentalsItems: 'ⵡⴰⵍⵉ ⵉⵙⵓⵖⵔⴰ-ⴽ ⴷ ⵜⴻⵖⴰⵡⵙⵉⵡⵉⵏ-ⵉⴽ',
    chatWithUsers: 'ⵎⵎⴻⵙⵍⴰⵢ ⴰⴽⴽⴻⴷ ⵢⵉⵎⴰⵡⵍⴰⵏ ⴷ ⵉⵙⴻⵖⵔⴻⵏ',
    publishItem: 'ⴱⴹⵓ ⴰⴼⴰⵔⵉⵙ',
    listNewRental: 'ⴱⴹⵓ ⴰⴼⴰⵔⵉⵙ ⴰⵎⴰⵢⵏⵓ ⵏ ⵓⵙⵓⵖⵓⵔ',
    settings: 'ⵉⵖⴻⵡⵡⴰⵕⴻⵏ',
    accountPreferences: 'ⴰⵎⵉⴹⴰⵏ ⴷ ⵓⵙⵎⴻⵏⵢⵉⴼ',
    
    // Item Detail
    availability: 'ⵜⵉⵡⵉⵣⵉ',
    available: 'ⵢⴻⵍⵍⴰⵏ',
    unavailable: 'ⵓⵍⴰⵛ-ⵉⵜ',
    owner: 'ⴱⴰⴱ',
    rentNow: 'ⵙⵙⵓⵖⴻⵔ ⵜⵓⵔⴰ',
    sendMessage: 'ⴰⵣⴻⵏ ⵉⵣⴻⵏ',
    reviews: 'ⵜⵉⴽⵜⵓⵔⵉⵏ',
    noReviewsYet: 'ⵓⵍⴰⵛ ⵜⵉⴽⵜⵓⵔⵉⵏ ⴰⵔ ⵜⵓⵔⴰ',
    firstToReview: 'ⵉⵍⵉ ⴷ ⴰⵎⴻⵣⵡⴰⵔⵓ ⴰⵔⴰ ⴷ-ⵢⴻⴼⴽⴻⵏ ⵜⵉⴽⵜⵉ',
    similarItems: 'ⵜⵉⵖⴰⵡⵙⵉⵡⵉⵏ ⵉⵛⵓⴷⴷⴻⵏ',
    
    // Public Profile
    itemsListed: 'ⵜⵉⵖⴰⵡⵙⵉⵡⵉⵏ ⵢⴻⵜⵜⵡⴰⴱⴹⴰⵏ',
    rating: 'ⵜⴰⴽⵜⵓⵔⵜ',
    memberSince: 'ⴰⵄⴻⴳⴳⴰⵍ ⵙⴻⴳ',
    viewAllItems: 'ⵡⴰⵍⵉ ⴰⴽⴽ ⵜⵉⵖⴰⵡⵙⵉⵡⵉⵏ',
    ownerReviews: 'ⵜⵉⴽⵜⵓⵔⵉⵏ ⵏ ⵓⵎⴰⵡⵍⴰⵏ',
    writeReview: 'ⴰⵔⵓ ⵜⴰⴽⵜⵓⵔⵜ',
    yourReview: 'ⵜⴰⴽⵜⵓⵔⵜ-ⵉⴽ',
    submitReview: 'ⴰⵣⴻⵏ ⵜⴰⴽⵜⵓⵔⵜ',
    helpful: 'ⵢⴻⵜⵜⵄⵉⵡⴻⵏ',
    professional: 'ⴰⵙⵏⴰⵡⴰⵏ',
    responsive: 'ⵢⴻⵜⵜⵄⴰⵡⴰⵏ ⵙ ⵜⵄⴻⴳⴳⴻⵍⵜ'
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

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setIsRTL(newLanguage === 'ar');
    localStorage.setItem('language', newLanguage);
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  const toggleLanguage = () => {
    const languages = ['en', 'ar', 'kab', 'kab_tfng'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    changeLanguage(languages[nextIndex]);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    isRTL,
    toggleLanguage,
    changeLanguage,
    t
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
