import { useEffect } from "react";
import { useLoader } from "../context/LoaderContext";

const GlobalLoader = () => {
  const { loading } = useLoader();

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";
    };
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-lg font-semibold tracking-wide">Please wait...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
