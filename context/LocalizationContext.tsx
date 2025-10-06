import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";

// Storage key for locale preference
const LOCALE_STORAGE_KEY = "user_locale";

// Create the context
const LocalizationContext = createContext<{
    t: (key: string) => string;
    locale: string;
    setLocale: (locale: string) => void;
    isRTL: boolean;
}>({
    t: () => "",
    locale: "en",
    setLocale: () => {},
    isRTL: false,
});



const translations = {
    en: {
        // --- Navigation ---
        home: 'Home',
        services: 'Services',
        profile: 'Profile',
        bookings: 'My Bookings',
        login: 'Login',
        register: 'Register',
        logout: "Logout",

        // --- User & Authentication ---
        email: "Email",
        password: "Password",
        orRegister: "Or Register instead",
        loginFailed: "Login failed. Please try again.",
        fullName: "Full Name",
        nameRequired: "Name is required",
        passwordLength: "Password must be at least 6 characters",
        registerFailed: "Registration failed. Please try again.",
        alreadyHaveAccount: "Already have an account? Login",
        loading: "Loading...",
        user: "User",

        // --- Profile & Settings ---
        accountSettings: "Account Settings",
        editProfile: "Edit Profile",
        myAppointments: "My Appointments",

        // --- Services ---
        ourServices: "Our Services",
        servicesDescription: "Choose from our selection of premium barbering services",
        startingAt: "Starting at",
        Hair_Dye: "Hair Dye",
        Beard_Trim: "Beard Trim",
        Regular_Haircut: "Regular Haircut",
        Basic: "Basic",
        Premium: "Premium",
        Styling: "Styling",
        Beard_Color: "Beard Color",
        Hair_Wash: "Hair Wash",
        chooseVariant: "Choose Variant",
        continue: "Continue",
        optionalAddOns: "Optional Add-ons",


        // --- Appointments ---
        noAppointments: "You don't have any upcoming appointments",
        bookAppointment: "Book an Appointment",
        duration: "Duration",
        minutes: "minutes",
        price: "Price",
        cancel: "Cancel",
        update: "Update",
        rescheduled: "Rescheduled",
        back: "Back",
        selectVariant: "Select Variant",
        addOns: "Add-ons",
        summary: "Summary",
        totalPrice: "Total Price",
        updateAppointment: "Update Appointment",
        selectTime: "Select Time",
        for: "for",
        noAvailableSlots: "No available time slots for this date",
        confirm: "Confirm",
        error: "Error",
        pleaseSelectTime: "Please select a time",
        errorLoadingSlots: "Error loading time slots",
        confirmationDetails: "Appointment Details",
        service: "Service",
        oldDate: "Old Date & Time",
        newDate: "New Date & Time",
        updating: "Updating...",
        success: "Success",
        appointmentUpdated: "Your appointment has been successfully updated",
        updateError: "An error occurred while updating your appointment",
        date: "Date",
        time: "Time",
        appointmentSuccessTitle: "Appointment Confirmed",
        appointmentSuccessMessage: "Your appointment has been successfully booked! Thank you for choosing us.",
        ok: "OK",
        errorTitle: "Error",
        appointmentErrorMessage: "An error occurred while creating the appointment. Please try again later.",



        // --- Marketing / Landing Page ---
        professionalBarberServices: "Professional Barber Services",
        barbershopDescription: "Experience the best haircuts and grooming services with our expert barbers.",
        featuredServices: "Featured Services",
        haircut: "Haircut",
        haircutDescription: "Classic and modern haircut styles",
        shave: "Shave",
        shaveDescription: "Traditional hot towel straight razor shave",
        beard: "Beard Trim",
        beardDescription: "Beard shaping and maintenance",
        languageSwitcherHint: "You can change language in profile settings",
        premiumBarberExperience: "Premium Barber Experience",
        welcome: "Welcome to Elegant Cuts",
        welcomeUser: "Welcome",
        welcomeMessage: "Experience the finest haircuts and grooming services in town. Book your appointment today!",
        exploreServices: "Explore Our Services",
        whyChooseUs: "Why Choose Us",
        professionalBarbers: "Professional Barbers",
        professionalBarbersDesc: "Our team consists of experienced professionals who are masters of their craft.",
        premiumProducts: "Premium Products",
        premiumProductsDesc: "We use only high-quality products for the best results and experience.",
        convenientBooking: "Convenient Booking",
        convenientBookingDesc: "Book your appointment anytime, anywhere with our easy-to-use app.",
        confirmAndContinue: "Confirm & Continue",
        approving: "Approving...",
    },

    he: {
        // --- Navigation ---
        home: 'בית',
        services: 'שירותים',
        profile: 'פרופיל',
        bookings: 'התורים שלי',
        login: 'התחברות',
        register: 'הרשמה',
        logout: "התנתק",

        // --- User & Authentication ---
        email: "דוא״ל",
        password: "סיסמה",
        orRegister: "או הירשם במקום",
        loginFailed: "ההתחברות נכשלה. אנא נסה שוב.",
        fullName: "שם מלא",
        nameRequired: "שם הוא שדה חובה",
        passwordLength: "סיסמה חייבת להכיל לפחות 6 תווים",
        registerFailed: "ההרשמה נכשלה. אנא נסה שוב.",
        alreadyHaveAccount: "כבר יש לך חשבון? התחבר",
        loading: "טוען...",
        user: "משתמש",

        // --- Profile & Settings ---
        accountSettings: "הגדרות חשבון",
        editProfile: "ערוך פרופיל",
        myAppointments: "התורים שלי",

        // --- Services ---
        ourServices: "השירותים שלנו",
        servicesDescription: "בחר מבין מגוון שירותי הספרות המובחרים שלנו",
        startingAt: "החל מ-",


        // --- Appointments ---
        noAppointments: "אין לך תורים קרובים",
        bookAppointment: "קבע תור",
        duration: "משך",
        minutes: "דקות",
        price: "מחיר",
        cancel: "בטל",
        update: "עדכן",
        rescheduled: "נקבע מחדש",
        back: "חזרה",
        selectVariant: "בחר סוג שירות",
        addOns: "תוספות",
        summary: "סיכום",
        totalPrice: "מחיר כולל",
        updateAppointment: "עדכון תור",
        selectTime: "בחר שעה",
        for: "עבור",
        noAvailableSlots: "אין זמנים פנויים לתאריך זה",
        confirm: "אישור",
        error: "שגיאה",
        pleaseSelectTime: "אנא בחר שעה חדשה",
        errorLoadingSlots: "שגיאה בטעינת הזמנים הפנויים",
        confirmationDetails: "פרטי התור",
        service: "שירות",
        oldDate: "תאריך ושעה נוכחיים",
        newDate: "תאריך ושעה חדשים",
        updating: "מעדכן...",
        success: "הצלחה",
        appointmentUpdated: "התור עודכן בהצלחה",
        updateError: "אירעה שגיאה בעת עדכון התור",
        confirmAndContinue: "אישור והזמנה",
        approving: "מאשר...",
        date: "תאריך",
        time: "שעה",
        appointmentSuccessTitle: "הזמנה התקבלה",
        appointmentSuccessMessage: "התור נקבע בהצלחה! תודה שבחרת בנו.",
        ok: "אישור",
        errorTitle: "שגיאה",
        appointmentErrorMessage: "אירעה שגיאה בעת יצירת התור. אנא נסה שוב מאוחר יותר.",


        // Services
        Hair_Dye: "צביעת שיער",
        Beard_Trim: "עיצוב זקן",
        Regular_Haircut: "תספורת",
        Basic: "בסיסי",
        Premium: "פרימיום",
        Styling: "סטיילינג",
        Beard_Color: "צביעת זקן",
        Hair_Wash: "שטיפת שיער",
        chooseVariant: "בחר סוג",
        continue: "המשך",
        optionalAddOns: "תוספות",



        // --- Marketing / Landing Page ---
        professionalBarberServices: "שירותי ספרות מקצועיים",
        barbershopDescription: "חווה את התספורות והטיפוח הטובים ביותר עם הספרים המומחים שלנו.",
        featuredServices: "שירותים מובחרים",
        haircut: "תספורת",
        haircutDescription: "סגנונות תספורת קלאסיים ומודרניים",
        shave: "גילוח",
        shaveDescription: "גילוח מסורתי עם תער ומגבת חמה",
        beard: "עיצוב זקן",
        beardDescription: "עיצוב וטיפוח זקן",
        languageSwitcherHint: "ניתן לשנות שפה בהגדרות הפרופיל",
        premiumBarberExperience: "חווית ספר פרימיום",
        welcome: "ברוכים הבאים ל-Elegant Cuts",
        welcomeUser: "ברוך הבא," ,
        welcomeMessage: "חווה את תספורות האיכות והשירותים הטובים ביותר בעיר. הזמן תור עוד היום!",
        exploreServices: "גלה את השירותים שלנו",
        whyChooseUs: "למה לבחור בנו",
        professionalBarbers: "ספרים מקצועיים",
        professionalBarbersDesc: "הצוות שלנו מורכב ממקצוענים מנוסים שהם אמנים באומנותם.",
        premiumProducts: "מוצרים איכותיים",
        premiumProductsDesc: "אנו משתמשים רק במוצרים באיכות גבוהה לתוצאות וחוויה מיטביים.",
        convenientBooking: "הזמנת תורים נוחה",
        convenientBookingDesc: "הזמן תור בכל זמן, בכל מקום עם האפליקציה הקלה לשימוש שלנו.",
    },
};

