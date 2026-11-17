import type { CtaBannerProps } from "./definition";

export function CtaBanner({ heading, text, cta, variant }: CtaBannerProps & { variant?: string }) {
  return (
    <section className="bg-black px-6 py-14 text-white" data-variant={variant}>
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-3">
        <h2 className="text-2xl font-semibold">{heading}</h2>
        {text ? <p className="text-white/70">{text}</p> : null}
        <a
          href={cta.href}
          className="mt-2 inline-flex rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
          {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {cta.label ?? "Learn more"}
        </a>
      </div>
    </section>
  );
}
