import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  alignselfcenter: { alignSelf: "center" }
}));
const Form = ({ onInputChange, message, sendMessage }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container>
      <Grid item md={10} xl={10} xs={8}>
        <TextField
          id="filled-full-width"
          fullWidth
          margin="normal"
          variant="filled"
          value={message}
          onChange={ev => onInputChange(ev)}
          onKeyPress={ev => (ev.key === "Enter" ? sendMessage(ev) : null)}
        />
      </Grid>
      <Grid
        item
        md={2}
        xl={2}
        xs={4}
        className={classes.alignselfcenter + " pl-2"}
      >
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<Icon>send</Icon>}
          size={matches ? "small" : "large"}
          onClick={ev => {
            sendMessage(ev);
          }}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
};

export default Form;
