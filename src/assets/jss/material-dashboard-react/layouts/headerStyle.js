import {
  transition,
  container,
} from "assets/jss/material-dashboard-react.js";

const appStyle = (theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      //width: `calc(50%)`,
      //marginLeft: 'calc(25%)',
    },
    overflow: "auto",
    position: "relative",
    //float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
  content: {
    marginTop: "70px",
    padding: "30px 0px",
    minHeight: "calc(100vh - 123px)",
    width: "50%",
    marginLeft: "25%",
  },
  loginContent: {
    marginTop: "70px",
    padding: "30px 0px",
    minHeight: "calc(100vh - 123px)",
    width: "40%",
    marginLeft: "30%",
  },
  mobileContent: {
    marginTop: "30px",
    padding: "30px 0px",
    minHeight: "calc(100vh - 123px)",
    width: "100%",
    marginLeft: "0",
  },
  container: {
    ...container,
    paddingLeft: "0px",
    paddingRight: "0px",
  },
  map: {
    marginTop: "70px",
  },
});

export default appStyle;
