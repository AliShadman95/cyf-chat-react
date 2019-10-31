import React from "react";
import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Typography,
  Collapse,
  Radio,
  AppBar,
  Toolbar,
  InputBase,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Menu,
  MenuItem
} from "@material-ui/core";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import images from "../helpers/Images";
import Moment from "react-moment";
import clsx from "clsx";
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
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.9),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.9)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "black"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  date: {
    color: "grey !important",
    fontSize: 12 + "px !important"
  },
  expand: {
    marginLeft: "auto"
  },
  expandOpen: {}
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

const calendarStrings = {
  lastDay: "[Yesterday at] LT",
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  lastWeek: "[last] dddd [at] LT",
  nextWeek: "dddd [at] LT",
  sameElse: "L"
};

const Header = ({ searchMessages, searchMessagesResult }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCollapse, setSelectedCollapse] = React.useState(-1);
  const [selectedRadio, setSelectedRadio] = React.useState("a");
  const [searchValue, setSearchValue] = React.useState("");

  const handleRadioChange = event => {
    setSelectedRadio(event.target.value);

    searchMessages(searchValue, event.target.value === "c" ? 0 : 1);
  };

  const handleClick = event => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    searchMessages(searchValue, 1);
  };

  const onInputChange = ev => {
    setSearchValue(ev);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = id => {
    setSelectedCollapse(selectedCollapse === id ? -1 : id);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#404346" }}>
        <Toolbar variant="dense">
          <Typography className={classes.title} variant="h6" noWrap>
            Let's Chat!
          </Typography>
          <div className={classes.search}>
            <IconButton onClick={ev => handleClick(ev)}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
            </IconButton>
            <InputBase
              placeholder="Search…"
              onChange={ev => {
                ev.preventDefault();
                onInputChange(ev.target.value);
              }}
              onKeyPress={ev => (ev.key === "Enter" ? handleClick(ev) : null)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Box className="pl-3 d-flex ">
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="position"
                    name="position"
                    value={selectedRadio}
                    onChange={handleRadioChange}
                    row
                    className="d-flex flex-nowrap"
                  >
                    <FormControlLabel
                      value="end"
                      control={
                        <Radio
                          checked={selectedRadio === "a"}
                          value="a"
                          name="radio-button-demo"
                          inputProps={{ "aria-label": "A" }}
                        />
                      }
                      label="This room"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="end"
                      control={
                        <GreenRadio
                          checked={selectedRadio === "c"}
                          value="c"
                          name="radio-button-demo"
                          inputProps={{ "aria-label": "C" }}
                        />
                      }
                      label="All rooms"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              {searchMessagesResult.map((message, i) => {
                return (
                  <div key={i}>
                    <StyledMenuItem
                      key={i}
                      className={clsx(classes.expand, {
                        [classes.expandOpen]:
                          selectedCollapse === i ? true : false
                      })}
                      onClick={() => {
                        handleExpandClick(i);
                      }}
                      aria-expanded={selectedCollapse === i ? true : false}
                      aria-label="show more"
                    >
                      <ListItemAvatar>
                        <Avatar src={images[message.avatar]} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            {message.name + " "}
                            <Moment
                              calendar={calendarStrings}
                              className={classes.date}
                            >
                              {message.date}
                            </Moment>
                          </React.Fragment>
                        }
                      />
                    </StyledMenuItem>
                    <Collapse
                      in={selectedCollapse === i}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Typography component="span" variant="body2">
                        {message.message}
                      </Typography>
                    </Collapse>
                  </div>
                );
              })}
            </StyledMenu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
