import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal & Policies",
  description:
    "Terms and policies for the Greylan James official website, operated by Borchetta Entertainment Group, LLC and its affiliates.",
  alternates: { canonical: "https://greylanjames.com/legal" },
  robots: { index: false, follow: true },
};

const POLICIES = [
  {
    href: "/legal/terms",
    title: "Terms & Conditions",
    blurb: "The terms governing your use of the site, including arbitration, liability and dispute resolution.",
  },
  {
    href: "/legal/privacy",
    title: "Privacy & Cookies Policy",
    blurb: "How we collect, use and share your personal data, and how cookies and similar technologies are used.",
  },
  {
    href: "/legal/dmca",
    title: "Copyright Infringement Policy (DMCA)",
    blurb: "How to submit a copyright infringement notice and our counter-notification procedure.",
  },
  {
    href: "/legal/cybersecurity",
    title: "Cybersecurity Disclaimer",
    blurb: "Our security practices and the disclaimers that apply to security incidents.",
  },
  {
    href: "/legal/tcpa",
    title: "TCPA Consent & Do Not Call Policy",
    blurb: "Consent to telephone and text communications, and how to opt out or join our suppression list.",
  },
] as const;

export default function LegalHubPage() {
  return (
    /* Extra bottom padding covers what the footer's tear takes. See the
       spacing note in globals.css. */
    <section data-bg="primary" className="bg-background-primary px-5 pt-28 pb-24 md:pb-[136px] lg:px-12">
      <div className="mx-auto max-w-[820px]">
        <h1 className="text-[34px] md:text-[48px]" style={{ color: "var(--text-accent)" }}>
          Legal &amp; Policies
        </h1>
        <p className="mt-4 font-body text-[17px] leading-[1.7] text-text-accent/80 md:text-[18px]">
          The terms and policies that apply to this website. If you have any questions, the contact details are
          listed within each policy.
        </p>

        <ul className="mt-10 flex flex-col gap-4">
          {POLICIES.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="group block border border-text-body/20 px-6 py-5 transition-colors duration-200 hover:border-text-body/50"
              >
                <span className="font-display text-[22px] text-text-accent md:text-[26px]">{p.title}</span>
                <span className="mt-1 block font-body text-[15px] leading-[1.6] text-text-accent/70 md:text-base">{p.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
