import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteContent, Project, Service, TeamMember, SiteImages } from '../types';

const defaultContent: SiteContent = {
  hero: {
    title: 'Renastere Dev',
    subtitle: 'Building Tomorrow\'s Digital Solutions Today',
    description: 'We are a team of passionate developers and designers dedicated to creating innovative digital experiences that drive business growth.',
  },
  about: {
    title: 'About Renastere Dev',
    description: 'Renastere Dev is a cutting-edge software development company founded by two visionary Co-CEOs. We specialize in creating bespoke digital solutions that transform businesses and elevate user experiences.',
    mission: 'To deliver exceptional software solutions that empower businesses to thrive in the digital age.',
    vision: 'To be the leading software development partner for innovative companies worldwide.',
  },
  images: {
    logo: '',
    heroBackground: '',
    aboutBackground: '',
  },
  services: [
    {
      id: '1',
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies like React, Next.js, and Node.js.',
      icon: 'Globe',
    },
    {
      id: '2',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile apps for iOS and Android using React Native and Flutter.',
      icon: 'Smartphone',
    },
    {
      id: '3',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive designs that enhance user engagement and drive conversions.',
      icon: 'Palette',
    },
    {
      id: '4',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and DevOps services for optimal performance.',
      icon: 'Cloud',
    },
    {
      id: '5',
      title: 'E-Commerce',
      description: 'Complete e-commerce solutions with payment integration and inventory management.',
      icon: 'ShoppingCart',
    },
    {
      id: '6',
      title: 'Consulting',
      description: 'Expert technical consulting to help you make informed technology decisions.',
      icon: 'MessageSquare',
    },
  ],
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with real-time inventory, payment processing, and analytics dashboard.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#',
      category: 'Web Development',
    },
    {
      id: '2',
      title: 'Healthcare App',
      description: 'Mobile application for patient management and telemedicine consultations.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600',
      technologies: ['React Native', 'Firebase', 'WebRTC'],
      link: '#',
      category: 'Mobile Development',
    },
    {
      id: '3',
      title: 'FinTech Dashboard',
      description: 'Real-time financial analytics dashboard with AI-powered insights and predictions.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
      technologies: ['Vue.js', 'Python', 'TensorFlow', 'AWS'],
      link: '#',
      category: 'Web Development',
    },
    {
      id: '4',
      title: 'Educational Platform',
      description: 'Interactive learning management system with video courses and progress tracking.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600',
      technologies: ['Next.js', 'PostgreSQL', 'Redis'],
      link: '#',
      category: 'Web Development',
    },
    {
      id: '5',
      title: 'Real Estate Portal',
      description: 'Property listing and management platform with virtual tours and booking system.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
      technologies: ['React', 'Express', 'MongoDB', 'Three.js'],
      link: '#',
      category: 'Web Development',
    },
    {
      id: '6',
      title: 'Fitness Tracking App',
      description: 'Comprehensive fitness app with workout plans, nutrition tracking, and social features.',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600',
      technologies: ['Flutter', 'Firebase', 'HealthKit'],
      link: '#',
      category: 'Mobile Development',
    },
  ],
  team: [
    {
      id: '1',
      name: 'Anuoluwanimi Samuel Bolarinwa',
      role: 'Co-CEO & Lead Developer',
      bio: 'Anuoluwanimi is a visionary leader with over 10 years of experience in software development. He specializes in building scalable web applications and leading development teams to success. His expertise spans full-stack development, cloud architecture, and agile methodologies.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      email: 'anuoluwanimi@renasteredev.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      projects: ['1', '2', '3'],
    },
    {
      id: '2',
      name: 'Jefferson C Uche-Okro',
      role: 'Co-CEO & Creative Director',
      bio: 'Jefferson brings a unique blend of technical expertise and creative vision to Renastere Dev. With a background in both software engineering and design, he ensures every project delivers exceptional user experiences. He leads the company\'s strategic initiatives and client relationships.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      email: 'jefferson@renasteredev.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      projects: ['4', '5', '6'],
    },
  ],
  contact: {
    email: 'hello@renasteredev.com',
    phone: '+1 (555) 123-4567',
    address: 'Lagos, Nigeria',
  },
  footer: {
    copyright: '© 2024 Renastere Dev. All rights reserved.',
    tagline: 'Building Digital Excellence',
  },
};

interface ContentContextType {
  content: SiteContent;
  updateHero: (hero: SiteContent['hero']) => void;
  updateAbout: (about: SiteContent['about']) => void;
  updateService: (service: Service) => void;
  addService: (service: Service) => void;
  deleteService: (id: string) => void;
  updateProject: (project: Project) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateTeamMember: (member: TeamMember) => void;
  updateContact: (contact: SiteContent['contact']) => void;
  updateFooter: (footer: SiteContent['footer']) => void;
  updateImages: (images: SiteImages) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    const stored = localStorage.getItem('renastere_content');
    return stored ? JSON.parse(stored) : defaultContent;
  });

  useEffect(() => {
    localStorage.setItem('renastere_content', JSON.stringify(content));
  }, [content]);

  const updateHero = (hero: SiteContent['hero']) => {
    setContent((prev) => ({ ...prev, hero }));
  };

  const updateAbout = (about: SiteContent['about']) => {
    setContent((prev) => ({ ...prev, about }));
  };

  const updateService = (service: Service) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === service.id ? service : s)),
    }));
  };

  const addService = (service: Service) => {
    setContent((prev) => ({
      ...prev,
      services: [...prev.services, service],
    }));
  };

  const deleteService = (id: string) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  const updateProject = (project: Project) => {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === project.id ? project : p)),
    }));
  };

  const addProject = (project: Project) => {
    setContent((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  const deleteProject = (id: string) => {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const updateTeamMember = (member: TeamMember) => {
    setContent((prev) => ({
      ...prev,
      team: prev.team.map((t) => (t.id === member.id ? member : t)),
    }));
  };

  const updateContact = (contact: SiteContent['contact']) => {
    setContent((prev) => ({ ...prev, contact }));
  };

  const updateFooter = (footer: SiteContent['footer']) => {
    setContent((prev) => ({ ...prev, footer }));
  };

  const updateImages = (images: SiteImages) => {
    setContent((prev) => ({ ...prev, images }));
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateHero,
        updateAbout,
        updateService,
        addService,
        deleteService,
        updateProject,
        addProject,
        deleteProject,
        updateTeamMember,
        updateContact,
        updateFooter,
        updateImages,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
