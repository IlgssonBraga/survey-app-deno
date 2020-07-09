export const fileExists = async (filename: string): Promise<boolean> => {
  try {
    const stats = await Deno.stat(filename);
    return stats && stats.isFile;
  } catch (error) {
    if (error && error instanceof Deno.errors.NotFound) {
      // file or directory does not exist
      return false;
    } else {
      // unexpected error, maybe permissions, pass it along
      throw error;
    }
  }
};
