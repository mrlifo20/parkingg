/* ========================
   PARKSYNC - Vanilla JavaScript
   Multi-city, role-based, i18n
   Dataset: bookable places (hotels, restaurants, activities, events)
   across Dubai, Abu Dhabi (UAE) and New York, Washington D.C., California (USA)
   ======================== */

// ========================
// Initialize App
// ========================
document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initLanguage();
    injectNavbarExtras();
    initAuth();
    initNavigation();
    initToasts();
    routePage();
    applyTranslations();
});

function routePage() {
    const page = getCurrentPage();

    const userPages = ['dashboard.html', 'booking.html', 'reservations.html', 'profile.html'];
    const adminPages = ['admin.html', 'reports.html', 'manage-spaces.html', 'owner-dashboard.html', 'add-space.html'];

    if (userPages.includes(page)) protectPage(['user', 'admin']);
    if (adminPages.includes(page)) protectPage(['admin']);

    switch (page) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'login.html':
            initLoginPage();
            break;
        case 'register.html':
            initRegisterPage();
            break;
        case 'forgot-password.html':
            initForgotPasswordPage();
            break;
        case 'dashboard.html':
            initDashboard();
            break;
        case 'search.html':
            initSearchPage();
            break;
        case 'booking.html':
            initBookingPage();
            break;
        case 'reservations.html':
            initReservationsPage();
            break;
        case 'owner-dashboard.html':
            initOwnerDashboard();
            break;
        case 'add-space.html':
            initAddSpacePage();
            break;
        case 'manage-spaces.html':
            initManageSpacesPage();
            break;
        case 'admin.html':
            initAdminPage();
            break;
        case 'reports.html':
            initReportsPage();
            break;
        case 'profile.html':
            initProfilePage();
            break;
        case 'contact.html':
            initContactPage();
            break;
        case 'faq.html':
            initFAQPage();
            break;
    }
}

