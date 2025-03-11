import React, { useState } from "react";
import { useFileUpload } from "../../hooks/useFileUpload";
import { firestoreService } from "../../services/firestoreService";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { uploading, error, fileUrl, uploadFiles } = useFileUpload();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] || null;
    setFile(uploadedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    // Upload file to Supabase and get the URL
    const uploadedUrl = await uploadFiles([file], "user123");

    if (uploadedUrl) {
      try {
        // Save the URL to Firestore using the existing service
        await firestoreService.setDoc(
          "users", // Collection name
          "user123", // Document ID
          { profileImage: uploadedUrl }, // Data to save
          true // Merge with existing data
        );
        alert("File uploaded and URL saved!");
      } catch (firestoreError) {
        console.error("Error saving to Firestore:", firestoreError);
        alert("Failed to save URL to Firestore.");
      }
    } else {
      alert("Upload failed: " + error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fileUrl && (
        <p>
          Uploaded:{" "}
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            {fileUrl}
          </a>
        </p>
      )}
    </div>
  );
};

export default FileUpload;
