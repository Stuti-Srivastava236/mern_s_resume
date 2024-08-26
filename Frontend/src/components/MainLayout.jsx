import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';

const MainLayout = () => {
  return (
    <div className='flex h-screen'>
      <LeftSidebar />
      <div className='flex-1 ml-[20%] p-4'>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
