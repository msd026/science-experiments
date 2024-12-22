// app/components/Layout.tsx
'use client';

import React from "react";
import Menu from "./Menu"; // Corrected Import Path
import Footer from "./Footer"; // Corrected Import Path

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Educational Platform</h1>
        </div>
      </header>

      {/* Main Content Section */}
      <div className="flex flex-1">
        <Menu />
        <main className="flex-1 p-8 bg-gray-100">
          {children}
        </main>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Layout;
