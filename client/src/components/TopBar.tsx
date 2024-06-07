import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { TbLogout } from "react-icons/tb";
import { useScreenResize } from "../context/ScreenResizeContext";
import { BiMenu } from "react-icons/bi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TopBarComponent = ({ user, logout }: { user: any, logout: () => Promise<void> }): React.ReactNode => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // @ts-expect-error "unexpected error"
  const { isMobile, setSidebarOpen } = useScreenResize();

  useEffect(() => {
    const processEvent = (e: Event) => {
      const specificDiv = document.getElementById('avatar-div');
      if (!specificDiv || specificDiv.contains(e.target as Node)) {
          return;
      }

      setDropdownOpen(false);
    }

    document.body.addEventListener('click', processEvent);

    return () => document.body.removeEventListener('click', processEvent);
  }, []);

  return (
    <div className={"w-100 border-b-slate-300 border-b-[2px] flex flex-row px-5 py-5 space-x-2 h-[80px]" + (isMobile ? " justify-between items-center": " justify-end items-center")}>
      { isMobile && (
        <>
          <BiMenu className="text-2xl cursor-pointer text-slate-400" onClick={() => setSidebarOpen(true)} />
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-extrabold text-sm">MyKhata</h1>
            <p className="font-light text-xs">Your own expense tracker</p>
          </div>
        </>
      )}
      <div id="avatar-div">
        <Avatar name={user.name} size="40" color="purple" textSizeRatio={2.5} round={true} onClick={() => setDropdownOpen(!dropdownOpen)} className="select-none cursor-pointer" />
        {dropdownOpen && (
          <div className="absolute right-1 mt-1 rounded-lg shadow-lg bg-white p-2 border-2">
            <ul className="flex flex-col space-y-1 justify-center items-center w-full">
              <li className="p-2 rounded-lg transition-all w-full text-center text-sm flex flex-col items-center text-purple-800">
                <p className="font-bold">{user.name}</p>
                <p className="text-xs font-semibold opacity-[0.6]">{user.email}</p>
              </li>
              <li className="text-white p-2 rounded-lg cursor-pointer bg-purple-500 hover:bg-purple-600 transition-all text-center flex space-x-1 items-center" onClick={logout}>
                <p>Logout</p>
                <TbLogout className="text-md" />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopBarComponent;