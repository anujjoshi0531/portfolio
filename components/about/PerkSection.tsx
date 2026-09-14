import { Award, Code2 } from "lucide-react";
import { perkData } from "@/lib/client/data";
import { Perk, PerkAnimation } from '@/components/global/Perk';
import { useCallback, useEffect, useState, useRef } from "react";
import { clientConfig } from "@/lib/config/client";

interface PerkSectionProps {
  totalProjects: number;
}

export default function PerkSection({ totalProjects }: PerkSectionProps) {
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<string, PerkRating>>({});
  const experienceYears = new Date().getFullYear() - 2022;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const ratingPromises = perkData.map((perk) =>
        fetch(
          `${clientConfig.CONTEST_API}/${perk.platform}?username=${perk.username}`,
          { next: { revalidate: 3600 } }
        )
          .then((res) => {
            if (!res.ok) return null;
            return res.json();
          })
          .catch((err) => {
            console.error(`Error fetching ${perk.platform}:`, err);
            return null;
          })
      );

      const results = await Promise.allSettled(ratingPromises);
      const fetchedRatings = perkData.reduce((acc, perk, idx) => {
        const result = results[idx];
        if (result.status === 'fulfilled' && result.value) {
          acc[perk.platform.toLowerCase()] = result.value;
        }
        return acc;
      }, {} as Record<string, PerkRating>);
      setRatings(fetchedRatings);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

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
  }, [fetchData, hasLoaded]);

  return (
    <div ref={sectionRef}>
      <PerkAnimation className="grid grid-cols-1 sm:grid-cols-2">
        <Perk value={totalProjects} title="Projects Completed" icon={Code2} />
        <Perk
          value={experienceYears}
          title="Years of Experience"
          icon={Award}
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
