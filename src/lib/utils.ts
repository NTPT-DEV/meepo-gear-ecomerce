import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Covert first letter to upercase
export const firstTextUppercase = (str : string ) => {
  if(!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

  
