import { getTestimonials } from "@/lib/notion";
export const revalidate = 3600;

export async function GET() {
    try {
        const res = await getTestimonials();
        return Response.json(res, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('Error in testimonial API:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
