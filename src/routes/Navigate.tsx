import { useEffect } from "react";
import { useLocation } from "wouter";

export function Navigate({ to }: { to: string }) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation(to);
  }, [to, setLocation]);

  return null;
}
