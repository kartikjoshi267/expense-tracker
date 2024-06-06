import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "../context/UserContext";
import SidebarComponent from "../components/SideBar";
import TopBarComponent from "../components/TopBar";

const ProtectedRoute = () => {
  // @ts-expect-error "unexpected ts error"
  const { user, logout } = useUser();
  
  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex flex-row w-full h-full">
      <SidebarComponent />
      <div className="w-full h-full flex flex-col">
        <TopBarComponent user={user} logout={logout} />
        <div className="p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ProtectedRoute