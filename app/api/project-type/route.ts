import { getProjectType } from "@/lib/server/notion";
export const revalidate = 3600;

export async function GET() {
    try {
        const res = await getProjectType();
        return Response.json(res);
    } catch (error) {
        console.error('Error in project-type API:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
