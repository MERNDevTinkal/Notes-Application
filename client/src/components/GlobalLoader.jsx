import { useLoader } from "../context/LoaderContext";

const GlobalLoader = () => {
  const { loading } = useLoader(); 

  if (!loading) return null; 

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default GlobalLoader;
