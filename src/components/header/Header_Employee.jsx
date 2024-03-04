import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./header.module.sass";
import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import cn from "clsx";
import { deleteCookies } from "../../utils/js_cookie";
import { useDispatch } from "react-redux";
import { setRole } from "../../store/slices/userSlice";

const Header_Employee = () => {
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

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <nav className={styles.nav}>
          <Link className={styles.logo_header} to={"/"}>
            <img alt="logo" src="/original-logo.svg" className={styles.logo} />
          </Link>
          <NavLink
            to={"/"}
            className={({ isActive }) => cn(styles.nav_link, isActive && styles.active)}>
            Заказы
          </NavLink>
          <NavLink
            to={"/list-employer"}
            className={({ isActive }) => cn(styles.nav_link, isActive && styles.active)}>
            Список Работодателей
          </NavLink>
          <NavLink
            to={"/list-students"}
            className={({ isActive }) => cn(styles.nav_link, isActive && styles.active)}>
            Список студентов
          </NavLink>
          <NavLink
            to={"/message"}
            className={({ isActive }) => cn(styles.nav_link, isActive && styles.active)}>
            Сообщение
          </NavLink>
        </nav>
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
            <MenuItem onClick={() => handlerNavigation("/profile")} className={styles.profile_menu}>
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
    </header>
  );
};

export default Header_Employee;