// ========================
// Utilities
// ========================
function getCurrentPage() {
    const path = window.location.pathname;
    let page = path.substring(path.lastIndexOf('/') + 1);
    if (!page) page = 'index.html';
    return page;
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatCurrency(amount, currency) {
    const symbols = { USD: '$', AED: 'AED ', EGP: 'EGP ' };
    const sym = symbols[currency] || '$';
    return sym + parseFloat(amount).toFixed(2);
}

function priceUnitLabel(unit) {
    const map = {
        night: '/night',
        meal: '/meal',
        person: '/person',
        ticket: '/ticket',
        hour: '/hr',
        day: '/day',
        event: '/event'
    };
    return map[unit] || ('/' + unit);
}

// ========================
// Cities & Locations (Dubai, Abu Dhabi, NYC, Washington D.C., California)
// Each location has: id, name, country, city, category, description, price, priceUnit,
//                    rating, reviews, image, address, plus legacy fields used by the rest
//                    of the app (type/size/hasEV/totalSlots/availableSlots) for compatibility.
// ========================
function L(over) {
    // Helper to apply legacy defaults (type/size/hasEV/slots) so the app's existing
    // booking/availability flow keeps working for any "place".
    return Object.assign({
        type: 'indoor',
        size: 'standard',
        hasEV: false,
        totalSlots: 20,
        availableSlots: 12
    }, over);
}













const CITIES = {
  cairo: {
    nameEn: 'Cairo',
    nameAr: 'القاهرة',
    country: 'Egypt',
    currency: 'EGP',
    locations: [
      L({
        id: 'cai-01',
        name: 'Tahrir Square Underground Garage',
        nameAr: 'جراج التحرير',
        type: 'Garage',
        price_per_hour: 50,
        currency: 'EGP',
        availability: 'Limited',
        totalSlots: 60,
        availableSlots: 6,
        address: 'Tahrir Square',
        rating: 4.2,
        reviews: 980,
        image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAH1Gdii62d4KHf8dANlUBvcEUQkkp-iRZcfmN-X6_0YmXdKtEDFIFnX924P6d3xnh7oCT5Z0B18YXLw3lIm-j2qIn4B0IhmYCwAA3xpKqQXWXl2o5dR0fxf1JeaGEstFXakwXp_=s294-w294-h220-n-k-no'
      }),

      L({
        id: 'cai-02',
        name: 'Talaat Harb Street Parking',
        nameAr: 'انتظار طلعت حرب',
        type: 'Street',
        price_per_hour: 20,
        currency: 'EGP',
        availability: 'Available',
        totalSlots: 35,
        availableSlots: 22,
        address: 'Talaat Harb',
        rating: 3.9,
        reviews: 540,
        image:'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEZwslWuFvMk7VuhBGBW2r7f3yH3oksYjF9aiXzdX4NTLJxNzVrOwN4hbM7vePFmA8hSNtIyeWvB9jNztdFOusdyP0nLgl5ID2wgZCyN0iK_1EIgezGpweENFtlgYlYooMKVKdD=s680-w680-h510-rw'
    }),

      L({
        id: 'cai-03',
        name: 'Mall of Egypt Parking',
        nameAr: 'جراج مول مصر',
        type: 'Mall',
        price_per_hour: 30,
        currency: 'EGP',
        availability: 'Available',
        totalSlots: 5000,
        availableSlots: 3200,
        address: '6th October',
        rating: 4.6,
        reviews: 8420,
        image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFcxFAU3hf4E-7dbwiQVyCnZw0xH_32-o-72fdExRkOgJSJ4yTlimo13te5hIKuRpXYDimC9Jop1TeihjQ9TMSDmd2NXtB_kxwkwUmiKK2O6wG-1zu-wOAOItS3sm8-Qe2IlafzP_cMLWc=s680-w680-h510-rw'
      }),

      L({
        id: 'cai-04',
        name: 'Cairo Festival City Parking',
        nameAr: 'جراج كايرو فيستيفال',
        type: 'Mall',
        price_per_hour: 40,
        currency: 'EGP',
        availability: 'Available',
        totalSlots: 4000,
        availableSlots: 2800,
        address: 'New Cairo',
        rating: 4.5,
        reviews: 6310,
        image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHAm3WqZnvyTTw5m-Rq9J1mDhMhO4Hokj_PdE0DmvigAiLCjCbPmbTcZoG1QaHqnO1UR8ybzKmiTrzthlqpLBejkgrnRlDai5rep9gB3epnf-wOUZ23ydnbWE8mUh1LUWMx9R_zEh9cIFnz=s680-w680-h510-rw'
      }),

      L({
        id: 'cai-05',
        name: 'Citystars Garage',
        nameAr: 'جراج سيتي ستارز',
        type: 'Garage',
        price_per_hour: 60,
        currency: 'EGP',
        availability: 'Limited',
        totalSlots: 2500,
        availableSlots: 180,
        address: 'Heliopolis',
        rating: 4.1,
        reviews: 4120,
        image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEotxNQxgHhHhCIyaBPDfNtBFkKu4bnQu9z6DEAXeA-4oCvAXnN-udMCB3VV8XbXKsYPdQU3z-6_IkmOrkjb4ntptT3ZBg33ejS6fUa3hKmHtWAEIn_y_n4WWezKyeFkPBpXANF=s680-w680-h510-rw'
      }),

      L({
        id: 'cai-06',
        name: 'Administrative Capital Garage',
        nameAr: ' جراج العاصمه الاداريه  ',
        type: 'Street',
        price_per_hour: 25,
        currency: 'EGP',
        availability: 'Full',
        totalSlots: 25,
        availableSlots: 0,
        address: 'Al Hussein',
        rating: 3.4,
        reviews: 210,
        image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAH18koELzyTYj6sGLuuGx4RuFpBGv8P_jGc_oWKS-MrSCteAqi3mfYlstNKZ8ZGv9seikqyHXTATuYJsAJpSEJ0XNROAz807o31sUbCXhzkwzfCx0JLosAxSVq8xnRgudJylvbVFw=s680-w680-h510-rw'
      })
    ]
  },

  dubai: {
    nameEn: 'Dubai',
    nameAr: 'دبي',
    country: 'UAE',
    currency: 'AED',
    locations: [
      L({
        id: 'dxb-01',
        name: 'Dubai Mall Parking',
        nameAr: 'جراج دبي مول',
        type: 'Mall',
        price_per_hour: 60,
        currency: 'AED',
        availability: 'Available',
        totalSlots: 14000,
        availableSlots: 5200,
        address: 'Downtown Dubai',
        rating: 4.7,
        reviews: 18500,
        image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFFpOV0xC9IlFohCfe2jkiQ8chtqGGFzBOvd8EfsUvWsmlO9QHdNeJxWExFDyBKuDkcJ11KHRp9ociPqXD8nqOXUFxncavEqK82Xkj1nQYaVyfrpR9WxrQuihWf0SfYiU5YpffkhkdvHX7k=s680-w680-h510-rw'
      }),

      L({
        id: 'dxb-02',
        name: 'Mall of Emirates Parking',
        nameAr: 'جراج مول الإمارات',
        type: 'Mall',
        price_per_hour: 50,
        currency: 'AED',
        availability: 'Available',
        totalSlots: 7000,
        availableSlots: 3100,
        address: 'Sheikh Zayed Rd',
        rating: 4.6,
        reviews: 9200,
        image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGeZrJrqsnE4DXWx69TlCAHElhvzyy5DK7O4si161fY3-hGaTygashsnazqfmr4E3_8VZJDO4BNHY_v4hIgAR3zm9YgdCghujUAYIp4RjxW6XJbAj4IAmJUS4LymobiHrcmQSks3tuWYjs=w243-h174-n-k-no-nu'
      }),

      L({
        id: 'dxb-03',
        name: 'Burj Khalifa Parking',
        nameAr: 'جراج برج خليفة',
        type: 'Garage',
        price_per_hour: 70,
        currency: 'AED',
        availability: 'Limited',
        totalSlots: 1200,
        availableSlots: 95,
        address: 'Downtown',
        rating: 4.8,
        reviews: 4310,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTANSqnVwUvkJg4N2kTRGgnVtzS5kibaT0tjA&s'
      }),

      L({
        id: 'dxb-04',
        name: 'Dubai Marina Mall Parking',
        nameAr: 'جراج مارينا مول',
        type: 'Garage',
        price_per_hour: 40,
        currency: 'AED',
        availability: 'Available',
        totalSlots: 2200,
        availableSlots: 980,
        address: 'Dubai Marina',
        rating: 4.5,
        reviews: 7240,
        image: 'https://api.quicklease.ae/storage/blogs_images/mL5MYH5z8DjFRIcRI7lGwtUuKyrKqNGoV3tE3ixa.webp'
      })
    ]
  },

  newYork: {
    nameEn: 'New York',
    nameAr: 'نيويورك',
    country: 'USA',
    currency: 'USD',
    locations: [
      L({
        id: 'nyc-01',
        name: 'Times Square Garage',
        nameAr: 'جراج تايمز سكوير',
        type: 'Garage',
        price_per_hour: 70,
        currency: 'USD',
        availability: 'Limited',
        totalSlots: 320,
        availableSlots: 28,
        address: 'Manhattan',
        rating: 4.3,
        reviews: 3120,
        image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGZvUc1RgMogzA5gvrdv7cAZfxvEykwuzSGHaydyWK_Fz5nGeHQ0fnz3if-oXRKzuqiZDVMdpVY8ouE94yB8nvKIioIG2Em9zx7AXYkkLlhwUjinHI9zuiPq-_64x7JZHF_yXfvgw=s680-w680-h510-rw'
      }),

      L({
        id: 'nyc-02',
        name: 'Midtown Parking Garage',
        nameAr: 'جراج وسط المدينة',
        type: 'Garage',
        price_per_hour: 60,
        currency: 'USD',
        availability: 'Available',
        totalSlots: 480,
        availableSlots: 210,
        address: 'Midtown',
        rating: 4.4,
        reviews: 1820,
        image: 'https://img.youm7.com/ArticleImgs/2023/4/3/126196-%D8%A7%D9%84%D8%AC%D8%B1%D8%A7%D8%AC-%D9%85%D9%86-%D8%A7%D9%84%D8%AF%D8%A7%D8%AE%D9%84.jpg'
      }),

      L({
        id: 'nyc-03',
        name: 'Wall Street Parking',
        nameAr: 'جراج وول ستريت',
        type: 'Garage',
        price_per_hour: 50,
        currency: 'USD',
        availability: 'Available',
        totalSlots: 200,
        availableSlots: 80,
        address: 'SoHo',
        rating: 4.2,
        reviews: 1400,
        image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEx2nAPfLI5KGwnGH961zIph8GzGIygNMIGYn1Pvo7nMGSF-wIxkoanFtb-M7UXnj2EYG_4EcdM4iMXmfhUHkJkbeNiBZsUaVbX19o2Llr7sUB3AlWl30wJqDdGGdgKVof7n2w4acM9E64o=s680-w680-h510-rw'
      }),

      L({
        id: 'nyc-04',
        name: 'JFK Long Term Parking',
        nameAr: 'انتظار مطار JFK',
        type: 'Private',
        price_per_hour: 30,
        currency: 'USD',
        availability: 'Available',
        totalSlots: 9000,
        availableSlots: 4100,
        address: 'JFK Airport',
        rating: 4.2,
        reviews: 5640,
        image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEhLG_nSbov9rTKYrXMZWWn1ljvreMAGPsO0wDDm07vyE4cN7FugehAKFWVuA_-h_muJXuAlRyc42ZRPnlvHnmhh-bQpM4oIFS_q5bucqtZLJK8BZVhHEi0cMRs-8E_Mq0febkkIA=w408-h280-k-no'
      })
    ]
  }
};




function getStoredCityData() {
    const stored = localStorage.getItem('parksync_cities_v3');
    if (stored) {
        try { return JSON.parse(stored); } catch (e) { /* fall through */ }
    }
    return JSON.parse(JSON.stringify(CITIES));
}

function saveCityData(data) {
    localStorage.setItem('parksync_cities_v3', JSON.stringify(data));
}

function findLocation(locationId) {
    const data = getStoredCityData();
    for (const cityKey of Object.keys(data)) {
        const loc = data[cityKey].locations.find(l => l.id === locationId);
        if (loc) return { cityKey, city: data[cityKey], location: loc };
    }
    return null;
}

function updateLocationAvailability(locationId, delta) {
    const data = getStoredCityData();
    for (const cityKey of Object.keys(data)) {
        const loc = data[cityKey].locations.find(l => l.id === locationId);
        if (loc) {
            loc.availableSlots = Math.max(0, Math.min(loc.totalSlots, loc.availableSlots + delta));
            loc.status = loc.availableSlots > 0 ? 'available' : 'full';
            saveCityData(data);
            return loc;
        }
    }
    return null;
}

function getSelectedCity() {
    return localStorage.getItem('parksync_selectedCity') || '';
}

function setSelectedCity(cityKey) {
    if (cityKey) localStorage.setItem('parksync_selectedCity', cityKey);
    else localStorage.removeItem('parksync_selectedCity');
}

// ========================
// Theme
// ========================
function initTheme() {
    const savedTheme = localStorage.getItem('parksync_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('parksync_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(t('themeChanged'), t(newTheme === 'dark' ? 'darkModeOn' : 'lightModeOn'), 'info');
}

function updateThemeIcon(theme) {
    document.querySelectorAll('#themeToggle, .theme-toggle').forEach(btn => {
        btn.innerHTML = theme === 'dark'
            ? '<i class="bi bi-sun-fill"></i>'
            : '<i class="bi bi-moon-fill"></i>';
    });
}

// ========================
// Language / i18n
// ========================
let currentLang = 'en';

const translations = {
    en: {
        home: 'Home', search: 'Search', dashboard: 'Dashboard',
        howItWorks: 'How It Works', contact: 'Contact', login: 'Login',
        logout: 'Logout', register: 'Register', profile: 'Profile',
        admin: 'Admin', reports: 'Reports', reservations: 'My Reservations',
        manageSpaces: 'Manage Listings', addSpace: 'Add Listing',
        heroTitle: 'Discover & Book Amazing Places',
        heroSubtitle: 'Hotels, restaurants, activities and events across the world\'s top cities',
        searchPlaceholder: 'Enter a city, country or place name...',
        getStartedFree: 'Get Started Free', findParking: 'Browse Places',
        chooseCity: 'Choose a city to start',
        chooseCityHint: 'Pick where you\'re going, then explore everything you can book.',
        selectCity: 'Select City', city: 'City', country: 'Country', category: 'Category',
        changeCity: 'Change city', allCities: 'All cities',
        availableSpaces: 'Available Places',
        noSpaces: 'No places match your filters', adjustFilters: 'Try adjusting your filters',
        bookNow: 'Book Now', notAvailable: 'Not Available', fullyBooked: 'Fully Booked',
        available: 'Available', full: 'Full',
        spotsAvailable: 'spots left', filters: 'Filters',
        priceRange: 'Price Range', allPrices: 'All Prices',
        applyFilters: 'Apply Filters',
        categoryHotel: 'Hotel', categoryRestaurant: 'Restaurant',
        categoryActivity: 'Activity', categoryEvent: 'Event',
        loginTitle: 'Welcome Back', loginSubtitle: 'Sign in to your PARKSYNC account',
        registerTitle: 'Create Account', registerSubtitle: 'Join PARKSYNC and start booking smarter',
        fullName: 'Full Name', emailAddress: 'Email Address', password: 'Password',
        confirmPassword: 'Confirm Password', accountType: 'Account Type',
        roleUser: 'Regular User (Browse & Book)',
        roleAdmin: 'Administrator (Manage System)',
        signIn: 'Sign In', createAccount: 'Create Account',
        forgotPassword: 'Forgot password?', alreadyHaveAccount: 'Already have an account?',
        noAccount: "Don't have an account?", signUp: 'Sign up',
        agreeTerms: 'I agree to the Terms of Service and Privacy Policy',
        invalidCredentials: 'Invalid email or password',
        emailRegistered: 'Email already registered',
        registerSuccess: 'Registration successful! Please login.',
        passwordsNoMatch: 'Passwords do not match',
        bookingTitle: 'Book This Place', vehiclePlate: 'Booking Reference',
        plateExample: 'e.g., your initials or table for 2', duration: 'Quantity', hours: 'unit(s)',
        startTime: 'Start Time', subtotal: 'Subtotal', serviceFee: 'Service Fee',
        total: 'Total', confirmBooking: 'Confirm Booking', bookingConfirmed: 'Booking Confirmed!',
        showQR: 'Show this QR code at check-in',
        loginFirst: 'Please login first', spaceUnavailable: 'This place is currently unavailable',
        bookingSuccess: 'Booking confirmed!', bookingNotFound: 'Booking not found',
        myDashboard: 'My Dashboard', totalBookings: 'Total Bookings',
        activeBookings: 'Active Bookings', totalSpent: 'Total Spent',
        recentBookings: 'Recent Bookings', noBookings: 'No bookings yet',
        themeChanged: 'Theme Changed', darkModeOn: 'Switched to dark mode',
        lightModeOn: 'Switched to light mode', languageChanged: 'Language Changed',
        languageUpdated: 'Language updated', success: 'Success', error: 'Error',
        accessDenied: 'Access Denied', adminOnly: 'This page is for administrators only',
        welcome: 'Welcome', cancel: 'Cancel', save: 'Save', edit: 'Edit',
        delete: 'Delete', actions: 'Actions', status: 'Status', date: 'Date',
        amount: 'Amount', name: 'Name', email: 'Email', role: 'Role',
        location: 'Location', spots: 'Spots', price: 'Price',
        searchPlaceholderParking: 'Search by country, city, or parking name',
        availableParking: 'Available Parking',
        noParkingFound: 'No parking spots found',
        type: 'Type', availability: 'Availability',
        allCountries: 'All Countries', allTypes: 'All Types', allAvailability: 'All',
        countryEgypt: 'Egypt', countryUAE: 'United Arab Emirates', countryUSA: 'United States',
        typeStreet: 'Street', typeGarage: 'Garage', typeMall: 'Mall', typePrivate: 'Private',
        availStatusAvailable: 'Available', availStatusLimited: 'Limited', availStatusFull: 'Full',
        perHour: '/hr', resultsCount: 'results'
    },
    ar: {
        home: 'الرئيسية', search: 'بحث', dashboard: 'لوحة التحكم',
        howItWorks: 'كيف يعمل', contact: 'اتصل بنا', login: 'تسجيل الدخول',
        logout: 'تسجيل الخروج', register: 'حساب جديد', profile: 'الملف الشخصي',
        admin: 'الإدارة', reports: 'التقارير', reservations: 'حجوزاتي',
        manageSpaces: 'إدارة الأماكن', addSpace: 'إضافة مكان',
        heroTitle: 'اكتشف واحجز أفضل الأماكن',
        heroSubtitle: 'فنادق ومطاعم وأنشطة وفعاليات في أهم مدن العالم',
        searchPlaceholder: 'ابحث عن مدينة أو دولة أو مكان...',
        getStartedFree: 'ابدأ مجاناً', findParking: 'تصفح الأماكن',
        chooseCity: 'اختر مدينة للبدء',
        chooseCityHint: 'اختر وجهتك ثم استكشف كل ما يمكنك حجزه.',
        selectCity: 'اختر المدينة', city: 'المدينة', country: 'الدولة', category: 'التصنيف',
        changeCity: 'تغيير المدينة', allCities: 'كل المدن',
        availableSpaces: 'الأماكن المتاحة',
        noSpaces: 'لا توجد نتائج', adjustFilters: 'حاول تعديل عوامل التصفية',
        bookNow: 'احجز الآن', notAvailable: 'غير متاح', fullyBooked: 'مكتمل',
        available: 'متاح', full: 'ممتلئ',
        spotsAvailable: 'مكان متاح', filters: 'التصفية',
        priceRange: 'نطاق السعر', allPrices: 'كل الأسعار',
        applyFilters: 'تطبيق التصفية',
        categoryHotel: 'فندق', categoryRestaurant: 'مطعم',
        categoryActivity: 'نشاط', categoryEvent: 'فعالية',
        loginTitle: 'مرحباً بعودتك', loginSubtitle: 'سجل الدخول إلى حساب باركسينك',
        registerTitle: 'إنشاء حساب', registerSubtitle: 'انضم إلى باركسينك',
        fullName: 'الاسم الكامل', emailAddress: 'البريد الإلكتروني', password: 'كلمة المرور',
        confirmPassword: 'تأكيد كلمة المرور', accountType: 'نوع الحساب',
        roleUser: 'مستخدم عادي', roleAdmin: 'مسؤول النظام',
        signIn: 'تسجيل الدخول', createAccount: 'إنشاء حساب',
        forgotPassword: 'نسيت كلمة المرور؟', alreadyHaveAccount: 'لديك حساب بالفعل؟',
        noAccount: 'ليس لديك حساب؟', signUp: 'سجل الآن',
        agreeTerms: 'أوافق على الشروط',
        invalidCredentials: 'البريد أو كلمة المرور غير صحيحة',
        emailRegistered: 'البريد الإلكتروني مسجل بالفعل',
        registerSuccess: 'تم التسجيل بنجاح!',
        passwordsNoMatch: 'كلمات المرور غير متطابقة',
        bookingTitle: 'احجز هذا المكان', vehiclePlate: 'مرجع الحجز',
        plateExample: 'مثال: الاسم المختصر', duration: 'الكمية', hours: 'وحدة',
        startTime: 'وقت البدء', subtotal: 'المجموع الفرعي', serviceFee: 'رسوم الخدمة',
        total: 'الإجمالي', confirmBooking: 'تأكيد الحجز', bookingConfirmed: 'تم تأكيد الحجز!',
        showQR: 'اعرض رمز QR عند تسجيل الدخول',
        loginFirst: 'يرجى تسجيل الدخول أولاً', spaceUnavailable: 'المكان غير متاح',
        bookingSuccess: 'تم تأكيد الحجز!', bookingNotFound: 'الحجز غير موجود',
        myDashboard: 'لوحتي', totalBookings: 'إجمالي الحجوزات',
        activeBookings: 'الحجوزات النشطة', totalSpent: 'إجمالي المصروف',
        recentBookings: 'أحدث الحجوزات', noBookings: 'لا توجد حجوزات بعد',
        themeChanged: 'تم تغيير المظهر', darkModeOn: 'الوضع الداكن',
        lightModeOn: 'الوضع الفاتح', languageChanged: 'تم تغيير اللغة',
        languageUpdated: 'تم تحديث اللغة', success: 'نجاح', error: 'خطأ',
        accessDenied: 'الوصول مرفوض', adminOnly: 'للمسؤولين فقط',
        welcome: 'مرحباً', cancel: 'إلغاء', save: 'حفظ', edit: 'تعديل',
        delete: 'حذف', actions: 'إجراءات', status: 'الحالة', date: 'التاريخ',
        amount: 'المبلغ', name: 'الاسم', email: 'البريد', role: 'الدور',
        location: 'الموقع', spots: 'الأماكن', price: 'السعر',
        searchPlaceholderParking: 'ابحث بالدولة أو المدينة أو اسم الموقف',
        availableParking: 'مواقف السيارات المتاحة',
        noParkingFound: 'لا توجد مواقف مطابقة',
        type: 'النوع', availability: 'الإتاحة',
        allCountries: 'كل الدول', allTypes: 'كل الأنواع', allAvailability: 'الكل',
        countryEgypt: 'مصر', countryUAE: 'الإمارات العربية المتحدة', countryUSA: 'الولايات المتحدة',
        typeStreet: 'شارع', typeGarage: 'جراج', typeMall: 'مول', typePrivate: 'خاص',
        availStatusAvailable: 'متاح', availStatusLimited: 'محدود', availStatusFull: 'ممتلئ',
        perHour: '/ساعة', resultsCount: 'نتيجة'
    }
};

function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key;
}

function initLanguage() {
    currentLang = localStorage.getItem('parksync_lang') || 'en';
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('parksync_lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    updateLanguageButtons();
    applyTranslations();
    autoTranslateNavLinks();
    showToast(t('languageChanged'), t('languageUpdated'), 'info');

    const page = getCurrentPage();
    if (page === 'search.html') initSearchPage();
    if (page === 'admin.html') initAdminPage();
    if (page === 'manage-spaces.html') initManageSpacesPage();
}

function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
}

function applyTranslations() {
    document.querySelectorAll('[data-translate], [data-i18n]').forEach(el => {
        const key = el.dataset.translate || el.dataset.i18n;
        const val = translations[currentLang] && translations[currentLang][key];
        if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-translate-placeholder], [data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.translatePlaceholder || el.dataset.i18nPlaceholder;
        const val = translations[currentLang] && translations[currentLang][key];
        if (val) el.placeholder = val;
    });
}

const NAV_LINK_KEYS = {
    'index.html': 'home',
    'search.html': 'search',
    'dashboard.html': 'dashboard',
    'contact.html': 'contact',
    'admin.html': 'admin',
    'reports.html': 'reports',
    'reservations.html': 'reservations',
    'manage-spaces.html': 'manageSpaces',
    'add-space.html': 'addSpace',
    'profile.html': 'profile',
    '#how': 'howItWorks',
    'index.html#how': 'howItWorks'
};

function autoTranslateNavLinks() {
    document.querySelectorAll('.navbar .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        const key = NAV_LINK_KEYS[href];
        if (key && !link.hasAttribute('data-translate')) {
            link.setAttribute('data-translate', key);
        }
    });
    applyTranslations();
}

