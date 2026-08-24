export interface ReviewLocation {
  id: string;
  name: string;
  url: string;
}

export interface PartnerData {
  businessName: string;
  location: ReviewLocation | null;
}

export type Mood = 1 | 2 | 3 | 4 | 5;

export type Language = 'english' | 'hindi' | 'hinglish';

export interface Template {
  id: string;
  name: string;
  text: (businessName: string, link: string) => string;
}

export interface BrandConfig {
  name: string;
  url: string;
}

export type BrandCodeMap = Record<string, BrandConfig>;
