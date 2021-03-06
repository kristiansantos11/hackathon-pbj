/*

  This is the root of the page. This contains the dashboard along with routing
  of the pages

*/


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '@fontsource/roboto';
import './App.css';


/*

  Here we import the Components from the Components folder
  and probably pages from the Pages folder too

*/
import C_APPBAR from './Components/AppBar/AppBar';
import C_DRAWER from './Components/Drawer/Drawer';
import P_DASHBOARD from './Pages/Dashboard_leo/Dashboard';
import P_REPORTS from './Pages/Reports/Reports';
import Theme from './Utilities/Theme';
import { BrowserRouter as Router ,Route, Redirect, Switch } from 'react-router-dom';


/*
  This is a css, though not very straigtforward and
  has Material theme implementation already
*/

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
}));


/*

  This is the component class

*/
function App() {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>

      <Router>
          <ThemeProvider theme={Theme}>

            <CssBaseline />

            <C_APPBAR open={open} handleDrawerOpen={handleDrawerOpen} />
            
            <C_DRAWER open={open} handleDrawerClose={handleDrawerClose}  />
            
            <main className={classes.content}>
              <div className={classes.appBarSpacer}/>
              <Switch>

                <Route exact path = "/home">
                  <P_DASHBOARD/>
                </Route>

                <Route exact path = "/about">
                  <P_REPORTS/>
                </Route>

                <Redirect exact from="/" to="/home" />

              </Switch>
              
            </main>

          </ThemeProvider>
      </Router>
      
    </div>
    
  );
}

export default App;