// ========================
// Navbar extras (lang switcher)
// ========================
function injectNavbarExtras() {
    document.querySelectorAll('.navbar .d-flex.align-items-center.gap-3').forEach(container => {
        if (!container.querySelector('.lang-toggle')) {
            const wrap = document.createElement('div');
            wrap.className = 'lang-toggle';
            wrap.innerHTML = `
                <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en" type="button">EN</button>
                <button class="lang-btn ${currentLang === 'ar' ? 'active' : ''}" data-lang="ar" type="button">AR</button>
            `;
            wrap.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
            });
            container.prepend(wrap);
        }
    });
    autoTranslateNavLinks();
}

// ========================
// Authentication (role-based, localStorage-backed)
// ========================
function initAuth() {
    seedAdminAccount();
    updateAuthUI();
}

function seedAdminAccount() {
    const users = getUsers();
    if (!users.find(u => u.email === 'admin@parksync.com')) {
        users.push({
            id: 'admin-seed',
            name: 'Site Admin',
            email: 'admin@parksync.com',
            password: 'admin123',
            role: 'admin',
            avatar: null, phone: '', favorites: [],
            createdAt: new Date().toISOString()
        });
        saveUsers(users);
    }
}

function getUsers() {
    return JSON.parse(localStorage.getItem('parksync_users') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('parksync_users', JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('parksync_currentUser') || 'null');
}

function setCurrentUser(user) {
    localStorage.setItem('parksync_currentUser', JSON.stringify(user));
}

function isLoggedIn() { return getCurrentUser() !== null; }

function hasRole(roles) {
    const u = getCurrentUser();
    if (!u) return false;
    if (!roles || roles.length === 0) return true;
    return roles.includes(u.role);
}

function register(name, email, password, role) {
    const users = getUsers();
    role = (role === 'admin') ? 'admin' : 'user';
    if (users.find(u => u.email === email)) {
        return { success: false, message: t('emailRegistered') };
    }
    const newUser = {
        id: generateId(),
        name, email, password, role,
        avatar: null, phone: '', favorites: [],
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveUsers(users);
    return { success: true, message: t('registerSuccess'), user: newUser };
}

function login(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: t('invalidCredentials') };
    setCurrentUser(user);
    return { success: true, user };
}

function logout() {
    localStorage.removeItem('parksync_currentUser');
    window.location.href = 'index.html';
}

function protectPage(roles) {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    if (roles && roles.length && !hasRole(roles)) {
        showToast(t('accessDenied'), t('adminOnly'), 'error');
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
    }
}

function updateAuthUI() {
    const user = getCurrentUser();

    document.querySelectorAll('#loginBtn').forEach(loginBtn => {
        if (user) {
            loginBtn.textContent = t('logout');
            loginBtn.setAttribute('data-translate', 'logout');
            loginBtn.onclick = logout;
        } else {
            loginBtn.textContent = t('login');
            loginBtn.setAttribute('data-translate', 'login');
            loginBtn.onclick = () => window.location.href = 'login.html';
        }
    });

    document.querySelectorAll('#profileIcon').forEach(profileIcon => {
        if (user) {
            profileIcon.textContent = (user.name || '?').charAt(0).toUpperCase();
            profileIcon.style.display = 'flex';
        } else {
            profileIcon.style.display = 'none';
        }
    });

    if (user && user.role === 'admin') {
        document.querySelectorAll('.navbar .navbar-nav').forEach(nav => {
            if (!nav.querySelector('a[data-admin-link]')) {
                const li = document.createElement('li');
                li.className = 'nav-item';
                li.innerHTML = `<a class="nav-link" href="admin.html" data-admin-link data-translate="admin">${t('admin')}</a>`;
                nav.appendChild(li);
            }
        });
    }
}

// ========================
// Navigation
// ========================
function initNavigation() {
    const currentPage = getCurrentPage();
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ========================
// Toasts
// ========================
function initToasts() {
    if (!document.getElementById('toastContainer')) {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
}

function showToast(title, message, type) {
    type = type || 'info';
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toastId = 'toast-' + generateId();
    const bgColors = { success: 'bg-success', error: 'bg-danger', warning: 'bg-warning', info: 'bg-info' };
    const icons = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', warning: 'bi-exclamation-triangle-fill', info: 'bi-info-circle-fill' };
    const toastHTML = `
        <div id="${toastId}" class="toast toast-custom show" role="alert">
            <div class="toast-header ${bgColors[type]} text-white">
                <i class="bi ${icons[type]} me-2"></i>
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close btn-close-white" onclick="removeToast('${toastId}')"></button>
            </div>
            <div class="toast-body">${message}</div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', toastHTML);
    setTimeout(() => removeToast(toastId), 5000);
}

function removeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }
}

// ========================
// Bookings
// ========================
function getBookings() {
    return JSON.parse(localStorage.getItem('parksync_bookings') || '[]');
}

function saveBookings(bookings) {
    localStorage.setItem('parksync_bookings', JSON.stringify(bookings));
}

function createBooking(locationId, duration, vehiclePlate) {
    const user = getCurrentUser();
    if (!user) return { success: false, message: t('loginFirst') };

    const found = findLocation(locationId);
    if (!found || found.location.availableSlots <= 0) {
        return { success: false, message: t('spaceUnavailable') };
    }
    const { cityKey, city, location } = found;

    const totalPrice = location.price * duration;
    const booking = {
        id: generateId(),
        cityKey, cityName: city.nameEn, cityNameAr: city.nameAr,
        country: location.country, category: location.category,
        locationId: location.id,
        spaceName: location.name, spaceNameAr: location.nameAr,
        spaceAddress: location.address, spaceAddressAr: location.addressAr,
        userId: user.id, userEmail: user.email, userName: user.name,
        vehiclePlate, duration,
        priceUnit: location.priceUnit,
        totalPrice, status: 'active',
        checkedIn: false, checkedOut: false,
        qrCode: 'QR-' + generateId().toUpperCase(),
        createdAt: new Date().toISOString(),
        expiresAt: calculateExpiry(duration, location.priceUnit)
    };
    const bookings = getBookings();
    bookings.push(booking);
    saveBookings(bookings);
    updateLocationAvailability(location.id, -1);
    return { success: true, message: t('bookingSuccess'), booking };
}

function cancelBooking(bookingId) {
    const bookings = getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, message: t('bookingNotFound') };
    if (booking.status !== 'active') return { success: false, message: 'Already closed' };
    booking.status = 'cancelled';
    saveBookings(bookings);
    updateLocationAvailability(booking.locationId, +1);
    return { success: true, message: 'Booking cancelled' };
}

function extendBooking(bookingId, additionalDuration) {
    const bookings = getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, message: t('bookingNotFound') };
    const found = findLocation(booking.locationId);
    if (found) booking.totalPrice += found.location.price * additionalDuration;
    booking.duration += additionalDuration;
    booking.expiresAt = calculateExpiry(booking.duration, booking.priceUnit, new Date(booking.createdAt));
    saveBookings(bookings);
    return { success: true, message: 'Booking extended!', booking };
}

function checkIn(bookingId) {
    const bookings = getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, message: t('bookingNotFound') };
    booking.checkedIn = true;
    booking.checkInTime = new Date().toISOString();
    saveBookings(bookings);
    return { success: true, message: 'Checked in successfully!' };
}

function checkOut(bookingId) {
    const bookings = getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, message: t('bookingNotFound') };
    booking.checkedOut = true;
    booking.checkOutTime = new Date().toISOString();
    booking.status = 'completed';
    saveBookings(bookings);
    updateLocationAvailability(booking.locationId, +1);
    return { success: true, message: 'Checked out successfully!' };
}

function calculateExpiry(duration, unit, startDate) {
    const date = startDate ? new Date(startDate) : new Date();
    switch (unit) {
        case 'hour': date.setHours(date.getHours() + duration); break;
        case 'day':
        case 'night': date.setDate(date.getDate() + duration); break;
        case 'event': date.setHours(date.getHours() + 8); break;
        default: date.setDate(date.getDate() + 1); break;
    }
    return date.toISOString();
}

// ========================
// Favorites
// ========================
function toggleFavorite(spaceId) {
    const user = getCurrentUser();
    if (!user) { showToast(t('error'), t('loginFirst'), 'error'); return false; }
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return false;
    if (!users[idx].favorites) users[idx].favorites = [];
    const favIdx = users[idx].favorites.indexOf(spaceId);
    if (favIdx === -1) {
        users[idx].favorites.push(spaceId);
        showToast(t('success'), 'Added to favorites!', 'success');
    } else {
        users[idx].favorites.splice(favIdx, 1);
        showToast(t('success'), 'Removed from favorites', 'info');
    }
    saveUsers(users);
    setCurrentUser(users[idx]);
    return favIdx === -1;
}

function isFavorite(spaceId) {
    const user = getCurrentUser();
    return !!(user && user.favorites && user.favorites.includes(spaceId));
}

// ========================
// Page Initializations
// ========================
function initHomePage() {
    const heroSearchForm = document.getElementById('heroSearchForm');
    if (heroSearchForm) {
        heroSearchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = document.getElementById('heroSearchInput').value;
            window.location.href = 'search.html?q=' + encodeURIComponent(query);
        });
    }
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) entry.target.classList.add('fade-in-up'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.feature-card, .step-card, .testimonial-card').forEach(function (el) { observer.observe(el); });
}

function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const result = login(email, password);
        if (result.success) {
            showToast(t('welcome'), t('welcome') + ', ' + result.user.name + '!', 'success');
            setTimeout(function () {
                window.location.href = result.user.role === 'admin' ? 'admin.html' : 'dashboard.html';
            }, 800);
        } else {
            showToast(t('error'), result.message, 'error');
        }
    });
}

function initRegisterPage() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const role = (document.getElementById('role') || {}).value || 'user';
        if (password !== confirmPassword) {
            showToast(t('error'), t('passwordsNoMatch'), 'error');
            return;
        }
        const result = register(name, email, password, role);
        if (result.success) {
            showToast(t('success'), result.message, 'success');
            setTimeout(function () { window.location.href = 'login.html'; }, 1200);
        } else {
            showToast(t('error'), result.message, 'error');
        }
    });
}

function initForgotPasswordPage() {
    const forgotForm = document.getElementById('forgotForm');
    if (!forgotForm) return;
    forgotForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        showToast('Email Sent', 'Password reset instructions sent to ' + email, 'success');
        setTimeout(function () { window.location.href = 'login.html'; }, 1500);
    });
}

function initDashboard() {
    const user = getCurrentUser();
    const bookings = getBookings().filter(function (b) { return b.userId === user.id; });
    const totalBookings = bookings.length;
    const activeBookings = bookings.filter(function (b) { return b.status === 'active'; }).length;
    const totalSpent = bookings.reduce(function (sum, b) { return sum + b.totalPrice; }, 0);

    function set(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
    set('totalBookings', totalBookings);
    set('activeBookings', activeBookings);
    set('totalSpent', formatCurrency(totalSpent));
    set('userName', user.name);

    renderRecentBookings(bookings.slice(-5).reverse());
    checkExpiringBookings(bookings);
}

function renderRecentBookings(bookings) {
    const container = document.getElementById('recentBookings');
    if (!container) return;
    if (bookings.length === 0) {
        container.innerHTML =
            '<tr><td colspan="5" class="text-center py-4">' +
            '<p class="text-secondary mb-2">' + t('noBookings') + '</p>' +
            '<a href="search.html" class="btn btn-accent btn-sm">' + t('findParking') + '</a>' +
            '</td></tr>';
        return;
    }
    container.innerHTML = bookings.map(function (booking) {
        return '<tr>' +
            '<td><strong>' + locName(booking) + '</strong>' +
            '<br><small class="text-secondary">' + cityName(booking) + ' — ' + locAddress(booking) + '</small></td>' +
            '<td>' + formatDate(booking.createdAt) + '</td>' +
            '<td>' + booking.duration + ' ' + (booking.priceUnit || '') + '</td>' +
            '<td><span class="badge ' + getStatusBadgeClass(booking.status) + '">' + booking.status + '</span></td>' +
            '<td>' + formatCurrency(booking.totalPrice) + '</td>' +
            '</tr>';
    }).join('');
}

function locName(b) { return currentLang === 'ar' && b.spaceNameAr ? b.spaceNameAr : b.spaceName; }
function locAddress(b) { return currentLang === 'ar' && b.spaceAddressAr ? b.spaceAddressAr : b.spaceAddress; }
function cityName(b) { return currentLang === 'ar' && b.cityNameAr ? b.cityNameAr : (b.cityName || ''); }

function getStatusBadgeClass(status) {
    return ({ active: 'bg-success', completed: 'bg-info', cancelled: 'bg-danger', expired: 'bg-warning' })[status] || 'bg-secondary';
}

function checkExpiringBookings(bookings) {
    const now = new Date();
    bookings.filter(function (b) { return b.status === 'active'; }).forEach(function (booking) {
        const hoursLeft = (new Date(booking.expiresAt) - now) / 36e5;
        if (hoursLeft <= 1 && hoursLeft > 0) {
            showToast('Expiry Warning', 'Your booking at ' + locName(booking) + ' expires in less than 1 hour!', 'warning');
        }
    });
}

// ========================
// Search Page (city + locations + country/category filter)
// ========================
function initSearchPage() {
    renderCityPicker();
    const selected = getSelectedCity();
    renderSpacesForCity(selected);

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const searchInput = document.getElementById('searchInput');
    if (searchInput && query) searchInput.value = query;

    ['searchInput', 'priceFilter', 'countryFilter', 'categoryFilter', 'ratingFilter', 'typeFilter', 'availabilityFilter'].forEach(function (id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('input', filterSpaces);
        el.addEventListener('change', filterSpaces);
        if (el.tagName === 'INPUT') {
            el.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') { e.preventDefault(); filterSpaces(); }
            });
        }
    });
    filterSpaces();
}

function renderCityPicker() {
    const host = document.getElementById('cityPicker');
    if (!host) return;
    const selected = getSelectedCity();
    const data = getStoredCityData();
    host.innerHTML =
        '<div class="card card-custom mb-4"><div class="card-body">' +
        '<div class="d-flex flex-wrap align-items-center justify-content-between gap-3">' +
        '<div><h5 class="mb-1">' + t('selectCity') + '</h5>' +
        '<small class="text-secondary">' + t('chooseCityHint') + '</small></div>' +
        '<div class="d-flex flex-wrap gap-2" id="cityButtons">' +
        Object.keys(data).map(function (key) {
            const c = data[key];
            const cName = currentLang === 'ar' ? c.nameAr : c.nameEn;
            const flag = c.country === 'UAE' ? '🇦🇪' : '🇺🇸';
            return '<button type="button" class="btn ' + (selected === key ? 'btn-accent' : 'btn-outline-accent') +
                '" data-city="' + key + '">' + flag + ' ' + cName + '</button>';
        }).join('') +
        '<button type="button" class="btn ' + (!selected ? 'btn-accent' : 'btn-outline-accent') +
        '" data-city="">🌍 ' + t('allCities') + '</button>' +
        '</div></div></div></div>';
    host.querySelectorAll('[data-city]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            setSelectedCity(btn.dataset.city);
            renderCityPicker();
            renderSpacesForCity(btn.dataset.city);
            filterSpaces();
        });
    });
}

function renderSpacesForCity(cityKey) {
    const spaces = collectSpaces(cityKey);
    renderParkingSpaces(spaces);
}

function collectSpaces(cityKey) {
    const data = getStoredCityData();
    let spaces = [];
    if (cityKey && data[cityKey]) {
        spaces = data[cityKey].locations.map(function (l) {
            return Object.assign({}, l, {
                cityKey: cityKey,
                cityName: data[cityKey].nameEn,
                cityNameAr: data[cityKey].nameAr,
                country: l.country || data[cityKey].country
            });
        });
    } else {
        Object.keys(data).forEach(function (k) {
            data[k].locations.forEach(function (l) {
                spaces.push(Object.assign({}, l, {
                    cityKey: k,
                    cityName: data[k].nameEn,
                    cityNameAr: data[k].nameAr,
                    country: l.country || data[k].country
                }));
            });
        });
    }
    return spaces;
}

function filterSpaces() {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const countryFilter = (document.getElementById('countryFilter') || {}).value || 'all';
    const typeFilter = (document.getElementById('typeFilter') || {}).value || 'all';
    const availabilityFilter = (document.getElementById('availabilityFilter') || {}).value || 'all';

    let spaces = collectSpaces(getSelectedCity());

    spaces = spaces.filter(function (space) {
        if (searchQuery) {
            const haystack = [
                space.name, space.nameAr,
                space.city, space.cityName, space.cityNameAr,
                space.country, space.countryEn, space.countryAr
            ].filter(Boolean).join(' ').toLowerCase();
            if (haystack.indexOf(searchQuery) === -1) return false;
        }
        if (countryFilter !== 'all' && space.country !== countryFilter) return false;
        if (typeFilter !== 'all' && space.type !== typeFilter) return false;
        if (availabilityFilter !== 'all' && space.availability !== availabilityFilter) return false;
        return true;
    });

    renderParkingSpaces(spaces);
    const counter = document.getElementById('resultCount');
    if (counter) counter.textContent = spaces.length + ' ' + t('resultsCount');
}

function categoryBadge(cat) {
    const map = {
        hotel: { class: 'bg-info', icon: 'bi-building', label: t('categoryHotel') },
        restaurant: { class: 'bg-warning', icon: 'bi-egg-fried', label: t('categoryRestaurant') },
        activity: { class: 'bg-success', icon: 'bi-compass', label: t('categoryActivity') },
        event: { class: 'bg-danger', icon: 'bi-music-note-beamed', label: t('categoryEvent') }
    };
    const c = map[cat] || { class: 'bg-secondary', icon: 'bi-tag', label: cat || '' };
    return '<span class="badge ' + c.class + '"><i class="bi ' + c.icon + '"></i> ' + c.label + '</span>';
}

function countryBadge(country) {
    const flag = country === 'UAE' ? '🇦🇪' : country === 'USA' ? '🇺🇸' : '🌍';
    return '<span class="badge bg-secondary">' + flag + ' ' + (country || '') + '</span>';
}

function availabilityBadge(status) {
    const map = {
        Available: { cls: 'bg-success', dot: '#22e6a4', key: 'availStatusAvailable' },
        Limited:   { cls: 'bg-warning text-dark', dot: '#ffc857', key: 'availStatusLimited' },
        Full:      { cls: 'bg-danger',  dot: '#ff4d6d', key: 'availStatusFull' }
    };
    const cfg = map[status] || map.Available;
    return '<span class="badge ' + cfg.cls + '">' +
            '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + cfg.dot +
            ';box-shadow:0 0 6px ' + cfg.dot + ';margin-inline-end:6px;vertical-align:middle"></span>' +
            t(cfg.key) +
           '</span>';
}

function typeBadge(type) {
    const keyMap = { Street: 'typeStreet', Garage: 'typeGarage', Mall: 'typeMall', Private: 'typePrivate' };
    const k = keyMap[type] || null;
    return '<span class="badge bg-secondary"><i class="bi bi-tag"></i> ' + (k ? t(k) : (type || '')) + '</span>';
}

function renderParkingSpaces(spaces) {
    const container = document.getElementById('parkingGrid');
    if (!container) return;
    if (!spaces || spaces.length === 0) {
        container.innerHTML =
            '<div class="col-12 text-center py-5">' +
            '<i class="bi bi-search display-1 text-secondary"></i>' +
            '<h4 class="mt-3" data-i18n="noParkingFound">' + t('noParkingFound') + '</h4>' +
            '</div>';
        return;
    }
    container.innerHTML = spaces.map(function (space) {
        const isFull = space.availability === 'Full';
        const cityLabel = currentLang === 'ar' ? (space.cityNameAr || space.cityName) : space.cityName;
        const countryLabel = currentLang === 'ar' ?
            (space.country === 'Egypt' ? 'مصر' : space.country === 'UAE' ? 'الإمارات' : space.country === 'USA' ? 'الولايات المتحدة' : space.country) :
            space.country;
        const name = currentLang === 'ar' && space.nameAr ? space.nameAr : space.name;
        const priceLabel = space.price_per_hour === 0
            ? (currentLang === 'ar' ? 'مجاني' : 'Free')
            : formatCurrency(space.price_per_hour, space.currency) + ' ' + t('perHour');
        return '' +
            '<div class="col-lg-4 col-md-6 mb-4">' +
              '<div class="card card-custom parking-card h-100">' +
                '<img src="' + space.image + '" class="card-img-top" alt="' + name + '" loading="lazy">' +
                '<span class="parking-badge ' + (isFull ? 'badge-booked' : 'badge-available') + '">' +
                  availabilityBadge(space.availability) +
                '</span>' +
                '<div class="card-body d-flex flex-column">' +
                  '<div class="d-flex justify-content-between align-items-start mb-2">' +
                    '<h5 class="card-title mb-0">' + name + '</h5>' +
                    '<button class="btn btn-link p-0 text-accent" onclick="toggleFavorite(\'' + space.id + '\')" aria-label="favorite">' +
                      '<i class="bi ' + (isFavorite(space.id) ? 'bi-heart-fill' : 'bi-heart') + '"></i>' +
                    '</button>' +
                  '</div>' +
                  '<p class="card-text mb-2"><i class="bi bi-geo-alt text-accent"></i> ' + cityLabel + ', ' + countryLabel + '</p>' +
                  '<div class="d-flex flex-wrap gap-2 mb-3">' +
                    typeBadge(space.type) +
                  '</div>' +
                  '<div class="d-flex justify-content-between align-items-center mb-3 mt-auto">' +
                    '<div class="price-tag">' + priceLabel + '</div>' +
                  '</div>' +
                  '<a href="booking.html?id=' + space.id + '" class="btn btn-accent w-100 ' + (isFull ? 'disabled' : '') + '">' +
                    (isFull ? t('notAvailable') : t('bookNow')) +
                  '</a>' +
                '</div>' +
              '</div>' +
            '</div>';
    }).join('');
}

// ========================
// Booking Page
// ========================
function initBookingPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const locationId = urlParams.get('id');
    if (!locationId) { window.location.href = 'search.html'; return; }

    const found = findLocation(locationId);
    if (!found) {
        showToast(t('error'), 'Location not found', 'error');
        setTimeout(function () { window.location.href = 'search.html'; }, 800);
        return;
    }
    const city = found.city, location = found.location;

    const name = currentLang === 'ar' && location.nameAr ? location.nameAr : location.name;
    const address = currentLang === 'ar' && location.addressAr ? location.addressAr : location.address;
    const cityLabel = currentLang === 'ar' ? city.nameAr : city.nameEn;

    function set(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
    set('spaceName', name);
    set('spaceAddress', cityLabel + ' — ' + address);
    set('spacePrice', formatCurrency(location.price) + priceUnitLabel(location.priceUnit));
    set('spaceAvailability', location.availableSlots + '/' + location.totalSlots);
    const img = document.getElementById('spaceImage');
    if (img) img.src = location.image;

    const fee = 0.50;
    function recalc() {
        const dur = parseInt((document.getElementById('duration') || {}).value || '0', 10);
        const sub = location.price * dur;
        set('subtotalPrice', formatCurrency(sub));
        set('totalPrice', formatCurrency(sub + fee));
    }
    const durEl = document.getElementById('duration');
    if (durEl) durEl.addEventListener('input', recalc);
    recalc();

    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const duration = parseInt(document.getElementById('duration').value, 10);
            const vehiclePlate = document.getElementById('vehiclePlate').value;
            const result = createBooking(location.id, duration, vehiclePlate);
            if (result.success) {
                showToast(t('success'), t('bookingSuccess'), 'success');
                showQRModal(result.booking);
                setTimeout(function () { window.location.href = 'reservations.html'; }, 2500);
            } else {
                showToast(t('error'), result.message, 'error');
            }
        });
    }
}

function showQRModal(booking) {
    const modalHTML =
        '<div class="modal fade show" id="qrModal" tabindex="-1" style="display:block; background:rgba(0,0,0,0.5)">' +
        '<div class="modal-dialog modal-dialog-centered"><div class="modal-content" style="background: var(--bg-secondary)">' +
        '<div class="modal-header border-0">' +
        '<h5 class="modal-title text-accent">' + t('bookingConfirmed') + '</h5>' +
        '<button type="button" class="btn-close btn-close-white" onclick="document.getElementById(\'qrModal\').remove()"></button>' +
        '</div>' +
        '<div class="modal-body text-center">' +
        '<div class="qr-container mb-3"><div class="qr-code" style="background: url(\'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + booking.qrCode + '\') center/contain no-repeat; width:150px; height:150px;"></div></div>' +
        '<p class="mb-1"><strong>' + t('city') + ':</strong> ' + cityName(booking) + '</p>' +
        '<p class="mb-1"><strong>' + t('location') + ':</strong> ' + locName(booking) + '</p>' +
        '<p class="mb-1"><strong>Code:</strong> ' + booking.qrCode + '</p>' +
        '<p class="text-secondary small">' + t('showQR') + '</p>' +
        '</div></div></div></div>';
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// ========================
// Reservations
// ========================
function initReservationsPage() {
    const user = getCurrentUser();
    const bookings = getBookings().filter(function (b) { return b.userId === user.id; });
    renderActiveReservations(bookings.filter(function (b) { return b.status === 'active'; }));
    renderPastReservations(bookings.filter(function (b) { return b.status !== 'active'; }));
}

function renderActiveReservations(bookings) {
    const container = document.getElementById('activeReservations');
    if (!container) return;
    if (bookings.length === 0) {
        container.innerHTML =
            '<div class="text-center py-5">' +
            '<i class="bi bi-calendar-x display-1 text-secondary"></i>' +
            '<h4 class="mt-3">No active reservations</h4>' +
            '<a href="search.html" class="btn btn-accent mt-3">' + t('findParking') + '</a>' +
            '</div>';
        return;
    }
    container.innerHTML = bookings.map(function (booking) {
        const ciOrCo = !booking.checkedIn
            ? '<button class="btn btn-success btn-sm" onclick="handleCheckIn(\'' + booking.id + '\')"><i class="bi bi-box-arrow-in-right"></i> Check In</button>'
            : !booking.checkedOut
                ? '<button class="btn btn-info btn-sm" onclick="handleCheckOut(\'' + booking.id + '\')"><i class="bi bi-box-arrow-right"></i> Check Out</button>'
                : '';
        return '<div class="card card-custom mb-3"><div class="card-body">' +
            '<div class="row align-items-center">' +
            '<div class="col-md-3"><div class="qr-container">' +
            '<div class="qr-code" style="background: url(\'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=' + booking.qrCode + '\') center/contain no-repeat; width:100px; height:100px;"></div>' +
            '</div></div>' +
            '<div class="col-md-5">' +
            '<h5 class="mb-1">' + locName(booking) + '</h5>' +
            '<p class="text-secondary mb-1"><i class="bi bi-building"></i> ' + cityName(booking) + '</p>' +
            '<p class="text-secondary mb-1"><i class="bi bi-geo-alt"></i> ' + locAddress(booking) + '</p>' +
            '<p class="mb-1"><i class="bi bi-bookmark text-accent"></i> ' + booking.vehiclePlate + '</p>' +
            '<p class="mb-1"><i class="bi bi-clock text-accent"></i> ' + booking.duration + ' ' + (booking.priceUnit || 'unit') + '(s)</p>' +
            '<p class="mb-0"><i class="bi bi-calendar text-accent"></i> Expires: ' + formatDate(booking.expiresAt) + '</p>' +
            '</div>' +
            '<div class="col-md-4 text-md-end mt-3 mt-md-0">' +
            '<p class="price-tag mb-3">' + formatCurrency(booking.totalPrice) + '</p>' +
            '<div class="d-flex flex-wrap gap-2 justify-content-md-end">' +
            ciOrCo +
            '<button class="btn btn-outline-accent btn-sm" onclick="handleExtend(\'' + booking.id + '\')"><i class="bi bi-plus-circle"></i> Extend</button>' +
            '<button class="btn btn-outline-danger btn-sm" onclick="handleCancel(\'' + booking.id + '\')"><i class="bi bi-x-circle"></i> ' + t('cancel') + '</button>' +
            '</div></div></div></div></div>';
    }).join('');
}

function renderPastReservations(bookings) {
    const container = document.getElementById('pastReservations');
    if (!container) return;
    if (bookings.length === 0) { container.innerHTML = '<p class="text-secondary text-center py-4">No past reservations</p>'; return; }
    container.innerHTML = bookings.map(function (booking) {
        return '<tr>' +
            '<td>' + cityName(booking) + ' — ' + locName(booking) + '</td>' +
            '<td>' + formatDate(booking.createdAt) + '</td>' +
            '<td>' + booking.duration + ' ' + (booking.priceUnit || '') + '</td>' +
            '<td><span class="badge ' + getStatusBadgeClass(booking.status) + '">' + booking.status + '</span></td>' +
            '<td>' + formatCurrency(booking.totalPrice) + '</td>' +
            '</tr>';
    }).join('');
}

function handleCheckIn(id) { const r = checkIn(id); showToast(r.success ? t('success') : t('error'), r.message, r.success ? 'success' : 'error'); initReservationsPage(); }
function handleCheckOut(id) { const r = checkOut(id); showToast(r.success ? t('success') : t('error'), r.message, r.success ? 'success' : 'error'); initReservationsPage(); }
function handleExtend(id) {
    const units = prompt('Enter additional units to extend:');
    if (units && !isNaN(units)) {
        const r = extendBooking(id, parseInt(units, 10));
        showToast(r.success ? t('success') : t('error'), r.message, r.success ? 'success' : 'error');
        initReservationsPage();
    }
}
function handleCancel(id) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        const r = cancelBooking(id);
        showToast(r.success ? t('success') : t('error'), r.message, r.success ? 'success' : 'info');
        initReservationsPage();
    }
}

// ========================
// Owner Dashboard / Manage spaces (admin)
// ========================
function getAllLocationsFlat() {
    const data = getStoredCityData();
    const out = [];
    Object.keys(data).forEach(function (k) {
        data[k].locations.forEach(function (l) {
            out.push(Object.assign({}, l, {
                cityKey: k,
                cityName: data[k].nameEn,
                cityNameAr: data[k].nameAr,
                country: l.country || data[k].country
            }));
        });
    });
    return out;
}

function initOwnerDashboard() {
    const spaces = getAllLocationsFlat();
    const bookings = getBookings();
    const totalSpaces = spaces.length;
    const occupiedSpaces = spaces.reduce(function (sum, s) { return sum + (s.totalSlots - s.availableSlots); }, 0);
    const totalRevenue = bookings.reduce(function (sum, b) { return sum + b.totalPrice; }, 0);

    function set(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
    set('totalSpaces', totalSpaces);
    set('occupiedSpaces', occupiedSpaces);
    set('ownerRevenue', formatCurrency(totalRevenue));

    renderOwnerSpaces(spaces);
}

function renderOwnerSpaces(spaces) {
    const container = document.getElementById('ownerSpacesList');
    if (!container) return;
    container.innerHTML = spaces.map(function (space) {
        return '<tr>' +
            '<td><img src="' + space.image + '" width="60" height="40" class="rounded me-2" style="object-fit:cover;">' + space.name + '</td>' +
            '<td>' + space.cityName + ', ' + space.country + '</td>' +
            '<td>' + space.category + '</td>' +
            '<td>' + formatCurrency(space.price) + priceUnitLabel(space.priceUnit) + '</td>' +
            '<td>' + space.availableSlots + '/' + space.totalSlots + '</td>' +
            '<td><span class="badge ' + (space.availableSlots > 0 ? 'bg-success' : 'bg-danger') + '">' +
            (space.availableSlots > 0 ? t('available') : t('full')) + '</span></td>' +
            '<td><button class="btn btn-sm btn-outline-danger" onclick="deleteListing(\'' + space.id + '\',\'' + space.cityKey + '\')"><i class="bi bi-trash"></i></button></td>' +
            '</tr>';
    }).join('');
}

function deleteListing(id, cityKey) {
    if (!confirm('Delete this listing?')) return;
    const data = getStoredCityData();
    if (data[cityKey]) {
        data[cityKey].locations = data[cityKey].locations.filter(function (l) { return l.id !== id; });
        saveCityData(data);
        showToast(t('success'), 'Listing deleted', 'success');
        initOwnerDashboard();
        if (typeof initManageSpacesPage === 'function') initManageSpacesPage();
    }
}

function initManageSpacesPage() { initOwnerDashboard(); }

function initAddSpacePage() {
    const form = document.getElementById('addSpaceForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = getStoredCityData();
        const cityKey = (document.getElementById('cityKey') || {}).value || 'newYork';
        const total = parseInt((document.getElementById('listingTotal') || {}).value || '20', 10);
        const newLoc = L({
            id: 'cust-' + generateId(),
            name: document.getElementById('listingName').value,
            country: data[cityKey].country,
            city: data[cityKey].nameEn,
            category: (document.getElementById('listingCategory') || {}).value || 'hotel',
            description: (document.getElementById('listingDescription') || {}).value || '',
            address: document.getElementById('listingAddress').value,
            price: parseFloat(document.getElementById('listingPrice').value),
            priceUnit: (document.getElementById('listingPriceUnit') || {}).value || 'night',
            rating: 0, reviews: 0,
            image: (document.getElementById('listingImage') || {}).value || 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
            totalSlots: total,
            availableSlots: total
        });
        data[cityKey].locations.push(newLoc);
        saveCityData(data);
        showToast(t('success'), 'Listing added!', 'success');
        setTimeout(function () { window.location.href = 'manage-spaces.html'; }, 800);
    });
}

// ========================
// Admin / Reports / Profile / Contact / FAQ
// ========================
function initAdminPage() {
    const users = getUsers();
    const spaces = getAllLocationsFlat();
    const bookings = getBookings();

    function set(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
    set('totalUsers', users.length);
    set('totalSpaces', spaces.length);
    set('totalBookings', bookings.length);
    set('totalRevenue', formatCurrency(bookings.reduce(function (s, b) { return s + b.totalPrice; }, 0)));

    const userTable = document.getElementById('usersList');
    if (userTable) {
        userTable.innerHTML = users.map(function (u) {
            return '<tr>' +
                '<td>' + u.name + '</td>' +
                '<td>' + u.email + '</td>' +
                '<td><span class="badge bg-secondary">' + u.role + '</span></td>' +
                '<td>' + formatDate(u.createdAt || new Date().toISOString()) + '</td>' +
                '</tr>';
        }).join('');
    }
}

function initReportsPage() {
    const bookings = getBookings();
    const totalRev = bookings.reduce(function (s, b) { return s + b.totalPrice; }, 0);
    function set(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
    set('reportTotalRevenue', formatCurrency(totalRev));
    set('reportTotalBookings', bookings.length);

    const list = document.getElementById('reportBookings');
    if (list) {
        list.innerHTML = bookings.slice(-20).reverse().map(function (b) {
            return '<tr>' +
                '<td>' + (b.userName || b.userEmail) + '</td>' +
                '<td>' + b.spaceName + ' (' + b.cityName + ')</td>' +
                '<td>' + (b.category || '—') + '</td>' +
                '<td>' + formatDate(b.createdAt) + '</td>' +
                '<td>' + formatCurrency(b.totalPrice) + '</td>' +
                '<td><span class="badge ' + getStatusBadgeClass(b.status) + '">' + b.status + '</span></td>' +
                '</tr>';
        }).join('');
    }
}

function initProfilePage() {
    const user = getCurrentUser();
    function set(id, val) { const el = document.getElementById(id); if (el) el.value = val; }
    set('profileName', user.name || '');
    set('profileEmail', user.email || '');
    set('profilePhone', user.phone || '');

    const form = document.getElementById('profileForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const users = getUsers();
            const idx = users.findIndex(function (u) { return u.id === user.id; });
            if (idx === -1) return;
            users[idx].name = document.getElementById('profileName').value;
            users[idx].phone = document.getElementById('profilePhone').value;
            saveUsers(users);
            setCurrentUser(users[idx]);
            showToast(t('success'), 'Profile updated!', 'success');
        });
    }
}

function initContactPage() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        showToast(t('success'), 'Message sent! We\'ll get back to you soon.', 'success');
        form.reset();
    });
}

function initFAQPage() { /* Bootstrap accordion handles itself */ }
