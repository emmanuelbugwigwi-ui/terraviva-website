"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import type { Project, ProjectMedia } from "@/types/content";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const projectsQuery = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      projectsQuery,
      (snap) => {
        setProjects(
          snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<Project, "id">),
          }))
        );
      },
      () => {
        // Placeholder Firebase keys — Firestore isn't reachable yet.
      }
    );
    return unsubscribe;
  }, []);

  function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(e.target.files ?? []));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setSaving(true);
    setError("");

    try {
      const media: ProjectMedia[] = [];
      for (const file of files) {
        const result = await uploadToCloudinary(file);
        media.push({ url: result.secure_url, resourceType: result.resource_type });
      }

      await addDoc(collection(db, "projects"), {
        title: title.trim(),
        description: description.trim(),
        media,
        createdAt: Date.now(),
      });

      setTitle("");
      setDescription("");
      setFiles([]);
      (document.getElementById("project-files") as HTMLInputElement | null)?.value &&
        ((document.getElementById("project-files") as HTMLInputElement).value = "");
    } catch {
      setError(
        "Could not save the project — check that Cloudinary and Firebase keys are set up in .env.local."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await deleteDoc(doc(db, "projects", id));
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-dark-gray">Projects</h1>
      <p className="mt-2 text-sm text-dark-gray/70">
        Post a project with a description and photos or videos. It appears
        instantly on the public Projects section of the website.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
      >
        <div>
          <label className="text-sm font-medium text-dark-gray">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm"
            placeholder="e.g. Clean Water for Kigoma Villages"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-dark-gray">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm"
            placeholder="What is this project about, who does it help, and what has been done so far?"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-dark-gray">
            Photos / videos (optional, multiple allowed)
          </label>
          <input
            id="project-files"
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFiles}
            className="mt-1 block text-sm"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-cta-orange px-6 py-2 font-heading text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Posting..." : "Post project"}
        </button>
      </form>

      <div className="mt-10 space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-start justify-between gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5"
          >
            <div>
              <p className="font-heading font-semibold text-dark-gray">{project.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-dark-gray/70">
                {project.description}
              </p>
              <p className="mt-1 text-xs text-dark-gray/50">
                {project.media.length} media file(s)
              </p>
            </div>
            <button
              onClick={() => handleDelete(project.id)}
              className="shrink-0 text-xs text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
