import { getProjects } from "@/lib/server/local-content";
import AboutClient from "./AboutClient";

export default async function AboutSection() {
  const projects = getProjects();
  const totalProjects = projects?.length || 0;

  return <AboutClient totalProjects={totalProjects} />;
}
