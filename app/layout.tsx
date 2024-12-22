// app/layout.tsx
import React from "react";
import Layout from "./components/Layout"; // Adjust based on your path configuration
import './globals.css'; // Ensure global styles are imported

export const metadata = {
  title: "Educational Platform",
  description: "Explore interactive educational experiments",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
