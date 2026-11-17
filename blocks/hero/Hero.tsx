import type { HeroProps } from "./definition";

// Image rendering is a placeholder until Phase 5 (Cloudinary media resolution).
export function Hero({ heading, subheading, image, cta, variant }: HeroProps & { variant?: string }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16" data-variant={variant}>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">{heading}</h1>
        {subheading ? <p className="text-lg text-black/60">{subheading}</p> : null}
        <div
          className="flex aspect-video w-full items-center justify-center rounded-lg bg-black/5 text-sm text-black/40"
          data-media-id={image.mediaId}
        >
          Image: {image.mediaId} (resolved in Phase 5)
        </div>
        {cta ? (
          <a
            href={cta.href}
            className="inline-flex w-fit rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
            {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {cta.label ?? "Learn more"}
          </a>
        ) : null}
      </div>
    </section>
  );
}
