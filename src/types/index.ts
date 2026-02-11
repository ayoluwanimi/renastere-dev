export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  linkedin?: string;
  twitter?: string;
  projects: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SiteImages {
  logo: string;
  heroBackground: string;
  aboutBackground: string;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
  };
  services: Service[];
  projects: Project[];
  team: TeamMember[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  footer: {
    copyright: string;
    tagline: string;
  };
  images: SiteImages;
}

export interface User {
  email: string;
  isAdmin: boolean;
}
