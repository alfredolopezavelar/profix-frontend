import { useState } from "react";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const useProvider = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** ← PUT /providers/:id  */
  const updateProvider = async (data: { id: string; name: string; email: string }) => {
    try {
      setLoading(true);
      setError(null);
      await sleep(500); // mock delay
      console.log("updateProvider ->", data);
      return data;      // devuelve el provider actualizado
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al actualizar proveedor");
      } else {
        setError("Error al actualizar proveedor");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /** ← POST /providers/:id/jobs  */
  const addJobToProvider = async (
    providerId: string,
    data: { title: string; description: string; image: File }
  ) => {
    try {
      setLoading(true);
      setError(null);
      await sleep(500); // mock delay
      console.log("addJobToProvider ->", providerId, data);

      // Simula un objeto Job
      return {
        imageURL: URL.createObjectURL(data.image),
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al agregar trabajo");
      } else {
        setError("Error al agregar trabajo");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProvider, addJobToProvider, isLoading, error };
};

export default useProvider;
