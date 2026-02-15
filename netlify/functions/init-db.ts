import { Config } from '@netlify/functions';
import { initializeDatabase } from './db';

/**
 * Initialize Neon database tables
 * Run once at the start: GET /.netlify/functions/init-db
 */

export default async (req: Request) => {
  try {
    // Optional: Add authentication check here
    // if (!req.headers.get('Authorization')) {
    //   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    // }

    console.log('🚀 Initializing database...');
    await initializeDatabase();
    
    return new Response(
      JSON.stringify({
        success: true,
        message: '✅ Database initialized successfully!',
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: String(error),
        message: 'Failed to initialize database',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

export const config: Config = {
  path: '/.netlify/functions/init-db',
};
