import { useEffect } from "react";
import { useLoader } from "../context/LoaderContext";

const GlobalLoader = () => {
  const { loading } = useLoader();

  // Prevent scroll when loading
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-lg font-medium">Please wait...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
