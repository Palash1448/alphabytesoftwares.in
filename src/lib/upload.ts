/**
 * Compresses an image file using Canvas.
 * Limits size and lowers quality to save bandwidth and storage space.
 */
export function compressImage(file: File, maxWidth = 1000, maxHeight = 1000, quality = 0.75): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate scaling
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file); // Fallback to original
            }
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}

/**
 * Compresses an image file and uploads it to Cloudinary.
 * Falls back to Base64 data URL if Cloudinary upload fails.
 */
export async function uploadImage(file: File): Promise<string> {
  // Compress image first to keep file sizes low
  let compressedFile = file;
  if (file.type.startsWith("image/")) {
    try {
      compressedFile = await compressImage(file);
    } catch (e) {
      console.warn("Image compression failed, using original file:", e);
    }
  }

  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dkfcxrudh";
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY || "641496731382431";
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET || "1iGp-AViXiNLdzK6eE87j7Fc2VM";
    const timestamp = Math.round(new Date().getTime() / 1000).toString();

    // Sort parameters: only timestamp is present
    const stringToSign = `timestamp=${timestamp}${apiSecret}`;
    
    // Hash using Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(stringToSign);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Cloudinary upload failed: ${errText}`);
    }

    const result = await response.json();
    return result.secure_url;
  } catch (error) {
    console.warn("Cloudinary upload failed, falling back to Base64:", error);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(compressedFile);
    });
  }
}
