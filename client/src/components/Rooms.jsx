import React, { useEffect, useState, useRef } from "react";
import { List, Box } from "@material-ui/core";
import Room from "./Room";
import ScrollToBottom from "react-scroll-to-bottom";
import { makeStyles } from "@material-ui/core/styles";
import { setUsers } from "../actions/usersActions";
import { getMessages } from "../actions/messagesActions";
import { setRoom } from "../actions/roomActions";
import { connect } from "react-redux";

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useStyles = makeStyles({
  root: {
    backgroundColor: "#1F2833",
    boxShadow: "0px 6px 16px -4px rgba(0,0,0,0.56)",
    color: "white",
    overflow: "auto",
    height: "100%"
  },
  room: {
    backgroundColor: "#1F2833"
  },
  messageBox: { alignItems: "flex-end" }
});

const Rooms = ({ socket, room, setRoom, setUsers, getMessages, users }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [rooms, setRooms] = useState([]);

  const prevRoom = usePrevious(room);

  const ROOMS = ["Main", "Chill", "Evening", "Room1", "Room2", "Room3"];

  useEffect(() => {
    //We will not run this Effect on mount
    if (!prevRoom) setRooms(ROOMS);
    if (room === prevRoom || !prevRoom) return;

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

  const changeRoom = async Room => {
    // Return if click on the same room
    if (room === Room) {
      return;
    }

    getMessages(Room);
    setRoom(Room);
  };

  const handleListItemClick = (event, index) => {
    event.preventDefault();
    changeRoom(rooms[index].toLowerCase());
    setSelectedIndex(index);
  };

  console.log(room);
  return (
    <ScrollToBottom className={classes.root}>
      <List className={classes.room}>
        {ROOMS.map((ROOM, i) => {
          return (
            <Box key={i}>
              <Room
                roomName={ROOM}
                index={i}
                users={users}
                currentRoom={room}
                selectedIndex={selectedIndex}
                handleListItemClick={handleListItemClick}
              />
            </Box>
          );
        })}
      </List>
    </ScrollToBottom>
  );
};

const mapStateToProps = state => ({
  users: state.users.items,
  room: state.room.item
});

export default connect(
  mapStateToProps,
  { setUsers, getMessages, setRoom }
)(Rooms);
