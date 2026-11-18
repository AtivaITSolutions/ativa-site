import Image from "next/image";
import type { ResolvedMedia } from "@ativa/cms-sdk";
import { cloudinaryLoader } from "@/lib/cloudinary";

interface CmsImageProps {
  media?: ResolvedMedia;
  /** Overrides the stored alt only when the block has a more specific one. */
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Render a CMS-managed image through the Cloudinary loader. Falls back to a
 * neutral placeholder when the media id didn't resolve (deleted/missing), so a
 * bad reference never crashes the page. Alt text is always present.
 */
export function CmsImage({ media, alt, className, sizes = "100vw", priority }: CmsImageProps) {
  if (!media) {
    return (
      <div
        role="img"
        aria-label={alt || "Image unavailable"}
        className={`flex aspect-video w-full items-center justify-center rounded-lg bg-black/5 text-sm text-black/40 ${className ?? ""}`}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <Image
      loader={cloudinaryLoader}
      src={media.url}
      alt={alt || media.alt}
      width={media.width ?? 1600}
      height={media.height ?? 900}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
