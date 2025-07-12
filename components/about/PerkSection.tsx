import { FaCertificate, FaCode } from "react-icons/fa6";
import { perkData } from "@/lib/data";
import { Perk, PerkAnimation, PerkSkeleton } from "@/components/global/perk";
import { useEffect, useState } from "react";


export default function PerkSection() {
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<string, PerkRating>>({});
  const [totalProjects, setTotalProjects] = useState(0);
  const experienceYears = new Date().getFullYear() - 2022;

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, ...ratingRes] = await Promise.all([
          fetch("/api/project").then((res) => res.json()),
          ...perkData.map((perk) =>
            fetch(
              `${process.env.NEXT_PUBLIC_CONTEST_API}/${perk.platform}?username=${perk.username}`,
              { next: { revalidate: 3600 } }
            )
              .then((res) => res.json())
              .catch(() => null)
          ),
        ]);

        const fetchedRatings = perkData.reduce((acc, perk, idx) => {
          acc[perk.platform.toLowerCase()] = ratingRes[idx];
          return acc;
        }, {} as Record<string, PerkRating>);

        setRatings(fetchedRatings);
        setTotalProjects(projectsRes?.length || 0);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setRatings({});
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <PerkAnimation className="grid grid-cols-1 sm:grid-cols-2">
          <PerkSkeleton />
          <PerkSkeleton />
        </PerkAnimation>
        <PerkAnimation className="grid sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <PerkSkeleton key={i} />
          ))}
        </PerkAnimation>
      </>
    );
  }

  return (
    <>
      <PerkAnimation className="grid grid-cols-1 sm:grid-cols-2">
        <Perk value={totalProjects} title="Projects Completed" icon={FaCode} />
        <Perk
          value={experienceYears}
          title="Years of Experience"
          icon={FaCertificate}
        />
      </PerkAnimation>
      <PerkAnimation className="grid sm:grid-cols-2 lg:grid-cols-5">
        {perkData.map(({ platform, icon, link }) => (
          <Perk
            key={platform}
            link={link}
            value={ratings[platform.toLowerCase()]?.rating ?? "NA"}
            title={platform}
            subtitle={ratings[platform.toLowerCase()]?.level}
            icon={icon}
          />
        ))}
      </PerkAnimation>
    </>
  );
}
