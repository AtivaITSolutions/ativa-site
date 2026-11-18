import type { ImageLoaderProps } from "next/image";

/**
 * Next.js Image loader for Cloudinary. Takes a stored Cloudinary delivery URL
 * (`media.url`) and inserts responsive transforms (`f_auto,q_auto,w_<width>`)
 * after `/upload/`, so `next/image` can request the right size per breakpoint.
 * Using a custom loader means no `images.remotePatterns` config is required.
 */
export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const transform = `f_auto,q_${quality ?? "auto"},w_${width}`;
  if (src.includes("/upload/")) {
    return src.replace("/upload/", `/upload/${transform}/`);
  }
  return src;
}
