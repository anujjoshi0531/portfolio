import { getProject } from "@/lib/server/notion";
import AboutClient from "./AboutClient";

export default async function AboutSection() {
  const projects = await getProject();
  const totalProjects = projects?.length || 0;

  return <AboutClient totalProjects={totalProjects} />;
}
