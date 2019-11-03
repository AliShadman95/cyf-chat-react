import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { connect } from "react-redux";
import { postMessage } from "../actions/messagesActions";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B0B2B5"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red"
      },
      "&:hover fieldset": {
        borderColor: "#76787D"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#76787D"
      }
    }
  }
})(TextField);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {},
  alignselfcenter: { alignSelf: "center" },
  button: { boxShadow: "0px 6px 16px -4px rgba(0,0,0,0.56)" }
}));
const Form = ({ postMessage }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [inputValue, setInputValue] = React.useState("");

  const onInputChange = ev => {
    setInputValue(ev.target.value);
  };

  const sendMessage = ev => {
    ev.preventDefault();
    let mess = { name: "test", avatar: "1", message: inputValue, room: "main" };
    postMessage(mess);
    setInputValue("");
  };
  return (
    <Grid container>
      <Grid item md={10} xl={10} xs={8}>
        <CssTextField
          className={classes.margin}
          id="filled-full-width"
          fullWidth
          margin="normal"
          value={inputValue}
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

export default connect(
  null,
  { postMessage }
)(Form);