export const LocalizationProvider = ({ children }: { children: React.ReactNode }) => {
    const [locale, setLocale] = useState("en");
    const [isLoading, setIsLoading] = useState(true);
    const isRTL = locale === "he";

    // Load saved locale on mount
    useEffect(() => {
        const loadLocale = async () => {
            try {
                const savedLocale = await AsyncStorage.getItem(LOCALE_STORAGE_KEY);
                if (savedLocale) {
                    setLocale(savedLocale);
                }
            } catch (error) {
                console.error("Error loading locale:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadLocale();
    }, []);

    // Handle RTL layout changes when locale changes
    useEffect(() => {
        if (!isLoading) {
            const shouldBeRTL = locale === "he";

            if (I18nManager.isRTL !== shouldBeRTL) {
                I18nManager.forceRTL(shouldBeRTL);

                // Store the locale preference
                AsyncStorage.setItem(LOCALE_STORAGE_KEY, locale).catch(
                    error => console.error('Error saving locale:', error)
                );

                // Force app restart to apply RTL changes
                // This is necessary for RTL layout changes to take effect
                setTimeout(() => {
                    // Use your app's restart mechanism here
                    // For Expo, you might need to reload the entire app
                    if (locale === "he") {
                        I18nManager.allowRTL(false);
                    } else {
                        I18nManager.allowRTL(false);
                    }
                }, 100);
            } else {
                // Just save the locale without restart if RTL state hasn't changed
                AsyncStorage.setItem(LOCALE_STORAGE_KEY, locale).catch(
                    error => console.error('Error saving locale:', error)
                );
            }
        }
    }, [locale, isLoading]);



    // Translation function
    const t = (key: string): string => {
        // @ts-ignore
        return translations[locale]?.[key] || translations.en[key] || key;
    };

    return (
        <LocalizationContext.Provider value={{ t, locale, setLocale, isRTL }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useLocalization = () => useContext(LocalizationContext);