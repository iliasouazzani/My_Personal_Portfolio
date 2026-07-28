export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string[];
  tags?: string[];
  type: 'internship' | 'hackathon' | 'volunteering' | 'freelance';
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  link?: string;
  tags: string[];
  highlights: string[];
}

export interface Skill {
  name: string;
  category: 'technical' | 'soft';
  icon?: string;
}

export interface VolunteerEvent {
  id: string;
  event: string;
  location: string;
  date: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  name: string;
  tagline: string;
  summary: string;
  contact: {
    email: string;
    phone: string;
  };
  languages: { name: string; level: string }[];
  links: SocialLink[];
  experiences: Experience[];
  education: { degree: string; institution?: string; period: string }[];
  skills: Skill[];
  volunteering: VolunteerEvent[];
  contentStats: {
    followers: number;
    views: number;
    platform: string;
    handle: string;
    growthPeriod: string;
  };
}
