import Header from "@/components/header";
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const socials = [
  { label: "GitHub", href: "https://github.com/Furqankhanzada", Icon: GitHubLogoIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-furqan-khanzada", Icon: LinkedInLogoIcon },
  { label: "X", href: "https://x.com/Furqankhanzada1", Icon: TwitterLogoIcon },
];

const work = [
  {
    name: "Hamara Hisaab",
    description:
      "Self-hosted household finance ledger — budgets, qarz, zakat and a portfolio with PSX & MUFAP price tracking. API-first, so every feature is usable by AI agents over MCP or REST.",
    links: [{ label: "GitHub", href: "https://github.com/Furqankhanzada/hamara-hisaab" }],
  },
  {
    name: "SuqyaTech",
    description:
      "RO water plant delivery management system built on PayloadCMS — customers, deliveries and billing for a live plant.",
    links: [
      { label: "Live", href: "https://ldw.furqan.codes/admin" },
      { label: "GitHub", href: "https://github.com/Furqankhanzada/water-plant" },
    ],
  },
  {
    name: "ExploreBTK",
    description:
      "React Native directory app for discovering places, in production on Android and iOS.",
    links: [
      { label: "Live", href: "https://explorebtk.com" },
      { label: "GitHub", href: "https://github.com/Furqankhanzada/BTK-Finder" },
    ],
  },
  {
    name: "Flutter eCommerce UI Kit",
    description: "Free and open-source Flutter e-commerce UI kit. 476 stars on GitHub.",
    links: [{ label: "GitHub", href: "https://github.com/Furqankhanzada/flutter_eCommerce_ui_kit" }],
  },
];

const skills = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "PHP"] },
  { group: "Frameworks", items: ["React", "React Native", "Next.js", "Expo", "NestJS", "Meteor", "WordPress"] },
  { group: "UI", items: ["Tailwind CSS", "shadcn/ui", "Aceternity UI", "Bootstrap", "MUI"] },
  { group: "Databases", items: ["MongoDB", "MySQL", "Postgres"] },
  { group: "DevOps", items: ["Linux", "Git", "GitHub Actions", "Docker", "AWS"] },
  { group: "Other", items: ["GraphQL", "REST APIs", "PayloadCMS", "Figma to Code"] },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1400px] px-6 sm:px-8">
        <section className="mt-24 mb-32 max-w-3xl sm:mt-36">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">
            Hey 👋 <br />
            I&apos;m Muhammad Furqan
          </h1>
          <p className="mt-6 text-xl leading-7 text-muted-foreground">
            I am a full-stack developer with extensive experience in building mobile and web applications from concept to deployment.
          </p>
          <div className="mt-5 -ml-2">
            {socials.map(({ label, href, Icon }) => (
              <Button key={label} variant="ghost" size="icon" asChild>
                <Link href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon className="h-[1.2rem] w-[1.2rem]" />
                </Link>
              </Button>
            ))}
          </div>
        </section>

        <section id="work" className="mb-32 scroll-mt-20">
          <h2 className="text-3xl font-bold tracking-tight">Selected work</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {work.map(({ name, description, links }) => (
              <div key={name} className="rounded-lg border border-border p-6">
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="mt-2 text-muted-foreground">{description}</p>
                <div className="mt-4 flex gap-4">
                  {links.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium underline underline-offset-4"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="mb-32 scroll-mt-20">
          <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            {skills.map(({ group, items }) => (
              <div key={group}>
                <dt className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  {group}
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="rounded-md bg-secondary px-2.5 py-1 text-sm text-secondary-foreground">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mb-32">
          <h2 className="text-3xl font-bold tracking-tight">Education</h2>
          <p className="mt-6 font-medium">Bachelor&apos;s Degree in Computer Science</p>
          <p className="text-muted-foreground">
            Federal Urdu University of Arts, Sciences &amp; Technology · 2011 – 2015
          </p>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-[1400px] px-6 pb-10 sm:px-8">
        <p className="text-sm text-muted-foreground">
          Karachi, Pakistan ·{" "}
          <Link
            href="https://www.upwork.com/fl/muhammadf447"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            Available on Upwork
          </Link>
        </p>
      </footer>
    </>
  );
}
