/**
 * Upload an image file to Cloudinary using an unsigned upload preset.
 * @param {File} file - Image file to upload
 * @returns {Promise<string>} - Cloudinary secure URL of the uploaded image
 */
export const uploadToCloudinary = async (file) => {
  const cloudName =
    process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "dgndjycs1";
  const uploadPreset =
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "wdct-bgmi";

  if (!cloudName || !uploadPreset || cloudName === "your_cloudinary_cloud_name") {
    throw new Error(
      "Cloudinary is not configured yet. Please provide REACT_APP_CLOUDINARY_CLOUD_NAME and REACT_APP_CLOUDINARY_UPLOAD_PRESET in your .env file."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Failed to upload image to Cloudinary.");
  }

  return data.secure_url || data.url;
};
