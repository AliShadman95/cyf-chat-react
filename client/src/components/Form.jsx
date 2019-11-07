import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Collapse,
  Grid
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { connect } from "react-redux";
import { postMessage, getMessages } from "../actions/messagesActions";
import { setUserTyping } from "../actions/userTypingActions";
import Picker from "emoji-picker-react";
import clsx from "clsx";

const CssTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      color: "#B0B2B5"
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "#B0B2B5"
    },

    "& label.Mui-focused": {
      color: "#B0B2B5"
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#B0B2B5"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B0B2B5"
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderBottomColor: "white"
      },
      "&:hover fieldset": {
        borderBottomColor: "#B0B2B5"
      },
      "&.Mui-focused fieldset": {
        borderBottomColor: "#B0B2B5"
      }
    }
  }
})(TextField);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {},
  alignselfcenter: { alignSelf: "center" },
  button: {
    boxShadow: "0px 6px 16px -4px rgba(0,0,0,0.56)",
    backgroundColor: "#45A29E"
  },
  expand: { marginLeft: "auto" }
}));
const Form = ({
  postMessage,
  setUserTyping,
  userTyping,
  socket,
  room,
  name,
  avatar
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    socket.on("IS_TYPING", ({ name }) => {
      //Concat the name of the user that is typing to " is typing..."
      const userTyp = userTyping;
      if (userTyp !== " is typing.." && userTyp !== `${name} is typing..`) {
        const reg = userTyp.match(/\S+/g);
        const string = name.concat(` and ${reg[0]} are typing... `);
        setUserTyping(string);
      } else {
        const string = name.concat(userTyp);
        setUserTyping(string);
      }
    });

    socket.on("IS_NOT_TYPING", ({ message }) => {
      setUserTyping(message);
    });
  }, [isTyping]);

  const typingstopped = () => {
    console.log("called typing stopped");
    setIsTyping(false);
    socket.emit("SEND_IS_NOT_TYPING", { room, name }, error => {
      console.log(error);
    });
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onInputChange = ev => {
    setInputValue(ev.target.value);
    let time;
    if (isTyping === false) {
      console.log("inside is typing");
      setIsTyping(true);
      console.log("sending ");
      socket.emit("SEND_IS_TYPING", { room, name }, error => {
        console.log(error);
      });
      time = setTimeout(typingstopped, 4000);
    } else {
      clearTimeout(time);
      time = setTimeout(typingstopped, 4000);
      clearTimeout(time);
    }
  };

  const sendMessage = ev => {
    ev.preventDefault();
    //We send the message and then we set the Input State to empty string
    if (inputValue) {
      console.log("sendeding messaghe");
      socket.emit("SEND_MESSAGE", inputValue, () => {
        setInputValue("");
      });
    }
    let mess = { name, avatar, message: inputValue, room: "main" };
    postMessage(mess);
  };

  return (
    <Grid container>
      <Grid item md={10} xl={10} xs={8}>
        <CssTextField
          className={classes.margin}
          id="filled-full-width"
          fullWidth
          margin="normal"
          value={inputValue}
          onChange={ev => onInputChange(ev)}
          onKeyPress={ev => (ev.key === "Enter" ? sendMessage(ev) : null)}
        />
      </Grid>
      {/* <Grid
        item
        md={2}
        xl={2}
        xs={3}
        className={classes.alignselfcenter + " pl-2"}
      >
        <Box>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <Avatar />
          </IconButton>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Picker onEmojiClick={onEmojiClick} />
          </Collapse>
        </Box>
      </Grid> */}
      <Grid
        item
        md={2}
        xl={2}
        xs={4}
        className={classes.alignselfcenter + " pl-2"}
      >
        <Button
          variant="contained"
          className={classes.button}
          endIcon={
            <Icon>
              <span style={{ color: "#B0B2B5" }}>send</span>
            </Icon>
          }
          size={matches ? "small" : "large"}
          onClick={ev => {
            sendMessage(ev);
          }}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  userTyping: state.userTyping.item,
  room: state.room.item
});

export default connect(
  mapStateToProps,
  { postMessage, getMessages, setUserTyping }
)(Form);
