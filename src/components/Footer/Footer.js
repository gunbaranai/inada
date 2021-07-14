/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

// import logo from "assets/img/logo_footer.png"
// import address from "assets/img/address.png"
// import contact from "assets/img/contact.png"
import wholeFooter from "assets/img/footer.png"

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <img style={{maxWidth: '100%', maxHeight: '100vh', margin: 'auto'}} src={wholeFooter} />
      {/*<div className={classes.container}>
        <div className={classes.left}>
          <img src={logo} alt="logo" className={classes.img} />
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#home" className={classes.block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#company" className={classes.block}>
                Company
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#portfolio" className={classes.block}>
                Portfolio
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#blog" className={classes.block}>
                Blog
              </a>
            </ListItem>
          </List>*/}
        {/*</div>
        <p className={classes.right}>
          <img style={{marginRight: '25px'}} src={address} alt="address" className={classes.img} />
          <img style={{marginRight: '25px'}} src={contact} alt="contact" className={classes.img} />
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="https://www.creative-tim.com?ref=mdr-footer"
              target="_blank"
              className={classes.a}
            >
              Creative Tim
            </a>
            , made with love for a better web
          </span>
        </p>
      </div>*/}
    </footer>
  );
}
