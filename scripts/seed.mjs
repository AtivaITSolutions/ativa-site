// Dev-only seed script. The runtime site is READ-ONLY; this script is the one
// place that writes, and it uses a SEPARATE, dev-only readWrite connection
// string (SEED_MONGODB_URI) that must never ship. See docs/DATABASE.md.
//
//   SEED_MONGODB_URI="mongodb+srv://<rw-user>:<pw>@.../" npm run seed
//
import { MongoClient } from "mongodb";

const uri = process.env.SEED_MONGODB_URI;
if (!uri) {
  console.error("SEED_MONGODB_URI is not set (dev-only readWrite URI). Aborting.");
  process.exit(1);
}
const dbName = process.env.MONGODB_DB ?? "site_ativa";

const richTextDoc = (text) => ({
  type: "doc",
  content: [{ type: "paragraph", content: [{ type: "text", text }] }],
});

const pages = [
  {
    title: "Home",
    slug: "home",
    path: "/",
    type: "page",
    status: "published",
    seo: { title: "Ativa IT Solutions", description: "IT solutions and services." },
    blocks: [
      {
        id: "home-hero",
        type: "hero",
        variant: "image-right",
        props: {
          heading: "IT solutions that move your business forward",
          subheading: "Managed IT, cloud, and security for growing teams.",
          image: { mediaId: "placeholder-home-hero" },
          cta: { label: "Get a quote", href: "/contact-us/" },
        },
      },
      {
        id: "home-intro",
        type: "richText",
        props: { content: richTextDoc("We help businesses run reliable, secure technology.") },
      },
      {
        id: "home-cta",
        type: "ctaBanner",
        props: {
          heading: "Ready to get started?",
          text: "Talk to our team about your IT needs.",
          cta: { label: "Contact us", href: "/contact-us/" },
        },
      },
    ],
    draftBlocks: [],
  },
  {
    title: "SEO Agency in Los Angeles",
    slug: "seo-agency-in-los-angeles",
    path: "/seo-agency-in-los-angeles/",
    type: "service_location",
    status: "published",
    seo: {
      title: "SEO Agency in Los Angeles | Ativa",
      description: "SEO services for Los Angeles businesses.",
    },
    blocks: [
      {
        id: "la-hero",
        type: "hero",
        variant: "image-left",
        props: {
          heading: "SEO Agency in Los Angeles",
          subheading: "Rank higher and win more local customers.",
          image: { mediaId: "placeholder-la-hero" },
          cta: { label: "Get a free audit", href: "/contact-us/" },
        },
      },
      {
        id: "la-intro",
        type: "richText",
        props: {
          content: richTextDoc("Our Los Angeles SEO team helps local businesses grow organic traffic."),
        },
      },
    ],
    draftBlocks: [],
  },
];

const client = new MongoClient(uri);
try {
  await client.connect();
  const db = client.db(dbName);
  const col = db.collection("pages");
  await col.createIndex({ path: 1 }, { unique: true });
  for (const page of pages) {
    await col.updateOne({ path: page.path }, { $set: page }, { upsert: true });
    console.log(`seeded ${page.path}`);
  }
  console.log(`Done. Seeded ${pages.length} pages into ${dbName}.`);
} finally {
  await client.close();
}
