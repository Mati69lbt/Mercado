//cspell: ignore parana santafe

import { Link } from "react-router-dom";
import parana from "../../../../assets/parana1.jpg";
import santafe from "../../../../assets/santafe1.jpg";

const LandingPage = () => {
  return (
    <div className="relative flex w-full h-screen">
      {/* Mitad izquierda */}
      <div className="relative w-1/2 h-full">
        <img
          src={parana}
          alt="Paraná"
          className="w-full h-full block object-cover"
        />
        <Link to="/parana">
          <div className="absolute inset-0 flex items-end justify-center pb-[20vh]">
            <button className="bg-white/90 hover:bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-lg">
              Paraná
            </button>
          </div>
        </Link>
      </div>

      {/* Mitad derecha */}
      <div className="relative w-1/2 h-full">
        <img
          src={santafe}
          alt="Santa Fe"
          className="w-full h-full block object-cover"
        />
        <Link to="/santafe">
          <div className="absolute inset-0 flex items-end justify-center pb-[20vh]">
            <button className="bg-white/90 hover:bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-lg">
              Santa Fe
            </button>
          </div>
        </Link>
      </div>

      {/* Divisor blanco en el medio */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-full w-[4px] bg-white/90" />
    </div>
  );
};

export default LandingPage;
