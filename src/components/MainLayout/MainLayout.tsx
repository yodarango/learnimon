import { ROUTE_HOME_CHALLENGES, ROUTE_HOME_USERS } from "@constants";
import React, { HTMLProps } from "react";
import { Link, useLocation } from "react-router-dom";

// styles
import "./MainLayout.scss";

export const MainLayout: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  const { children } = props;

  const location = useLocation();
  const currentTab = location.pathname.includes("users")
    ? "users"
    : "challenges";
  return (
    <section className='main-layout-74gv d-flex align-items-start justify-content-start gap-6'>
      <div className='main-layout-74gv__left bg-gamma'>
        <Link
          to={ROUTE_HOME_USERS}
          className={
            "d-flex align-items-center justify-content-start color-alpha p-4 rounded mb-4 gap-2 " +
            (currentTab === "users" ? "bg-zeta" : "bg-mu")
          }
        >
          <ion-icon name='person-outline' />
          <p>users</p>
        </Link>
        <Link
          to={ROUTE_HOME_CHALLENGES}
          className={
            "d-flex align-items-center justify-content-start color-alpha p-4 rounded gap-2 " +
            (currentTab === "challenges" ? "bg-zeta" : "bg-mu")
          }
        >
          <ion-icon name='apps-outline' />
          <p>Challenges</p>
        </Link>
      </div>
      <div className='main-layout-74gv__right w-100'>{children}</div>
    </section>
  );
};
