import React from "react";
import Typography from "@material-ui/core/Typography";

const IsTyping = ({ userTyping }) => {
  return (
    <Typography component="span" variant="caption" style={{ color: "white" }}>
      {userTyping !== " is typing.." && userTyping}
    </Typography>
  );
};

export default IsTyping;
