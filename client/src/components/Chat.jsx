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
import { mdiReload } from "@mdi/js";
import Icon from "@mdi/react";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

let socket;

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

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
      height: "73vh",
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
      height: "73vh",
      paddingRight: "0px"
    }
  }
}));

const Chat = ({ location }) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("main");
  const [avatar, setAvatar] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [searchMessagesResult, setSearchMessagesResult] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(" is typing..");

  const prevRoom = usePrevious(room);

  const ENDPOINT = "localhost:3005";
  const ROOMS = ["Main", "Chill", "Evening", "Room1", "Room2", "Room3"];

  useEffect(() => {
    const { name, avatar } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRooms(ROOMS);
    setAvatar(avatar);

    //Emmiting Join
    socket.emit("join", { name, avatar, room }, error => {
      console.log(error);
    });

    // Database fetch
    fetchMessages("main");

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    //When we get messages from server
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
    //We get the room data with users logged in
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [messages]);

  useEffect(() => {
    //We will not run this Effect on mount
    if (room === prevRoom || !prevRoom) {
      return;
    }

    // Emmiting change room to server
    socket.emit("CHANGE_ROOM", { room }, error => {
      console.log(error);
    });
    // Getting room data from server
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [room]);

  useEffect(() => {
    socket.on("IS_TYPING", ({ name }) => {
      //Concat the name of the user that is typing to " is typing..."
      const userTyp = userTyping;
      const string = name.concat(userTyp);
      setUserTyping(string);
    });

    socket.on("IS_NOT_TYPING", ({ message }) => {
      setUserTyping(message);
    });
  }, [isTyping]);

  //function for sending message
  const sendMessage = async ev => {
    ev.preventDefault();
    //We send the message and then we set the Input State to empty string
    if (message) {
      socket.emit("SEND_MESSAGE", message, () => {
        setMessage("");
      });

      let mess = { name, avatar, message, room };
      const response = await axios.post(`http://localhost:3005/messages`, mess);
    }
    fetchMessages(room);
  };

  const changeRoom = async Room => {
    // Return if click on the same room
    if (room === Room) {
      return;
    }

    fetchMessages(Room);
    setRoom(Room);
  };

  const searchMessages = async (value, type) => {
    const str = type === 0 ? `${value}` : `room/${room}/${value}`;

    const response = await axios.get(
      `http://localhost:3005/messages/search/${str}`
    );

    setSearchMessagesResult(response.data);
  };

  const fetchMessages = async room => {
    const response = await axios.get(
      `http://localhost:3005/messages/rooms/${room}`
    );
    setMessages(response.data.length >= 1 ? response.data : []);
  };

  const deleteMessage = async id => {
    const response = await axios.delete(
      `http://localhost:3005/messages/id/${id}`
    );

    //Create copy of messages and filter out the deleted message
    let copyMess = [...messages];
    setMessages(copyMess.filter(e => e._id !== id));
  };

  const editMessage = async (id, message) => {
    const response = await axios.put(
      `http://localhost:3005/messages/id/${id}`,
      {
        message
      }
    );

    //Create copy of messages and edit the state
    let copyMess = [...messages];
    let editedMess = copyMess.find(e => e._id === id);
    editedMess.message = message;
    let editedMessIndex = copyMess.findIndex(e => e._id === id);
    copyMess.splice(editedMessIndex, 1, editedMess);
    setMessages(copyMess);
  };

  const getLatestMessages = async () => {
    const response = await axios.get(
      `http://localhost:3005/messages/latest/${room}`
    );

    setMessages(response.data.reverse());
  };

  const typingstopped = () => {
    setIsTyping(false);
    socket.emit("SEND_IS_NOT_TYPING", { room, name }, error => {
      console.log(error);
    });
  };

  const handleInputChange = e => {
    setMessage(e.target.value);
    let time;
    if (isTyping === false) {
      setIsTyping(true);
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
            <Header
              searchMessages={(e, type) => {
                searchMessages(e, type);
              }}
              searchMessagesResult={searchMessagesResult}
            />
          </Grid>
          <Grid item md={2} xl={2} sm={12} xs={12} className="mt-3">
            <Box className={classes.roomHeightBreak}>
              <Rooms
                rooms={rooms}
                currentRoom={room}
                users={users}
                changeRoom={changeRoom}
              />
            </Box>
            <Box className="mt-4">
              <Box className={classes.chipsXS}>
                <Chip
                  avatar={
                    <Icon
                      path={mdiReload}
                      title="reload"
                      size={1}
                      color="white"
                    />
                  }
                  label={
                    <Typography
                      component="span"
                      variant="caption"
                      style={{ color: "white" }}
                    >
                      Fetch all
                    </Typography>
                  }
                  onClick={e => {
                    e.preventDefault();
                    fetchMessages(room);
                  }}
                  variant="outlined"
                />
                <Chip
                  avatar={
                    <Icon
                      path={mdiReload}
                      title="reload"
                      size={1}
                      color="white"
                    />
                  }
                  label={
                    <Typography
                      component="span"
                      variant="caption"
                      style={{ color: "white" }}
                    >
                      Last 10
                    </Typography>
                  }
                  onClick={e => {
                    e.preventDefault();
                    getLatestMessages();
                  }}
                  variant="outlined"
                  className="ml-2"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item md={10} xl={10} xs={12}>
            <div className="container-fluid">
              <div className="row">
                <div className={classes.messageHeightBreak + " col-md-12 mt-3"}>
                  <Messages
                    messages={messages}
                    name={name}
                    onDelete={deleteMessage}
                    onEdit={editMessage}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-xs-12">
                  <Form
                    onInputChange={handleInputChange}
                    message={message}
                    sendMessage={ev => {
                      sendMessage(ev);
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-xs-12 text-left">
                  <IsTyping userTyping={userTyping} />
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
