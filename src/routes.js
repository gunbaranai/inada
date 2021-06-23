/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Report from "views/Report/Report.js";
import Tracker from "views/Tracker/Tracker.js";

const dashboardRoutes = [
  {
    path: "report",
    name: "Report",
    icon: Dashboard,
    component: Report,
    layout: "/",
  },
  {
    path: "track",
    name: "Tracker",
    icon: Dashboard,
    component: Tracker,
    layout: "/",
  },
];

export default dashboardRoutes;
