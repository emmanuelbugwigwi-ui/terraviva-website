export interface MediaItem {
  id: string;
  url: string;
  publicId: string;
  resourceType: string; // "image" | "video" | "raw" (audio and documents come through as "video" or "raw")
  format: string;
  uploadedAt: number; // epoch ms
}

export interface ImpactStat {
  label: string;
  value: number;
}

export interface Partner {
  name: string;
  location: string;
}

export interface Program {
  title: string;
  description: string;
  items: string[];
}

export interface AboutContent {
  aboutHeading: string;
  aboutIntroParagraph1: string;
  aboutIntroParagraph2: string;
  missionText: string;
  visionText: string;
  approachText: string;
  whoWeServe: string[];
  whereWeWorkText: string;
  districts: string[];
  expansionText: string;
  researchText: string;
  partnershipsIntroText: string;
  partners: Partner[];
  collaborationText: string;
  joinUsText: string;
}

export interface HomepageContent extends AboutContent {
  heroHeadline: string;
  heroSubheadline: string;
  impactStats: ImpactStat[];
  programsHeading: string;
  programsSubheading: string;
  programs: Program[];
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  updatedAt: number;
}
