import React from "react";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Search from "./Search";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  }
}));

const Header = ({ searchMessages, searchMessagesResult }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#1F2833" }}>
        <Toolbar variant="dense">
          <Typography
            className={classes.title}
            style={{ color: "#66FCF1", fontWeight: "bold" }}
            variant="h4"
            noWrap
          >
            Let's Chat!
          </Typography>
          <Search />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
