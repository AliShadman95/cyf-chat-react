import React from "react";
import { List, Box } from "@material-ui/core";
import Room from "./Room";
import ScrollToBottom from "react-scroll-to-bottom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#404346",
    color: "white",
    overflow: "auto",
    height: "100%"
  },
  room: {
    backgroundColor: "#404346"
  },
  messageBox: { alignItems: "flex-end" }
});

const Rooms = ({ rooms, currentRoom, changeRoom, users }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    event.preventDefault();

    // let currentUrlParams = new URLSearchParams(window.location.search);
    // currentUrlParams.set("room", rooms[index].toLowerCase());
    // history.push(window.location.pathname + "?" + currentUrlParams.toString());
    changeRoom(rooms[index].toLowerCase());
    setSelectedIndex(index);
  };
  return (
    <ScrollToBottom className={classes.root}>
      <List className={classes.room}>
        {rooms.map((room, i) => {
          return (
            <Box key={i}>
              <Room
                roomName={room}
                currentRoom={currentRoom}
                index={i}
                users={users}
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

// export default withRouter(Rooms);
export default Rooms;
