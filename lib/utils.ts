import { currencyLocaleMap } from '@/constants/currency'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (currency: string, amount: number) => {
  const locale = currencyLocaleMap[currency]
  const formater = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })
  return formater.format(amount)
}
