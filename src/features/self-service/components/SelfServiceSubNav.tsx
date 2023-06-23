import { Menu } from "antd";
import { selfServiceRoutes } from "config/router/routes/selfService";
import React from "react";
import { Link } from "react-router-dom";

const SelfServiceSubNav = () => {
  return (
    <div className="">
      <Menu
        className="bg-white py-4 px-3 text-accent rounded mb-9 shadow-md  text-sm font-medium"
        mode="horizontal"
        items={selfServiceRoutes
          .filter((item) => item.isPrimaryFeature)
          .map((item, i) => ({
            label: (
              <Link to={item.path} className="">
                <span className="">{item.title}</span>
              </Link>
            ),
            key: i,
          }))}
      />
    </div>
  );
};

export default SelfServiceSubNav;
