// lib/cn.ts
import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind/NativeWind classes smartly.
 * - clsx: builds the class string from conditionals/arrays/objects
 * - tailwind-merge: resolves conflicts (e.g., p-2 vs p-4)
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
