import { useState, ChangeEvent } from "react";

interface ImageUploadProps {
  onFileSelect: (file: File | null) => void;
}

function ImageUpload({ onFileSelect }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    const file = event.target.files && event.target.files[0];
    onFileSelect(file);

    if (file) {
      // Check if the uploaded file is an image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result as string);
          setLoading(false);
        };
        reader.readAsDataURL(file);
      } else {
        // Handle the case when the uploaded file is not an image
        setLoading(false);
        alert("Please upload an image file.");
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className={`${
          loading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700"
        } p-2 rounded-md text-white transition duration-300 ease-in-out`}
      >
        {loading ? "Uploading..." : "Add a cover image"}
      </label>
      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-full max-h-64"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
