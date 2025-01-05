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

  const uploadFile = async (file: File, userId: string) => {
    setUploadState({ uploading: true, error: null, fileUrl: null });

    const result = await storageService.uploadFile(file, userId);

    if (result.publicUrl) {
      setUploadState({
        uploading: false,
        error: null,
        fileUrl: result.publicUrl,
      });
      return result.publicUrl;
    } else {
      setUploadState({ uploading: false, error: result.error, fileUrl: null });
      return null;
    }
  };

  return {
    ...uploadState,
    uploadFile,
  };
};
