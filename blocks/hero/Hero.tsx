import type { ResolvedMedia } from "@ativa/cms-sdk";
import { CmsImage } from "@/components/CmsImage";
import type { HeroProps } from "./definition";

export function Hero({
  heading,
  subheading,
  image,
  cta,
  variant,
  media,
}: HeroProps & { variant?: string; media?: Record<string, ResolvedMedia> }) {
  const resolved = image.mediaId ? media?.[image.mediaId] : undefined;

  return (
    <section className="mx-auto max-w-5xl px-6 py-16" data-variant={variant}>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">{heading}</h1>
        {subheading ? <p className="text-lg text-black/60">{subheading}</p> : null}
        <CmsImage
          media={resolved}
          sizes="(min-width: 1024px) 960px, 100vw"
          priority
          className="w-full rounded-lg"
        />
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
