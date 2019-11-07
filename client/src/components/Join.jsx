import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SelectAvatar from "./SelectAvatar";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#C5C6C7"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#C5C6C7"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#C5C6C7"
      },
      "&:hover fieldset": {
        borderBottomColor: "#C5C6C7"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#C5C6C7"
      }
    }
  }
})(TextField);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  floatingLabelFocusStyle: {
    color: "white"
  }
}));

const Join = () => {
  const classes = useStyles();

  const defaultProps = {
    borderColor: "#45A29E",
    m: 5,
    border: 3
  };
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(0);

  return (
    <Container
      maxWidth="sm"
      className="d-flex flex-column justify-content-center vh-100"
    >
      <Box
        borderRadius={16}
        {...defaultProps}
        style={{ backgroundColor: "#1F2833" }}
      >
        <Box className="text-center">
          <Typography
            variant="h2"
            style={{ color: "#66FCF1", fontWeight: "bold" }}
          >
            Join
          </Typography>
        </Box>

        <Divider variant="middle" />
        <Box className="text-center">
          <CssTextField
            InputLabelProps={{
              style: { color: "#C5C6C7" }
            }}
            InputProps={{
              style: { color: "#C5C6C7" }
            }}
            className={classes.margin}
            id="custom-css-standard-input"
            label="Username"
            value={username}
            onChange={e => {
              setUsername(e.target.value);
            }}
          />
        </Box>
        <Box className="text-center pt-2">
          <SelectAvatar
            onAvtClick={avt => {
              setAvatar(avt);
            }}
          />
        </Box>
        <Box className="text-center pt-2 pb-2">
          <Link
            onClick={e => (!username ? e.preventDefault() : null)}
            to={`/chat?name=${username}&avatar=${avatar}`}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#45A29E"
              }}
            >
              Go
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Join;
