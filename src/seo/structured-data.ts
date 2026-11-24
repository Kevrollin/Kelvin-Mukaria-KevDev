/**
 * schema.org JSON-LD for the homepage, emitted as a single @graph so every entity is defined once
 * and cross-referenced by @id (no duplicated or conflicting Person nodes).
 *
 *   WebSite ──publisher──▶ Person ◀──mainEntity── ProfilePage ──hasPart──▶ ItemList (projects)
 *                             │  ▲                                              │
 *                       worksFor  founder                                  creator
 *                             ▼  │                                              │
 *                          Organization (Ardena)          CreativeWork ×N ──────┘
 *
 * Only facts visible on the page are used. Projects are `CreativeWork`, not `SoftwareApplication`:
 * Google's SoftwareApplication rich result requires price offers and ratings, which these projects
 * don't have and which must never be invented.
 */
import { absoluteUrl, profiles, site, SITE_URL } from "../config/site";
import { projects } from "../data/projects";

const HOME = absoluteUrl("/");
export const ids = {
  website: `${SITE_URL}/#website`,
  person: `${SITE_URL}/#person`,
  page: HOME,
  projects: `${SITE_URL}/#projects`,
  organization: `${site.organization.url}#organization`,
} as const;

type JsonLd = Record<string, unknown>;

export function homeStructuredData({ dateModified }: { dateModified?: string } = {}): JsonLd {
  const ref = (id: string) => ({ "@id": id });

  const website: JsonLd = {
    "@type": "WebSite",
    "@id": ids.website,
    url: HOME,
    name: site.name,
    alternateName: [`${site.name} Portfolio`, site.alternateName],
    description: site.description,
    inLanguage: site.language,
    publisher: ref(ids.person),
  };

  const profilePage: JsonLd = {
    "@type": "ProfilePage",
    "@id": ids.page,
    url: HOME,
    name: site.title,
    description: site.description,
    inLanguage: site.language,
    isPartOf: ref(ids.website),
    mainEntity: ref(ids.person),
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(site.ogImage.path),
      width: site.ogImage.width,
      height: site.ogImage.height,
    },
    hasPart: ref(ids.projects),
    ...(dateModified ? { dateModified } : {}),
  };

  const person: JsonLd = {
    "@type": "Person",
    "@id": ids.person,
    name: site.name,
    alternateName: site.alternateName,
    url: HOME,
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(site.avatar.path),
      width: site.avatar.width,
      height: site.avatar.height,
    },
    jobTitle: site.jobTitle,
    description: site.summary,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    address: site.locations.map((l) => ({
      "@type": "PostalAddress",
      addressLocality: l.locality,
      addressRegion: l.region,
      addressCountry: site.country.code,
    })),
    knowsAbout: site.knowsAbout,
    worksFor: ref(ids.organization),
    sameAs: Object.values(profiles),
  };

  const organization: JsonLd = {
    "@type": "Organization",
    "@id": ids.organization,
    name: site.organization.name,
    alternateName: site.organization.alternateName,
    url: site.organization.url,
    description: site.organization.description,
    founder: ref(ids.person),
  };

  const projectList: JsonLd = {
    "@type": "ItemList",
    "@id": ids.projects,
    name: `Selected projects by ${site.name}`,
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.name,
        description: p.description,
        image: absoluteUrl(p.image),
        keywords: p.tags.join(", "),
        creator: ref(ids.person),
        ...(p.demo ?? p.github ? { url: p.demo ?? p.github } : {}),
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [website, profilePage, person, organization, projectList],
  };
}
