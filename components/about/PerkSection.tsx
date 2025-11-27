import { FaCertificate, FaCode } from "react-icons/fa6";
import { perkData } from "@/lib";
import { Perk, PerkAnimation, PerkSkeleton } from "@/components/global/perk";
import { useEffect, useState, useRef } from "react";

export default function PerkSection() {
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<string, PerkRating>>({});
  const [totalProjects, setTotalProjects] = useState(0);
  const experienceYears = new Date().getFullYear() - 2022;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (hasLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasLoaded) {
          setHasLoaded(true);
          fetchData();
        }
      },
      { rootMargin: '100px' }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasLoaded]);

  async function fetchData() {
    try {
      const projectsRes = await fetch("/api/project", {
        headers: {
          'Cache-Control': 'max-age=3600',
        },
      }).then((res) => res.json()).catch((err) => {
        console.error("Error fetching projects:", err);
        return [];
      });
      setTotalProjects(projectsRes?.length || 0);

      const ratingPromises = perkData.map((perk) =>
        fetch(
          `${process.env.NEXT_PUBLIC_CONTEST_API}/${perk.platform}?username=${perk.username}`,
          { next: { revalidate: 3600 } }
        )
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
          })
          .catch((err) => {
            console.error(`Error fetching ${perk.platform}:`, err);
            return null;
          })
      );

      Promise.allSettled(ratingPromises).then((results) => {
        const fetchedRatings = perkData.reduce((acc, perk, idx) => {
          const result = results[idx];
          if (result.status === 'fulfilled' && result.value) {
            acc[perk.platform.toLowerCase()] = result.value;
          }
          return acc;
        }, {} as Record<string, PerkRating>);
        setRatings(fetchedRatings);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div ref={sectionRef}>
      <PerkAnimation className="grid grid-cols-1 sm:grid-cols-2">
        <Perk value={totalProjects} title="Projects Completed" icon={FaCode} />
        <Perk
          value={experienceYears}
          title="Years of Experience"
          icon={FaCertificate}
        />
      </PerkAnimation>
      <PerkAnimation className="grid sm:grid-cols-2 lg:grid-cols-5">
        {perkData.map(({ platform, icon, link, level, rating }) => (
          <Perk
            key={platform}
            link={link}
            value={loading ? rating : (ratings[platform.toLowerCase()]?.rating ?? rating)}
            title={platform}
            subtitle={loading ? level : (ratings[platform.toLowerCase()]?.level ?? level)}
            icon={icon}
          />
        ))}
      </PerkAnimation>
    </div>
  );
}
