import React, { useState } from "react";
import {
  Box,
  ListItemText,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import EditIcon from "@material-ui/icons/Edit";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.grey,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const EditMessage = ({ onDelete, onEdit, id, thereIsId }) => {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <IconButton onClick={handleClick}>
        <Icon path={mdiMenu} title="Menu" size={1} color="white" />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem
          onClick={e => {
            e.preventDefault();
            onDelete(id);
          }}
        >
          <ListItemIcon>
            <DeleteIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography component="span" className="pl-3" variant="body2">
                Delete
              </Typography>
            }
          />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={e => {
            e.preventDefault();
            onEdit(id);
          }}
        >
          <ListItemIcon>
            <EditIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography component="span" className="pl-3" variant="body2">
                Edit
              </Typography>
            }
          />
        </StyledMenuItem>
      </StyledMenu>
    </Box>
  );
};

export default EditMessage;
