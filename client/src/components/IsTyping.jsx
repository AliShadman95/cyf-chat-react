import React from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const IsTyping = ({ userTyping }) => {
  return (
    <Typography component="span" variant="caption" style={{ color: "white" }}>
      {userTyping !== " is typing.." && userTyping}
    </Typography>
  );
};

const mapStateToProps = state => ({ userTyping: state.userTyping.item });

export default connect(
  mapStateToProps,
  {}
)(IsTyping);
