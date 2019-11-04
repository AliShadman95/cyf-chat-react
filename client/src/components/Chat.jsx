import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Form from "../components/Form";
import Rooms from "./Rooms";
import Messages from "./Messages";
import Header from "../components/Header";
import IsTyping from "../components/IsTyping";
import Box from "@material-ui/core/Box";
import FetchChips from "./FetchChips";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const ENDPOINT = "https://chat-by-as.herokuapp.com/";
const socket = io(ENDPOINT);

const useStyles = makeStyles(theme => ({
  chipsXS: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "space-evenly"
    }
  },
  roomHeightBreak: {
    [theme.breakpoints.between("xs", "sm")]: {
      paddingRight: "0px",
      paddingLeft: "0px"
    },
    [theme.breakpoints.between("lg", "xl")]: {
      height: "80vh",
      paddingRight: "0px"
    },
    [theme.breakpoints.only("lg")]: {
      height: "75vh",
      paddingRight: "0px"
    }
  },
  messageHeightBreak: {
    [theme.breakpoints.between("xs", "sm")]: {
      height: "33vh",
      paddingRight: "0px",
      paddingLeft: "0px"
    },
    [theme.breakpoints.between("lg", "xl")]: {
      height: "80vh",
      paddingRight: "0px"
    },
    [theme.breakpoints.only("sm")]: {
      height: "50vh",
      paddingRight: "0px"
    },
    [theme.breakpoints.only("lg")]: {
      height: "75vh",
      paddingRight: "0px"
    }
  }
}));

const Chat = ({ location }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(0);

  useEffect(() => {
    const { name, avatar } = queryString.parse(location.search);
    setName(name);
    setAvatar(avatar);
    console.log("calling join emit");
    //Emmiting Join
    socket.emit("join", { name, avatar, room: "main" }, error => {
      console.log("inside join emit, added user");
      console.log(error);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  return (
    <div className="App">
      <Container maxWidth="xl">
        <Grid container>
          <Grid item md={12} xl={12} xs={12}>
            <Header />
          </Grid>
          <Grid item md={2} xl={2} sm={12} xs={12} className="mt-3">
            <Box className={classes.roomHeightBreak}>
              <Rooms socket={socket} />
            </Box>
            <Box className="mt-4">
              <Box className={classes.chipsXS}>
                <FetchChips />
              </Box>
            </Box>
          </Grid>
          <Grid item md={10} xl={10} xs={12}>
            <div className="container-fluid">
              <div className="row">
                <div className={classes.messageHeightBreak + " col-md-12 mt-3"}>
                  <Messages socket={socket} name={name} />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12 col-xs-12">
                  <Form socket={socket} name={name} avatar={avatar} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-xs-6 text-left">
                  <IsTyping />
                </div>
                <div className="col-md-6 col-xs-6 text-right pt-2">
                  <Typography
                    component="span"
                    variant="caption"
                    style={{ color: "white" }}
                  >
                    Made with ❤ by Ali Shadman
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Chat;
