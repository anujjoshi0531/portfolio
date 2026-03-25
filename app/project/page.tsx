import ProjectPage from '@/components/project/ProjectPage';

export const revalidate = 3600; // Revalidate every hour

export default async function page() {
  return <ProjectPage  />
}
