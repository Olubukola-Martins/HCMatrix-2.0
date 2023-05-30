import React, { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { useIsAuthenticated } from "react-auth-kit";
import { Outlet, useNavigate } from "react-router-dom";
import GlobalSupport from "components/GlobalSupport";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const DashboardLayout = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() || localStorage.getItem("hcmatrix_app")) {
      // Redirect to Dashboard
    } else {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light", "");
  const [colorTheme, setColorThem] = useLocalStorage("", "");
  const [sidebarToggle, setSidebarToggle] = useState(true);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // Temporary fix to dark mode
    // window.location.reload();
  };

  const switchGreenColor = () => {
    const newTheme = colorTheme === "light" ? "orange" : "green";
    setColorThem(newTheme);
  };

  const switchOrangeColor = () => {
    const newTheme = colorTheme === "light" ? "green" : "orange";
    setColorThem(newTheme);
  };

  const switchBlueColor = () => {
    const newTheme = colorTheme === "light" ? "orange" : "blue";
    setColorThem(newTheme);
  };

  const switchPurpleColor = () => {
    const newTheme = colorTheme === "light" ? "blue" : "purple";
    setColorThem(newTheme);
  };

  const switchYellowColor = () => {
    const newTheme = colorTheme === "default";
    setColorThem(newTheme as unknown as string);
  };

  return (
    <div className="mode_color" data-theme={theme} color-theme={colorTheme}>
      <div className="h-screen overflow-y-auto">
        <TopBar
          switchTheme={switchTheme}
          theme={theme as unknown as string}
          green={switchGreenColor}
          orange={switchOrangeColor}
          yellow={switchYellowColor}
          blue={switchBlueColor}
          purple={switchPurpleColor}
          sidebarToggle={sidebarToggle}
          setSidebarToggle={() => setSidebarToggle(!sidebarToggle)}
        />
        <GlobalSupport />
        <div className="flex w-full relative">
          <div
            className={
              sidebarToggle
                ? "w-28 fixed z-40 overflow-hidden lg:flex hidden transition-all duration-500 ease-in-out"
                : "w-0 overflow-hidden "
            }
          >
            <SideBar />
          </div>

          <div
            className={
              sidebarToggle
                ? "w-full lg:pl-28 mt-7 pb-10"
                : "lg:pl-0 w-full transition-all duration-500 ease-in-out mt-7 pb-10"
            }
          >
            <div className="w-full md:top-14 top-10 sticky z-40">
              {/* <SubTopBar /> */}
            </div>
            <main className="Containe">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;