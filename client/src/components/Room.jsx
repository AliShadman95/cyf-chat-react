import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Avatar,
  List,
  Typography,
  Collapse,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";
import images from "../helpers/Images";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  roomsXS: {
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    }
  },
  avatarMini: {
    width: "18px",
    height: "18px"
  },
  avatarListMini: {
    minWidth: "0px",
    paddingLeft: "4%"
  },
  dots: {
    color: "white !important",
    paddingLeft: "2%",
    paddingTop: "4%"
  }
}));

const Room = ({
  roomName,
  users,
  index,
  currentRoom,
  selectedIndex,
  handleListItemClick
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const onRoomClick = (event, index) => {
    if (roomName.toLowerCase() === currentRoom.toLowerCase()) {
      setOpen(!open);
    }
    handleListItemClick(event, index);
  };

  return (
    <React.Fragment>
      <ListItem
        button
        className={classes.roomsXS}
        selected={selectedIndex === index}
        onClick={event => onRoomClick(event, index)}
      >
        <Box>
          <ListItemText>{roomName}</ListItemText>
        </Box>
        {roomName.toLowerCase() === currentRoom.toLowerCase() &&
          users.map(({ avatar, room }, i) => {
            if (i > 4) {
              return (
                room.toLowerCase() === currentRoom.toLowerCase() && (
                  <Typography
                    component="span"
                    variant="caption"
                    className={classes.dots}
                  >
                    ...
                  </Typography>
                )
              );
            }

            return (
              room.toLowerCase() === currentRoom.toLowerCase() && (
                <ListItemAvatar key={i} className={classes.avatarListMini}>
                  <Avatar className={classes.avatarMini} src={images[avatar]} />
                </ListItemAvatar>
              )
            );
          })}
      </ListItem>
      <Collapse
        in={selectedIndex === index && open}
        timeout="auto"
        unmountOnExit
      >
        <List dense>
          {users.map(({ avatar, name }, i) => {
            return (
              <ListItem key={i}>
                <ListItemAvatar>
                  <Avatar src={images[avatar]} />
                </ListItemAvatar>
                <ListItemText primary={name} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default Room;
