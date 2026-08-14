"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Project } from "@/types/content";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const projectsQuery = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      projectsQuery,
      (snap) => {
        setProjects(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Project, "id">) }))
        );
      },
      () => {
        // Firestore not reachable yet — section simply stays empty.
      }
    );
    return unsubscribe;
  }, []);

  return (
    <section id="projects" className="bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.3em] text-cta-orange">
          <span className="h-px w-8 bg-cta-orange" />
          Our work
        </p>
        <h2 className="font-heading text-3xl font-semibold text-dark-gray sm:text-4xl">
          Projects
        </h2>

        {projects.length === 0 ? (
          <p className="mt-8 text-sm text-dark-gray/60">
            No projects have been posted yet. Check back soon.
          </p>
        ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const cover = project.media[0];
            return (
              <article
                key={project.id}
                className="overflow-hidden rounded-2xl bg-soft-gray shadow-sm ring-1 ring-black/5"
              >
                {cover ? (
                  cover.resourceType === "video" ? (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video
                      src={cover.url}
                      controls
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cover.url}
                      alt={project.title}
                      className="h-48 w-full object-cover"
                    />
                  )
                ) : (
                  <div className="flex h-48 w-full items-center justify-center bg-forest-green/10 font-heading text-sm text-forest-green">
                    Terraviva
                  </div>
                )}

                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-dark-gray">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-4 text-sm text-dark-gray/75">
                    {project.description}
                  </p>

                  {project.media.length > 1 && (
                    <div className="mt-4 flex gap-2 overflow-x-auto">
                      {project.media.slice(1, 5).map((m, i) =>
                        m.resourceType === "video" ? (
                          <video
                            key={i}
                            src={m.url}
                            className="h-14 w-14 shrink-0 rounded-md object-cover"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={i}
                            src={m.url}
                            alt=""
                            className="h-14 w-14 shrink-0 rounded-md object-cover"
                          />
                        )
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}
