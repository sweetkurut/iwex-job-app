import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./header.module.sass";
import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import cn from "clsx";
import { deleteCookies } from "../../utils/js_cookie";
import { setRole } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { IoNotifications } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import Notification from "../notification/Notification";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlerNavigation = (path) => {
    navigate(path);
    handleClose();
  };
  const handleLogOutCookie = () => {
    deleteCookies(["accessToken", "role"]);
    dispatch(setRole(null));

    navigate("/login");
  };

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleToggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };
  return (
    <>
      <Notification isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      <header className={styles.header}>
        <div className={styles.header_container}>
          <nav className={styles.nav}>
            <Link className={styles.logo_header} to={"/"}>
              <img alt="logo" src="/original-logo.svg" className={styles.logo} />
            </Link>
            <NavLink
              to={"/"}
              className={({ isActive }) => cn(styles.nav_link, isActive && styles.active)}>
              Мои вакансии
            </NavLink>

            <NavLink
              to={"/list-interviews"}
              className={({ isActive }) => cn(styles.nav_link, isActive && styles.active)}>
              Список собеседований
            </NavLink>
            <NavLink
              to={"/all-candidates"}
              className={({ isActive }) => cn(styles.nav_link, isActive && styles.active)}>
              Кандидаты
            </NavLink>
            <NavLink
              to={"/favorites"}
              className={({ isActive }) => cn(styles.nav_link, isActive && styles.active)}>
              Избранные
            </NavLink>
          </nav>
          <div className={styles.box_profile}>
            <Link to={"/message"} className={styles.notification}>
              <MdMessage size={20} />
            </Link>
            <button className={styles.notification} onClick={handleToggleNotifications}>
              <IoNotifications size={20} />
            </button>
            <div className={styles.profile}>
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}>
                <FaUser className={styles.user_icon} />
              </Button>
              <Menu
                className={styles.menu}
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}>
                <MenuItem
                  onClick={() => handlerNavigation("/profile")}
                  className={styles.profile_menu}>
                  <FaUserCircle />
                  Профиль
                </MenuItem>
                <MenuItem onClick={handleLogOutCookie} className={styles.logOut}>
                  <CgLogOut />
                  Выйти
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
