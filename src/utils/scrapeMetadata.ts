/**
 * Scrapes metadata from a website URL
 * Uses Open Graph and other meta tags to extract project information
 */

export interface ScrapedMetadata {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

export async function scrapeWebsiteMetadata(url: string): Promise<ScrapedMetadata> {
  try {
    // Validate URL
    const urlObj = new URL(url);
    
    // Use a CORS proxy or fetch directly
    // For production, you might want to use a service like:
    // - https://www.linkpreview.net/
    // - https://microlink.io/
    // - Your own backend endpoint
    
    const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    if (!data.data) {
      throw new Error('Unable to fetch metadata');
    }

    const metadata = data.data;
    
    // Extract technologies from the page (common patterns)
    const technologies = extractTechnologies(metadata);

    return {
      title: metadata.title || 'Untitled Project',
      description: metadata.description || 'Project website',
      image: metadata.image?.url || metadata.logo?.url || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600',
      technologies,
      link: url,
    };
  } catch (error) {
    console.error('Error scraping metadata:', error);
    
    // Fallback: Return minimal data
    return {
      title: 'Project Website',
      description: 'Website added from link',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600',
      technologies: [],
      link: url,
    };
  }
}

/**
 * Extract likely technologies from metadata and page content
 */
function extractTechnologies(metadata: any): string[] {
  const commonTechs = [
    'React', 'Vue', 'Angular', 'Next.js', 'Nuxt', 'Svelte',
    'Node.js', 'Express', 'Django', 'Flask', 'Laravel', 'Symfony',
    'TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Go', 'Rust',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
    'Tailwind', 'Bootstrap', 'Material-UI', 'GraphQL', 'REST',
  ];

  const technologies: string[] = [];
  const text = JSON.stringify(metadata).toLowerCase();

  // Search for technology mentions in metadata
  for (const tech of commonTechs) {
    if (text.includes(tech.toLowerCase())) {
      technologies.push(tech);
    }
  }

  // If no technologies found, return some defaults based on the website
  if (technologies.length === 0) {
    return ['Web', 'Frontend', 'Modern Stack'];
  }

  return Array.from(new Set(technologies)).slice(0, 5); // Return unique, max 5
}

/**
 * Alternative: Manual metadata extraction by parsing HTML
 * This is a fallback if the API fails
 */
export async function scrapeWebsiteMetadataManual(url: string): Promise<ScrapedMetadata> {
  try {
    // This would require CORS proxy or backend
    const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
    const response = await fetch(proxyUrl);
    const html = await response.text();
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract Open Graph tags
    const getMetaTag = (name: string) => {
      return doc.querySelector(`meta[property="${name}"]`)?.getAttribute('content') ||
             doc.querySelector(`meta[name="${name}"]`)?.getAttribute('content') ||
             '';
    };

    return {
      title: getMetaTag('og:title') || doc.title || 'Project',
      description: getMetaTag('og:description') || getMetaTag('description') || 'Project website',
      image: getMetaTag('og:image') || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600',
      technologies: extractTechnologiesFromHTML(html),
      link: url,
    };
  } catch (error) {
    console.error('Error in manual scraping:', error);
    throw error;
  }
}

function extractTechnologiesFromHTML(html: string): string[] {
  const commonTechs = [
    'React', 'Vue', 'Angular', 'Next.js', 'Nuxt',
    'Node.js', 'Express', 'Django', 'Flask',
    'TypeScript', 'JavaScript', 'Python',
    'MongoDB', 'PostgreSQL', 'Firebase',
    'Tailwind', 'Bootstrap', 'Material-UI',
  ];

  const technologies: string[] = [];
  const text = html.toLowerCase();

  for (const tech of commonTechs) {
    if (text.includes(tech.toLowerCase())) {
      technologies.push(tech);
    }
  }

  return Array.from(new Set(technologies)).slice(0, 5);
}
