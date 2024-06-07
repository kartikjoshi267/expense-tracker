import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";

const DeProtectRoute = () => {
  // @ts-expect-error "unexpected ts error"
  const { user } = useUser();

  if (user) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <Navbar user={user} />
      <Outlet />
    </>
  )
}

export default DeProtectRoute