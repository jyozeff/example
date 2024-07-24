import i18n from 'i18next'
import translation from './en/tr.json'
import { initReactI18next } from 'react-i18next'

export const resources = {
  en: {
    translation,
  },
} as const

i18n.use(initReactI18next).init({
  // lng: 'en', // if you're using a language detector, do not define the lng option
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
})
