import { getEducation } from "@/lib/notion";
export const revalidate = 3600;

export async function GET() {
    try {
        const res = await getEducation();
        return Response.json(res);
    } catch (error) {
        console.error('Error in education API:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
