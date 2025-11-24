import { FaCertificate, FaCode } from "react-icons/fa6";
import { perkData } from "@/lib/data";
import { Perk, PerkAnimation, PerkSkeleton } from "@/components/global/perk";
import { useEffect, useState, useRef } from "react";

// Helper function to fetch with timeout
async function fetchWithTimeout(url: string, timeout: number = 5000): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { 
      signal: controller.signal,
      next: { revalidate: 3600 }
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.warn(`Request to ${url} timed out after ${timeout}ms`);
    }
    return null;
  }
}

export default function PerkSection() {
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<string, PerkRating>>({});
  const [totalProjects, setTotalProjects] = useState(0);
  const experienceYears = new Date().getFullYear() - 2022;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Only fetch when section is visible (defer loading)
    if (hasLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasLoaded) {
          setHasLoaded(true);
          fetchData();
        }
      },
      { rootMargin: '100px' } // Start loading 100px before section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasLoaded]);

  async function fetchData() {
    try {
      // Fetch projects first (faster, local API)
      const projectsRes = await fetch("/api/project", {
        headers: {
          'Cache-Control': 'max-age=3600',
        },
      }).then((res) => res.json()).catch(() => []);
      setTotalProjects(projectsRes?.length || 0);

      // Fetch ratings with timeout (slow external APIs) - don't block rendering
      const ratingPromises = perkData.map((perk) =>
        fetchWithTimeout(
          `${process.env.NEXT_PUBLIC_CONTEST_API}/${perk.platform}?username=${perk.username}`,
          5000 // 5 second timeout
        )
      );

      // Don't wait for all ratings - update as they come in
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
    </div>
  );
}
