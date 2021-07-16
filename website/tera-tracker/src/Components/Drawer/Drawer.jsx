import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import PeopleIcon from '@material-ui/icons/People';

import { useHistory, useLocation } from 'react-router'

let mainListItems = [
    {
        text: 'Dashboard',
        icon: <DashboardIcon color='secondary'/>,
        path: '/home'
    },
    {
        text: 'Building',
        icon: <BarChartIcon color='secondary'/>,
        path: '/reports'
    },
]

let secondaryListItems = [
    {
        text: 'About',
        icon: <PeopleIcon color='secondary'/>,
        path: '/about'
    },
]

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    active: {
        background: '#F4F4F4'
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {  
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
        },
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));


function C_DRAWER(props) {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();

  return (
      <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
            }}
            open={props.open}
        >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={props.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>  
        <Divider />
            <List>
                {mainListItems.map((e,i)=>(
                    <ListItem 
                        button
                        key = {`sidenav_${i}`}
                        onClick = {() => history.push(e.path)}
                        className = {location.pathname === e.path ? classes.active : null}
                    >
                      <ListItemIcon>
                        {e.icon}
                      </ListItemIcon>
                      <ListItemText primary={e.text} />
                    </ListItem>
                ))}
            </List>
        <Divider />
            <List>
                {secondaryListItems.map((e,i)=>(
                    <ListItem 
                        button
                        key = {`sidenav_${i}`}
                        onClick = {() => history.push(e.path)}
                        className = {location.pathname === e.path ? classes.active : null}
                    >
                      <ListItemIcon>
                        {e.icon}
                      </ListItemIcon>
                      <ListItemText primary={e.text} />
                    </ListItem>
                ))}
            </List>
      </Drawer>
  );
}

export default C_DRAWER;
