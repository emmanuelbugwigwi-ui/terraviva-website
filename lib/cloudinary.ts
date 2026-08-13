// ---------------------------------------------------------------------
// TODO: Replace with your real Cloudinary cloud name and an UNSIGNED
// upload preset.
//   1. Cloud name: Cloudinary Console → Dashboard (top of the page)
//   2. Upload preset: Cloudinary Console → Settings → Upload →
//      "Upload presets" → Add upload preset → set "Signing Mode" to
//      "Unsigned" → save, then copy its name here.
//
// An unsigned preset is what lets the admin's browser upload files
// directly to Cloudinary without exposing your API secret in the code.
// ---------------------------------------------------------------------
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "YOUR_CLOUD_NAME";
const UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "YOUR_UPLOAD_PRESET";

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: string; // "image" | "video" | "raw"
  format: string;
  bytes: number;
}

/**
 * Uploads a single file (image, video, audio, or document) straight from
 * the browser to Cloudinary. Works for any file type because it uses
 * Cloudinary's "auto" resource type detection.
 */
export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(url, { method: "POST", body: formData });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.error?.message ?? "Cloudinary upload failed");
  }

  return response.json();
}
