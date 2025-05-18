// app/robots.txt/route.ts
export async function GET() {
    const body = `User-agent: *
  Allow: /
  
  Sitemap: https://toolnier.com/sitemap.xml
  `;
  
    return new Response(body, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }