/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Hidden from '@material-ui/core/Hidden';
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

// import logo from "assets/img/logo_footer.png"
// import address from "assets/img/address.png"
// import contact from "assets/img/contact.png"
import footerXl from "assets/img/footer_xl.png"
import footerLg from "assets/img/footer_lg.png"

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Hidden only={['xs', 'sm', 'md', 'lg']}>
        <img style={{maxWidth: '1280px', margin: 'auto', marginBottom: '0'}} src={footerXl} />
      </Hidden>
      <Hidden only={['xs', 'sm', 'md', 'xl']}>
        <img style={{maxWidth: '1280px', margin: 'auto', marginBottom: '0'}} src={footerLg} />
      </Hidden>
      <Hidden only={['xs', 'sm', 'lg', 'xl']}>
        <img style={{maxWidth: '960px', margin: 'auto', marginBottom: '0'}} src={footerLg} />
      </Hidden>
    </footer>
  );
}
