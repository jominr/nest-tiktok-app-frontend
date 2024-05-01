import React from 'react';
import TopNav from '../components/TopNav';
import { useLocation } from 'react-router-dom';
import SideNav from '../components/SideNav';
type Props = {
  children: React.ReactNode
}
const MainLayout = ({children}: Props) => {
  const { pathname } = useLocation();
  return (
    <div>
      <header>
        <TopNav />
      </header>

      <div
        className={[
          pathname === "/" ? "max-w-[1140px]" : "",
          "flex justify-between mx-auto w-full lg:px-2.5 px-0"
        ].join(" ")}
      >
        <div>
          <SideNav />
        </div>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;