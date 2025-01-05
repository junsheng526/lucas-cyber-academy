import { supabase } from "./supabaseClient";

interface UploadResult {
  publicUrl: string | null;
  error: string | null;
}

export class SupabaseStorageService {
  private bucket: string;

  constructor(bucketName: string) {
    this.bucket = bucketName;
  }

  async uploadFile(file: File, userId: string): Promise<UploadResult> {
    const filePath = `public/${userId}/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from(this.bucket)
      .upload(filePath, file);

    if (error) {
      console.error("Upload Error:", error.message);
      return { publicUrl: null, error: error.message };
    }

    const { data: publicUrl } = supabase.storage
      .from(this.bucket)
      .getPublicUrl(filePath);

    return { publicUrl: publicUrl.publicUrl, error: null };
  }

  // Delete File
  async deleteFile(filePath: string): Promise<boolean> {
    const { error } = await supabase.storage
      .from(this.bucket)
      .remove([filePath]);

    if (error) {
      console.error("Delete Error:", error.message);
      return false;
    }
    return true;
  }

  // List Files (Optional)
  async listFiles(userId: string): Promise<string[] | null> {
    const { data, error } = await supabase.storage
      .from(this.bucket)
      .list(`public/${userId}`);

    if (error) {
      console.error("List Error:", error.message);
      return null;
    }
    return data?.map((file: { name: any }) => file.name) || null;
  }
}
