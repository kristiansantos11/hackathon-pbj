/*

  This is the root of the page. This contains the dashboard along with routing
  of the pages

*/


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';


/*

  Here we import the Components from the Components folder
  and probably pages from the Pages folder too

*/
import C_APPBAR from './Components/AppBar/AppBar';
import C_DRAWER from './Components/Drawer/Drawer';
import P_DASHBOARD from './Pages/Dashboard/Dashboard';
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
            
            <main>
              <Switch>

                <Route exact path = "/home">
                  <P_DASHBOARD/>
                </Route>

                <Redirect from="/" to="/home" />

              </Switch>
            </main>

          </ThemeProvider>
      </Router>
      
    </div>
    
  );
}

export default App;
