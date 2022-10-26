import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
//import Footer from "components/Footer/Footer.js";
//import Sidebar from "components/Sidebar/Sidebar.js";

// import { checkAuth } from "../redux/actions/aLogin";
import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/headerStyle.js";
import cookie from "react-cookies"

//import logo from "assets/img/reactlogo.png";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/" to="/list" />
  </Switch>
);

const useStyles = makeStyles(styles);

function Header({ ...props }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(window.innerWidth < 960);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {

      console.log(window.innerWidth)
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    } else {
      setMobileOpen(true)
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

console.log(cookie.load("token")?cookie.load("token"):"false")
  return (
    <div className={classes.wrapper}>
      {/*<Sidebar
        routes={routes}
        logoText={"Creative Tim"}
        logo={logo}
        image={null}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={'black'}
        {...rest}
      />*/}
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          //isAuthenticated={cookie.load("token") != undefined}
          {...props}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        <div className={mobileOpen?classes.mobileContent:classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
      </div>
    </div>
  );
}


export default Header
