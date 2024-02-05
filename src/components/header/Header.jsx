import { Link, NavLink } from "react-router-dom";
import styles from "./header.module.sass";
import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import cn from "clsx";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <nav className={styles.nav}>
          <Link className={styles.logo_header} to={"/"}>
            <img alt="logo" src="/original-logo.svg" className={styles.logo} />
          </Link>
          <NavLink
            to={"/vacancies"}
            className={({ isActive }) => cn(styles.nav_link, isActive && styles.active)}>
            Мои вакансии
          </NavLink>
          <NavLink
            to={"/branch"}
            className={({ isActive }) => cn(styles.nav_link, isActive && styles.active)}>
            Мои филиалы
          </NavLink>
          <NavLink
            to={"/response"}
            className={({ isActive }) => cn(styles.nav_link, isActive && styles.active)}>
            Отклики
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
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}>
            <MenuItem onClick={handleClose}>Профиль</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
