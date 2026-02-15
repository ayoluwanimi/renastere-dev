import { neon } from '@netlify/neon';

/**
 * Database utilities for Neon integration
 * Uses NETLIFY_DATABASE_URL environment variable automatically
 */

const sql = neon();

/**
 * Projects table schema
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  technologies: string[];
  category: string;
  project_link: string;
  created_at: string;
  updated_at: string;
}

/**
 * Users table schema
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

/**
 * Initialize database tables
 */
export async function initializeDatabase() {
  try {
    // Create projects table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url TEXT,
        technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
        category VARCHAR(100),
        project_link VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('✅ Database tables initialized');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

/**
 * Get all projects
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    console.log('📊 Fetching all projects from Neon...');
    const projects = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
    console.log(`✅ Fetched ${projects.length} projects`);
    return projects;
  } catch (error) {
    console.error('❌ Failed to fetch projects:', error);
    throw error;
  }
}

/**
 * Get project by ID
 */
export async function getProjectById(projectId: string): Promise<Project | null> {
  try {
    console.log(`🔍 Fetching project: ${projectId}`);
    const [project] = await sql`SELECT * FROM projects WHERE id = ${projectId}`;
    if (project) console.log('✅ Project found');
    return project || null;
  } catch (error) {
    console.error('❌ Failed to fetch project:', error);
    throw error;
  }
}

/**
 * Create new project
 */
export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
  try {
    console.log('➕ Creating new project:', project.title);
    const [newProject] = await sql`
      INSERT INTO projects (title, description, image_url, technologies, category, project_link)
      VALUES (${project.title}, ${project.description}, ${project.image_url}, ${project.technologies}, ${project.category}, ${project.project_link})
      RETURNING *
    `;
    console.log('✅ Project created:', newProject.id);
    return newProject;
  } catch (error) {
    console.error('❌ Failed to create project:', error);
    throw error;
  }
}

/**
 * Update project
 */
export async function updateProject(projectId: string, updates: Partial<Project>): Promise<Project> {
  try {
    console.log(`✏️ Updating project: ${projectId}`);
    
    const setClause = Object.entries(updates)
      .filter(([key]) => key !== 'id' && key !== 'created_at')
      .map(([key]) => `${key} = $${Object.keys(updates).indexOf(key) + 1}`)
      .join(', ');

    if (!setClause) {
      throw new Error('No valid fields to update');
    }

    const values = Object.entries(updates)
      .filter(([key]) => key !== 'id' && key !== 'created_at')
      .map(([, value]) => value);

    const [updatedProject] = await sql`
      UPDATE projects 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${projectId}
      RETURNING *
    `;
    
    console.log('✅ Project updated');
    return updatedProject;
  } catch (error) {
    console.error('❌ Failed to update project:', error);
    throw error;
  }
}

/**
 * Delete project
 */
export async function deleteProject(projectId: string): Promise<boolean> {
  try {
    console.log(`🗑️ Deleting project: ${projectId}`);
    await sql`DELETE FROM projects WHERE id = ${projectId}`;
    console.log('✅ Project deleted');
    return true;
  } catch (error) {
    console.error('❌ Failed to delete project:', error);
    throw error;
  }
}

/**
 * Get projects by category
 */
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  try {
    console.log(`📂 Fetching projects in category: ${category}`);
    const projects = await sql`
      SELECT * FROM projects 
      WHERE category = ${category}
      ORDER BY created_at DESC
    `;
    console.log(`✅ Found ${projects.length} projects in ${category}`);
    return projects;
  } catch (error) {
    console.error('❌ Failed to fetch projects by category:', error);
    throw error;
  }
}

/**
 * Search projects
 */
export async function searchProjects(query: string): Promise<Project[]> {
  try {
    console.log(`🔎 Searching projects: "${query}"`);
    const searchTerm = `%${query}%`;
    const projects = await sql`
      SELECT * FROM projects 
      WHERE title ILIKE ${searchTerm} 
         OR description ILIKE ${searchTerm}
      ORDER BY created_at DESC
    `;
    console.log(`✅ Found ${projects.length} matching projects`);
    return projects;
  } catch (error) {
    console.error('❌ Failed to search projects:', error);
    throw error;
  }
}
