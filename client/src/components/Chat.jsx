import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Form from "../components/Form";
import Rooms from "./Rooms";
import Messages from "./Messages";
import axios from "axios";
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

const Chat = ({ setUsers, location }) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("main");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [searchMessagesResult, setSearchMessagesResult] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(" is typing..");

  useEffect(() => {
    const { name, avatar } = queryString.parse(location.search);

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

  useEffect(() => {
    socket.on("IS_TYPING", ({ name }) => {
      //Concat the name of the user that is typing to " is typing..."
      const userTyp = userTyping;
      if (userTyp !== " is typing..") {
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
    console.log("called");
    if (isTyping !== false) setIsTyping(false);
    socket.emit("SEND_IS_NOT_TYPING", { room, name }, error => {
      console.log(error);
    });
  };

  const handleInputChange = e => {
    setMessage(e.target.value);
    let time;
    if (isTyping === false) {
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
                  <Messages
                    // messages={messages}
                    name={name}
                    socket={socket}
                    // onDelete={deleteMessage}
                    // onEdit={editMessage}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12 col-xs-12">
                  <Form socket={socket} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-xs-6 text-left">
                  <IsTyping userTyping={userTyping} />
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

// constructor(props) {
//   super(props);

//   this.state = {
//     username: queryString.parse(props.location.search),
//     message: "",
//     messages: []
//   };

//   this.socket = io("localhost:3005");

//   this.sendMessage = ev => {
//     ev.preventDefault();
//     this.socket.emit("SEND_MESSAGE", {
//       author: this.state.username.name,
//       message: this.state.message
//     });
//     this.setState({ message: "" });
//   };

//   this.socket.on("RECEIVE_MESSAGE", function(data) {
//     addMessage(data);
//   });

//   const addMessage = data => {
//     console.log(data);
//     this.setState({ messages: [...this.state.messages, data] });
//     console.log(this.state.messages);
//   };
// }
