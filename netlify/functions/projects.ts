import { Config } from '@netlify/functions';
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject, getProjectsByCategory, searchProjects } from './db';

/**
 * GET /api/projects - Get all projects
 * GET /api/projects?id={id} - Get project by ID
 * GET /api/projects?category={category} - Get projects by category
 * GET /api/projects?search={query} - Search projects
 * POST /api/projects - Create new project
 * PUT /api/projects - Update project
 * DELETE /api/projects?id={id} - Delete project
 */

export default async (req: Request) => {
  try {
    const url = new URL(req.url);
    const method = req.method;

    // GET requests
    if (method === 'GET') {
      const id = url.searchParams.get('id');
      const category = url.searchParams.get('category');
      const search = url.searchParams.get('search');

      if (id) {
        const project = await getProjectById(id);
        if (!project) {
          return new Response(JSON.stringify({ error: 'Project not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        return new Response(JSON.stringify(project), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (category) {
        const projects = await getProjectsByCategory(category);
        return new Response(JSON.stringify(projects), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (search) {
        const projects = await searchProjects(search);
        return new Response(JSON.stringify(projects), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Get all projects
      const projects = await getAllProjects();
      return new Response(JSON.stringify(projects), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // POST request - Create project
    if (method === 'POST') {
      const body = await req.json();
      const project = await createProject(body);
      return new Response(JSON.stringify(project), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // PUT request - Update project
    if (method === 'PUT') {
      const body = await req.json();
      if (!body.id) {
        return new Response(JSON.stringify({ error: 'Project ID required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const project = await updateProject(body.id, body);
      return new Response(JSON.stringify(project), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // DELETE request - Delete project
    if (method === 'DELETE') {
      const id = url.searchParams.get('id');
      if (!id) {
        return new Response(JSON.stringify({ error: 'Project ID required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      await deleteProject(id);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config: Config = {
  path: '/api/projects',
};
