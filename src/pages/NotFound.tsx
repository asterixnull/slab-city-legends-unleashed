
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4 py-12 max-w-lg">
        <h1 className="text-7xl font-display text-slab-rust mb-4">404</h1>
        <h2 className="text-3xl font-display text-slab-dark mb-6">LOST IN THE DESERT</h2>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed mb-8">
          <p className="text-lg mb-4">
            Looks like you've wandered off the beaten path into uncharted territory.
            Even Nomad Nick couldn't find this location!
          </p>
          <p>
            Let's get you back to the Slabs where there's shade and community.
          </p>
        </div>
        <Button className="btn-distressed" asChild>
          <Link to="/">
            <Map className="mr-2 h-4 w-4" />
            RETURN TO SLAB CITY
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
