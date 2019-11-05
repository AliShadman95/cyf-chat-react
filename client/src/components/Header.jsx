import React from "react";
import {
  Typography,
  Radio,
  AppBar,
  Toolbar,
  Menu,
  MenuItem
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Search from "./Search";
import { green } from "@material-ui/core/colors";

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
      <AppBar position="static" style={{ backgroundColor: "#404346" }}>
        <Toolbar variant="dense">
          <Typography className={classes.title} variant="h6" noWrap>
            Let's Chat!
          </Typography>
          <Search />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
