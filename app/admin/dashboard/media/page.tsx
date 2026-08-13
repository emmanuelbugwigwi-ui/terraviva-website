"use client";

import { useEffect, useState, type ChangeEvent } from "react";
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
import type { MediaItem } from "@/types/content";

export default function MediaLibraryPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // TODO: once real Firebase keys are in .env.local, this list updates
    // live the moment a file is uploaded or removed — no refresh needed.
    const mediaQuery = query(collection(db, "media"), orderBy("uploadedAt", "desc"));
    const unsubscribe = onSnapshot(
      mediaQuery,
      (snap) => {
        setItems(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<MediaItem, "id">) }))
        );
      },
      () => {
        // Placeholder Firebase keys — Firestore isn't reachable yet.
      }
    );
    return unsubscribe;
  }, []);

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const result = await uploadToCloudinary(file);
      await addDoc(collection(db, "media"), {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        format: result.format,
        uploadedAt: Date.now(),
      });
    } catch {
      setError(
        "Upload failed — check that Cloudinary and Firebase keys are set up in .env.local."
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleDelete(id: string) {
    // Note: this removes the record from Firestore (so it disappears from
    // the site), but not the underlying file from Cloudinary. Deleting from
    // Cloudinary itself requires a signed request using your API secret,
    // which must never be exposed in client-side code — that needs a small
    // server route later, or manual deletion in the Cloudinary dashboard.
    await deleteDoc(doc(db, "media", id));
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-dark-gray">
        Media library
      </h1>
      <p className="mt-2 text-sm text-dark-gray/70">
        Upload images, video, audio, or documents. For most video, pasting a
        YouTube or Vimeo link into a content field is faster and free — save
        uploads here for anything that truly needs hosting.
      </p>

      <label className="mt-6 inline-block cursor-pointer rounded-md bg-cta-orange px-6 py-2 font-heading text-sm font-medium text-white transition hover:opacity-90">
        {uploading ? "Uploading..." : "Upload file"}
        <input type="file" onChange={handleUpload} disabled={uploading} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5">
            {item.resourceType === "image" ? (
              // Plain <img> is used here deliberately — this is an internal
              // admin tool, not the public site, so Next's Image optimization
              // isn't necessary and would need extra config for the
              // Cloudinary domain.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.url} alt="" className="h-24 w-full rounded-md object-cover" />
            ) : (
              <div className="flex h-24 w-full items-center justify-center rounded-md bg-soft-gray text-xs font-medium text-dark-gray/60">
                {item.format.toUpperCase()}
              </div>
            )}
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block truncate text-xs text-deep-blue hover:underline"
            >
              View file
            </a>
            <button
              onClick={() => handleDelete(item.id)}
              className="mt-1 text-xs text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
