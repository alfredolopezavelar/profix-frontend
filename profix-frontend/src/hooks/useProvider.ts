import { useState } from "react";

const useProvider = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerProvider = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      /* TODO: integrar llamada real a la API */
      console.log("Sending provider data:", data);
    } catch (err: any) {
      setError(err?.message || "Error al registrar proveedor");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { registerProvider, isLoading, error };
};

export default useProvider;
