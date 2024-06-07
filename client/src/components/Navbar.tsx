/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImMenu, ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useScreenResize } from "../context/ScreenResizeContext";

const Navbar = ({ user }: any): React.ReactNode => {
  // @ts-expect-error "unexpected error"
  const { isMobile, navbarOpen, setNavbarOpen } = useScreenResize();
  
  return (
    <nav className="bg-white shadow-lg sticky">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex items-center justify-between w-full space-x-4 text-white">
            <Link to={"/"} className="h-[80px]">
              <img src={logo} alt="logo" className="w-[100px] mt-1" />
            </Link>

            {!isMobile && (
              <div className="flex items-center space-x-2">
                {user ? (
                  <Link to="/dashboard" onClick={() => setNavbarOpen(false)} className="py-3 px-3 w-32 text-center bg-purple-600 hover:bg-purple-800 rounded-md">Dashboard</Link>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setNavbarOpen(false)} className="py-3 px-3 w-24 text-center bg-purple-600 hover:bg-purple-800 rounded-md">Login</Link>
                    <Link to="/register" onClick={() => setNavbarOpen(false)} className="py-3 px-3 w-24 text-center bg-purple-600 hover:bg-purple-800 rounded-md">Register</Link>
                  </>
                )}
              </div>
            )}
          </div>

          {isMobile && (
            <div className="flex items-center">
              <button onClick={() => setNavbarOpen(!navbarOpen)}>
                {!navbarOpen ? (
                  <ImMenu className="w-4 h-4 text-purple-700" />
                ) : (
                  <ImCross className="w-4 h-4 text-purple-700" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {isMobile && (
        <div className={`absolute bg-white w-full ${navbarOpen ? "" : "hidden"}`}>
          <Link to="/" className="block py-2 px-4 text-sm hover:bg-purple-200">Home</Link>
          {
            user ? (
              <Link to="/dashboard" onClick={() => setNavbarOpen(false)} className="block py-2 px-4 text-sm hover:bg-purple-200">Dashboard</Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setNavbarOpen(false)} className="block py-2 px-4 text-sm hover:bg-purple-200">Login</Link>
                <Link to="/register" onClick={() => setNavbarOpen(false)} className="block py-2 px-4 text-sm hover:bg-purple-200">Register</Link>
              </>
            )
          }
        </div>
      )}
    </nav>
  )
}

export default Navbar;