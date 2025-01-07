import { useState } from "react";
import { SupabaseStorageService } from "./supabaseStorageService";

const storageService = new SupabaseStorageService("lucas-cyber-academy");

interface UploadState {
  uploading: boolean;
  error: string | null;
  fileUrl: string | null;
}

export const useFileUpload = () => {
  const [uploadState, setUploadState] = useState<UploadState>({
    uploading: false,
    error: null,
    fileUrl: null,
  });

  const uploadFiles = async (files: FileList | File[], userId: string) => {
    setUploadState({ uploading: true, error: null, fileUrl: null });

    const uploadedUrls: string[] = [];
    let errorMessage: string | null = null;

    for (const file of Array.from(files)) {
      const result = await storageService.uploadFile(file, userId);

      if (result.publicUrl) {
        uploadedUrls.push(result.publicUrl);
      } else {
        errorMessage = result.error;
        break; // Stop if an error occurs
      }
    }

    if (errorMessage) {
      setUploadState({ uploading: false, error: errorMessage, fileUrl: null });
      return null;
    } else {
      setUploadState({
        uploading: false,
        error: null,
        fileUrl: uploadedUrls.join(","),
      });
      return uploadedUrls;
    }
  };

  return {
    ...uploadState,
    uploadFiles,
  };
};
