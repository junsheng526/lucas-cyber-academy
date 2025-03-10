import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../styles/theme";
import { useUser } from "../../../hooks/useUser";
import { DEFAULT_AVATAR } from "../../../modules/course/constant";
import Avatar from "../../molecules/Avatar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useGrayscale } from "../../../hooks/useGrayscale"; // Import useGrayscale hook

type UserRole = "admin" | "lecturer" | "student";

// Define user roles and their allowed menu items
const menuItems = {
  admin: [
    {
      key: "dashboard",
      title: "Dashboard",
      to: "/dashboard",
      icon: <HomeOutlinedIcon />,
    },
    {
      key: "manageCourses",
      title: "Manage Courses",
      to: "/manage-course",
      icon: <PeopleOutlinedIcon />,
    },
    {
      key: "manageLecturers",
      title: "Manage Lecturers",
      to: "/manage-lecturers",
      icon: <PeopleOutlinedIcon />,
    },
    {
      key: "manageEnrollments",
      title: "Manage Enrollments",
      to: "/manage-enrollments",
      icon: <PeopleOutlinedIcon />,
    },
    {
      key: "manageSchedule",
      title: "Manage Schedule",
      to: "/manage-schedule",
      icon: <PeopleOutlinedIcon />,
    },
    {
      key: "editProfile",
      title: "Edit Profile",
      to: "/edit-profile",
      icon: <PersonOutlinedIcon />,
    },
    {
      key: "manageHome",
      title: "Manage Home",
      to: "/manage-home",
      icon: <PersonOutlinedIcon />,
    },
  ],
  lecturer: [
    {
      key: "dashboard",
      title: "Dashboard",
      to: "/dashboard",
      icon: <HomeOutlinedIcon />,
    },
    {
      key: "manageEnrollments",
      title: "Manage Enrollments",
      to: "/manage-enrollments",
      icon: <PeopleOutlinedIcon />,
    },
    {
      key: "manageSchedule",
      title: "Manage Schedule",
      to: "/manage-schedule",
      icon: <PeopleOutlinedIcon />,
    },
    {
      key: "editProfile",
      title: "Edit Profile",
      to: "/edit-profile",
      icon: <PersonOutlinedIcon />,
    },
  ],
  student: [
    {
      key: "dashboard",
      title: "Dashboard",
      to: "/dashboard",
      icon: <HomeOutlinedIcon />,
    },
    {
      key: "studentDashboard",
      title: "Student Dashboard",
      to: "/student-dashboard",
      icon: <HomeOutlinedIcon />,
    },
    {
      key: "editProfile",
      title: "Edit Profile",
      to: "/edit-profile",
      icon: <PersonOutlinedIcon />,
    },
    {
      key: "viewSchedule",
      title: "View Schedule",
      to: "/view-schedule",
      icon: <PersonOutlinedIcon />,
    },
    {
      key: "manageGrayscale",
      title: "Manage Grayscale",
      to: "/manage-grayscale",
      icon: <PersonOutlinedIcon />,
    },
  ],
};

export const Sidebar: React.FC<{ isSidebar: boolean }> = ({ isSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(isSidebar);
  const [selected, setSelected] = useState("Dashboard");
  const { userData } = useUser();
  const grayscaleConfig: any = useGrayscale();

  console.log("Check grayscale config -> " + JSON.stringify(grayscaleConfig));

  const role: UserRole =
    (userData?.role?.toLowerCase() as UserRole) || "student";
  const filteredMenuItems = menuItems[role] || [];

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
        "& .pro-inner-item:hover": { color: "#868dfb !important" },
        "& .pro-menu-item.active": { color: "#6870fa !important" },
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Sidebar Header */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {role.toUpperCase()}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* User Profile */}
          {!isCollapsed && (
            <Box mb="25px" textAlign="center">
              <Avatar
                hasChecked
                hasCheckedClass="w-6 h-6 -top-0.5 right-0.5"
                sizeClass="h-[100px] w-[100px]"
                radius="rounded-full"
                imgUrl={userData?.profileImage || DEFAULT_AVATAR}
              />
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                {userData?.name || "User"}
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[500]}>
                {role}
              </Typography>
            </Box>
          )}

          {/* Sidebar Menu */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {filteredMenuItems
              // .filter((item) => !grayscaleConfig[item.key])
              .map((item) => (
                <MenuItem
                  key={item.to}
                  active={selected === item.title}
                  onClick={() => setSelected(item.title)}
                  icon={item.icon}
                  style={{ color: colors.grey[100] }}
                >
                  <Typography>{item.title}</Typography>
                  <Link to={item.to} />
                </MenuItem>
              ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
