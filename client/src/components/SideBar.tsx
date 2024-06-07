/* eslint-disable @typescript-eslint/no-explicit-any */
import { RxDashboard } from "react-icons/rx";
import logo from "../assets/logo.png";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaPiggyBank } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useScreenResize } from "../context/ScreenResizeContext";
import { ImCross } from "react-icons/im";

const SidebarComponent = (): React.ReactNode => {
  const { pathname } = useLocation();
  // @ts-expect-error "unexpected error"
  const { isMobile, sidebarOpen, setSidebarOpen } = useScreenResize();

  return (
    <div className={
      (
        isMobile ? 
          (sidebarOpen ? "" : "hidden ") +
          "absolute z-10 top-0 w-full left-0 h-[100vh]"
          : "w-full md:w-[250px] border-r-[2px]"
      ) + " bg-white px-3 border-r-slate-300 flex flex-col justify-start items-center space-y-5"}>
      {
        isMobile ? (
          <div className="flex flex-row items-center justify-between w-full px-3 py-2">
            <ImCross className="text-sm cursor-pointer text-slate-400" onClick={() => setSidebarOpen(false)} />
            <Link to={"/"} onClick={() => setSidebarOpen(false)} className="w-fit h-[90px]">
              <img src={logo} alt="logo" className="w-[100px] mt-1" />
            </Link>
            <div></div>
          </div>
        ) : (
          <Link to={"/"} className="w-fit h-[90px]">
            <img src={logo} alt="logo" className="w-[100px] mt-5" />
          </Link>
        )
      }
      <ul className="flex flex-col w-full text-gray-500 font-medium h-full bg-white">
        <SidebarTabs setSidebarOpen={setSidebarOpen} tabName="Dashboard" Icon={RxDashboard} pathname={pathname} />
        <SidebarTabs setSidebarOpen={setSidebarOpen} tabName="Expenses" Icon={RiMoneyRupeeCircleFill} pathname={pathname} />
        <SidebarTabs setSidebarOpen={setSidebarOpen} tabName="Sources" Icon={FaPiggyBank} pathname={pathname} />
      </ul>
    </div>
  )
}

const SidebarTabs = ({ tabName, Icon, pathname, setSidebarOpen }: { tabName: string, Icon: React.ElementType, pathname: string, setSidebarOpen: any }): React.ReactNode => {
  return (
    <Link className={"items-center space-x-2 cursor-pointer px-5 py-2 my-2 rounded-md transition-all flex" + (pathname.includes(`/${tabName.toLowerCase()}`) ? " bg-purple-300 text-purple-800": " hover:bg-purple-200 hover:text-purple-800")} to={`/${tabName.toLowerCase()}`} onClick={() => setSidebarOpen(false)}>
      <Icon className="text-md" />
      <p>{tabName}</p>
    </Link>
  )
}

export default SidebarComponent;