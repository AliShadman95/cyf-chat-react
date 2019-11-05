import React, { useState } from "react";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import EditMessage from "../components/EditMessage";
import images from "../helpers/Images";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import { Twemoji } from "react-emoji-render";
import { connect } from "react-redux";
import { editMessage } from "../actions/messagesActions";

const useStyles = makeStyles(theme => ({
  whiteText: {
    color: "white !important"
  },
  date: {
    color: "grey !important",
    fontSize: 12 + "px !important"
  },
  menuRight: {
    textAlign: "right"
  }
}));

const calendarStrings = {
  lastDay: "[Yesterday at] LT",
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  lastWeek: "[last] dddd [at] LT",
  nextWeek: "dddd [at] LT",
  sameElse: "L"
};

const Message = ({
  message,
  name,
  date,
  avatar,
  editMessage,
  id,
  room,
  socket
}) => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  const handleDialogClose = () => {
    setIsEditing(!isEditing);
  };
  const handleDialogConfirm = e => {
    setIsEditing(!isEditing);
    sendEditMessage(e);
  };

  const handleChange = e => {
    e.preventDefault();
    setEditedMessage(e.target.value);
  };

  const onEdit = e => {
    setIsEditing(true);
  };

  const sendEditMessage = e => {
    e.preventDefault();
    editMessage(id, editedMessage);
    setIsEditing(false);
    socket.emit("EDIT", { room, id }, () => {});
  };

  return (
    <React.Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={images[avatar]} />
        </ListItemAvatar>

        <ListItemText
          primary={
            <React.Fragment>
              <Typography>
                {name + "  "}
                <Moment calendar={calendarStrings} className={classes.date}>
                  {date}
                </Moment>
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              {!isEditing && (
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.whiteText}
                >
                  {message}
                  {/* <Twemoji svg text={message} /> */}
                </Typography>
              )}
            </React.Fragment>
          }
        />
        {isEditing && (
          <Dialog
            open
            onClose={handleDialogClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Edit</DialogTitle>
            <DialogContent>
              <DialogContentText>Edit the message..</DialogContentText>

              <TextField
                id="standard-name"
                autoFocus
                value={editedMessage}
                onChange={e => handleChange(e)}
                margin="normal"
                fullWidth
                onKeyPress={ev =>
                  ev.key === "Enter" ? sendEditMessage(ev) : null
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={e => {
                  handleDialogConfirm(e);
                }}
                color="primary"
              >
                Edit
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {name !== "Admin" && (
          <Box className={classes.menuRight}>
            <EditMessage onEdit={onEdit} id={id} socket={socket} />
          </Box>
        )}
      </ListItem>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({ room: state.room.item });

export default connect(
  mapStateToProps,
  { editMessage }
)(Message);
