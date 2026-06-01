import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Enforce POST method rules
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Validate incoming security keys
  const clientApiKey = req.headers['x-api-key'];
  const serverApiKey = process.env.VITE_CONTACT_API_KEY;

  if (serverApiKey && clientApiKey !== serverApiKey) {
    return res.status(401).json({ error: 'Unauthorized access token' });
  }

  try {
    const { firstName, lastName, email, message, metadata } = req.body;

    // 3. Fallback validation checks
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Missing required payload parameters' });
    }

    // 4. Automated Database Table Safeguard
    // Ensures the table exists in your Neon Postgres storage cluster
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        metadata JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 5. Secure SQL parameter execution
    // Safely writes form inputs using parameterized values to completely prevent SQL injection
    await sql`
      INSERT INTO contact_submissions (first_name, last_name, email, message, metadata)
      VALUES (${firstName}, ${lastName}, ${email}, ${message}, ${metadata ? JSON.stringify(metadata) : null});
    `;


    // 6. Success Response back to Service Worker queue flushing
    return res.status(200).json({
      success: true,
      message: 'Submission successfully stored in Lubbock Hub Central database.',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Serverless Ingestion Error:', error);
    return res.status(500).json({ error: 'Internal server error processing payload' });
  }
}
