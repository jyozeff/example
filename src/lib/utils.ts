import constants from '../lib/constants'
import { format } from 'date-fns'

export const sleep = async (millis: number) => {
  await new Promise(resolve => setTimeout(resolve, millis))
}

export function isOldEnough(birthdate: Date) {
  const dateNow = new Date()

  const datePast = new Date(
    dateNow.getFullYear() - constants.minAge,
    dateNow.getMonth(),
    dateNow.getDate(),
    dateNow.getHours(),
    dateNow.getMinutes(),
    dateNow.getSeconds(),
    dateNow.getMilliseconds(),
  )

  return birthdate <= datePast
}

export function isYoungEnough(birthdate: Date) {
  const dateNow = new Date()

  const datePast = new Date(
    dateNow.getFullYear() - constants.maxAge + 1,
    dateNow.getMonth(),
    dateNow.getDate(),
    dateNow.getHours(),
    dateNow.getMinutes(),
    dateNow.getSeconds(),
    dateNow.getMilliseconds(),
  )

  return birthdate > datePast
}

/**
 * @returns YYYY-MM-DD
 */
export function formatDate(date?: Date) {
  if (!date) {
    return undefined
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Month is zero-indexed
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * @returns MMMM dd, yyyy (e.g. "May 12, 2024")
 */
export function formatDateStr(date: string) {
  return format(new Date(date), 'MMMM dd, yyyy')
}

const emailRegex =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export function isValidEmail(email = '') {
  if (
    !email ||
    email.length > constants.maxEmailLength ||
    !emailRegex.test(email)
  ) {
    return false
  }

  // Further checking of some things regex can't handle
  const [account, address] = email.split('@')
  if (account.length > 64) {
    return false
  }

  const domainParts = address.split('.')
  if (domainParts.some(part => part.length > 63)) {
    return false
  }

  return true
}

export function getQueryValue(_key: string) {
  try {
    if (typeof window === 'undefined') {
      return ''
    }

    const queryString = window.location.search

    const params = new URLSearchParams(queryString)

    for (const [key, value] of Array.from(params.entries())) {
      if (key === _key) {
        return value
      }
    }

    return ''
  } catch (err) {
    return ''
  }
}

/**
 * returns null if it cannot be converted
 */
export function secsToStr(secs: number) {
  try {
    const secsInDay = 3600 * 24
    const secsInWeek = secsInDay * 7
    const secsInMonth = secsInDay * 30 // Approximate value for a month
    const secsInYear = secsInDay * 365 // Approximate value for a year

    if (secs >= secsInYear) {
      const years = Math.floor(secs / secsInYear)
      return `${years} year${years !== 1 ? 's' : ''}`
    }
    if (secs >= secsInMonth) {
      const months = Math.floor(secs / secsInMonth)
      return `${months} month${months !== 1 ? 's' : ''}`
    }
    if (secs >= secsInWeek) {
      const weeks = Math.floor(secs / secsInWeek)
      return `${weeks} week${weeks !== 1 ? 's' : ''}`
    }
    if (secs >= secsInDay) {
      const days = Math.floor(secs / secsInDay)
      return `${days} day${days !== 1 ? 's' : ''}`
    }
    return `${secs} second${secs !== 1 ? 's' : ''}`
  } catch (err) {
    return null
  }
}

/**
 * @param ageStr in YYYY-MM-DD format
 */

export function getAge(birthdate: string) {
  const birthDate = new Date(birthdate)
  const currentDate = new Date()
  let age = currentDate.getFullYear() - birthDate.getFullYear()

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age
}
