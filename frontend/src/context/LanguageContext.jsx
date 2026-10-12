import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    dashboard: "Dashboard", bmi: "BMI Calculator", math: "Math Calculator",
    trigonometry: "Trigonometry Calculator",
    interest: "Interest Calculator", discount: "Discount Calculator",
    root: "Root Calculator", land: "Sq Feet ↔ Cent", length: "Length Converter",
    area: "Area Calculator", history: "History", settings: "Settings",
    logout: "Logout", open: "Open", calculate: "Calculate", language: "Language",
    welcome: "Welcome to Smart Calculator"
  },
  ta: {
    dashboard: "முகப்பு", bmi: "BMI கணக்கீடு", math: "கணித கணக்கீடு",
    trigonometry: "முக்கோணவியல் கணக்கீடு",
    interest: "வட்டி கணக்கீடு", discount: "தள்ளுபடி கணக்கீடு",
    root: "மூல கணக்கீடு", land: "சதுர அடி ↔ சென்ட்", length: "நீள மாற்றி",
    area: "பரப்பளவு கணக்கீடு", history: "வரலாறு", settings: "அமைப்புகள்",
    logout: "வெளியேறு", open: "திறக்க", calculate: "கணக்கிடு", language: "மொழி",
    welcome: "Smart Calculator-க்கு வரவேற்கிறோம்"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const changeLanguage = (value) => {
    setLanguage(value);
    localStorage.setItem("language", value);
  };
  const t = (key) => translations[language][key] || key;
  return <LanguageContext.Provider value={{language, changeLanguage, t}}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
