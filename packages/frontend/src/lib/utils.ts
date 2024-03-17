import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as dateFns from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function formatDte(date: string) {
  return dateFns.format(date, "dd MMMM yyyy h:mm a");
}
