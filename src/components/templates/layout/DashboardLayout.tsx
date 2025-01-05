// src/components/Layout.tsx
import { ReactNode } from "react";
import { Box } from "@mui/material";
import { Sidebar } from "../../organisms/sidebar/Sidebar";
import Topbar from "../../organisms/header/Topbar";

interface LayoutProps {
  children: ReactNode;
  isSidebar: boolean;
  setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardLayout: React.FC<LayoutProps> = ({
  children,
  isSidebar,
  setIsSidebar,
}) => {
  return (
    <Box display="flex">
      <Sidebar isSidebar={isSidebar} />
      <Box component="main" flex={1}>
        <Topbar setIsSidebar={setIsSidebar} />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
