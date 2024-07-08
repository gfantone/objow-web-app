import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    activeColorPrimary: {
      "& svg": {
        color: theme.palette.primary.main,
      },
    },
  };
});
const CarouselDots = ({ totalSlides, activeStep, onChange }) => {
  const themeClasses = useStyles();

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <IconButton
          key={index}
          onClick={() => onChange(index)}
          sx={{
            p: 0,
            mx: 0,
            opacity: activeStep === index ? 1 : 0.3,
          }}
          classes={{
            root: activeStep === index ? themeClasses.activeColorPrimary : "",
          }}
        >
          <FiberManualRecordIcon />
        </IconButton>
      ))}
    </Box>
  );
};

export default CarouselDots;
