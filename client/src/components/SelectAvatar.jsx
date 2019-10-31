import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import images from "../helpers/Images";
import Flickity from "react-flickity-component";
import { makeStyles } from "@material-ui/core/styles";
import "../Media/flickity.min.css";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Collapse,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatarSelected: {
    backgroundColor: "rgba(0, 0, 0, 0.08) !important"
  }
}));

const SelectAvatar = ({ onAvtClick }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [avatarIndexs, setAvatarIndexs] = useState([0, 12]);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onAvatarClick = (firstIndex, secondIndex) => {
    if (firstIndex === 0) {
      setSelectedAvatar(secondIndex + 1);
      onAvtClick(secondIndex + 1);
    }
    if (firstIndex === 1) {
      setSelectedAvatar(secondIndex + 13);
      onAvtClick(secondIndex + 13);
    }
    if (firstIndex === 2) {
      setSelectedAvatar(secondIndex + 25);
      onAvtClick(secondIndex + 25);
    }
  };

  const disableAvatar = (firstIndex, secondIndex) => {
    if (firstIndex === 0) {
      return selectedAvatar === secondIndex + 1;
    }
    if (firstIndex === 1) {
      return selectedAvatar === secondIndex + 13;
    }
    if (firstIndex === 2) {
      return selectedAvatar === secondIndex + 25;
    }
  };

  const CarouselBehaviour = () => {
    let dividedArr = Array(images.length / 12).fill(0);

    var copyAvatarIndexs = [...avatarIndexs];

    return dividedArr.map((e, i) => {
      if (i !== 0) {
        copyAvatarIndexs[0] += 12;
        copyAvatarIndexs[1] += 12;
      }

      return (
        <Grid container className="mb-2 pl-2 pr-2 mt-2" key={i}>
          {images
            .slice(copyAvatarIndexs[0], copyAvatarIndexs[1])
            .map((img, ind) => {
              return (
                <Grid
                  md={2}
                  item
                  key={ind}
                  className="d-inline-flex  justify-content-center"
                >
                  <IconButton
                    onClick={e => {
                      e.preventDefault();
                      onAvatarClick(i, ind);
                    }}
                    disabled={disableAvatar(i, ind)}
                    className={
                      disableAvatar(i, ind) ? classes.avatarSelected : ""
                    }
                  >
                    <Avatar src={img} />
                  </IconButton>
                </Grid>
              );
            })}
        </Grid>
      );
    });
  };

  return (
    <Box>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Flickity>{CarouselBehaviour()}</Flickity>
      </Collapse>
    </Box>
  );
};

export default SelectAvatar;
