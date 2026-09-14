import { permanentRedirect } from "next/navigation";

export default function AlgorithmsPage() {
  permanentRedirect("/blog?blogsFilter=visualizers");
}
