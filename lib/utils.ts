import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function covertAmountToMiliUnits(amount: number) {
  return Math.round(amount * 1000);
}
export function covertAmountFromMiliUnits(amount: number) {
  return amount / 1000;
}
export function formatCurrency(value: number) {
  return Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}
