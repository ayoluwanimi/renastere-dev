import { useState, useCallback } from 'react';
import { Project } from '../types';

interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  fetchProjectById: (id: string) => Promise<Project | null>;
  createProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => Promise<Project>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<Project>;
  deleteProject: (id: string) => Promise<boolean>;
  searchProjects: (query: string) => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
}

/**
 * Hook for managing projects with Neon database
 */
export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('📥 Fetching projects from API...');
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setProjects(data);
      console.log(`✅ Fetched ${data.length} projects`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch projects';
      setError(message);
      console.error('❌ Error fetching projects:', message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProjectById = useCallback(async (id: string): Promise<Project | null> => {
    setLoading(true);
    setError(null);
    try {
      console.log(`🔍 Fetching project: ${id}`);
      const response = await fetch(`/api/projects?id=${id}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      console.log('✅ Project fetched');
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch project';
      setError(message);
      console.error('❌ Error fetching project:', message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> => {
    setLoading(true);
    setError(null);
    try {
      console.log('➕ Creating project:', project.title);
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setProjects([data, ...projects]);
      console.log('✅ Project created');
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create project';
      setError(message);
      console.error('❌ Error creating project:', message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projects]);

  const updateProject = useCallback(async (id: string, updates: Partial<Project>): Promise<Project> => {
    setLoading(true);
    setError(null);
    try {
      console.log(`✏️ Updating project: ${id}`);
      const response = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setProjects(projects.map(p => p.id === id ? data : p));
      console.log('✅ Project updated');
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update project';
      setError(message);
      console.error('❌ Error updating project:', message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projects]);

  const deleteProject = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      console.log(`🗑️ Deleting project: ${id}`);
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      setProjects(projects.filter(p => p.id !== id));
      console.log('✅ Project deleted');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete project';
      setError(message);
      console.error('❌ Error deleting project:', message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projects]);

  const searchProjects = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`🔎 Searching: "${query}"`);
      const response = await fetch(`/api/projects?search=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setProjects(data);
      console.log(`✅ Found ${data.length} results`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Search failed';
      setError(message);
      console.error('❌ Error searching:', message);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterByCategory = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`📂 Filtering by category: ${category}`);
      const response = await fetch(`/api/projects?category=${encodeURIComponent(category)}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setProjects(data);
      console.log(`✅ Found ${data.length} projects`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Filter failed';
      setError(message);
      console.error('❌ Error filtering:', message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    fetchProjectById,
    createProject,
    updateProject,
    deleteProject,
    searchProjects,
    filterByCategory,
  };
}
