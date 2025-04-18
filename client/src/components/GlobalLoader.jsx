import { useEffect } from "react";
import { useLoader } from "../context/LoaderContext";

const GlobalLoader = () => {
  const { loading } = useLoader();

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";  // Disable scrolling
      document.body.style.pointerEvents = "none"; // Disable clicking
    } else {
      document.body.style.overflow = "auto";  // Enable scrolling
      document.body.style.pointerEvents = "auto"; // Enable clicking
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";
    };
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-transparent flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-lg font-semibold tracking-wide">Please wait...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
