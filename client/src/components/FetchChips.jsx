import React from "react";
import { setRoom } from "../actions/roomActions";
import { connect } from "react-redux";
import { mdiReload } from "@mdi/js";
import Icon from "@mdi/react";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { getMessages, getLatestMessages } from "../actions/messagesActions";

const FetchChips = ({ room, getMessages, getLatestMessages }) => {
  return (
    <React.Fragment>
      <Chip
        style={{
          backgroundColor: "#1F2833",
          boxShadow: "0px 6px 16px -4px rgba(0,0,0,0.56)"
        }}
        avatar={<Icon path={mdiReload} title="reload" size={1} color="white" />}
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
          getMessages(room);
        }}
        variant="outlined"
      />
      <Chip
        style={{
          backgroundColor: "#1F2833",
          boxShadow: "0px 6px 16px -4px rgba(0,0,0,0.56)"
        }}
        avatar={<Icon path={mdiReload} title="reload" size={1} color="white" />}
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
          getLatestMessages(room);
        }}
        variant="outlined"
        className="ml-2"
      />
    </React.Fragment>
  );
};
const mapStateToProps = state => ({ room: state.room.item });

export default connect(
  mapStateToProps,
  { getMessages, getLatestMessages }
)(FetchChips);
