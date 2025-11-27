import { searchPages } from "@/lib/server/notion";
export const revalidate = 3600;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await searchPages(body);
    return Response.json(res);
  } catch (error) {
    console.error('Error in search-notion:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export async function GET() {
  try {
    const res = await searchPages({});
    return Response.json(res);
  } catch (error) {
    console.error('Error in search-notion (GET):', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
