import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Link as RouteLink, useNavigate } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";
import { Person, ShoppingCart } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "4rem",
  },
  appBar: {
    backgroundColor: "whitesmoke",
    boxShadow: "none",
    height: "60px",
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  image: {
    marginRight: "5px",
  },
  ShoppingCartContainer: {
    marginRight: "5px",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [{ basket, user }, dispatch] = useStateValue();

  console.log("user", user);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/signin");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            fontSize="large"
            onClick={() => navigate("/")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Logo_TV_2015.png/50px-Logo_TV_2015.png"
              alt="logo"
              style={{ width: 40, height: "auto" }}
            />
          </IconButton>

          <div style={{ flexGrow: 1 }} />
          {/*  {!user ? (
            <div>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button variant="outlined">
                  <strong> Sign In</strong>
                </Button>
              </Link>
            </div>
          ) : (
            <div></div>
          )} */}
          <div>
            <IconButton
              aria-label="show cart items"
              color="inherit"
              onClick={() => navigate("/shoppingcart")}
            >
              <Badge badgeContent={basket?.length} color="secondary">
                <ShoppingCart fontSize="large" color="primary" />
              </Badge>
            </IconButton>
          </div>

          <div>
            <IconButton
              edge="end"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <Person fontSize="large" />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {user ? (
                <>
                  {user.role.includes("admin") && (
                    <MenuItem onClick={handleMenuClose}>
                      <Link
                        to="/product-create"
                        style={{ textDecoration: "none" }}
                      >
                        Subir artículo
                      </Link>
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleMenuClose}>
                    Perfil
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                </>
              ) : (
                <MenuItem onClick={handleSignIn}>Iniciar sesión</MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
