import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "../context/UserContext";

const DeProtectRoute = () => {
  // @ts-expect-error "unexpected ts error"
  const { user } = useUser();

  if (user) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <Outlet />
  )
}

export default DeProtectRoute