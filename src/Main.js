import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import DocumentIcon from '@material-ui/icons/Description';
import ProgressIcon from '@material-ui/icons/AccessTime';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import AuthService from './services/AuthService';
import InsureSignLogo from './images/InsureSign_Logo_white.png';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login/LoginPage';
import Home from './home/Home';
import MyDocuments from './documents/MyDocuments';
import Upload from './Upload';
import AccountTabs from './account/AccountTabs';
import Grid from '@material-ui/core/Grid';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appWrapper: {
    marginTop: '80px',
    marginBottom: '80px',
    marginLeft: '40px',
    height: '100vh'
},
  flex: {
      flex: 1
  },
  img: {
    height: '3em',
    marginLeft: '20px'
  },
  direction: {
    direction: theme.direction
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appHeader: {
      paddingRight: '15px'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
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
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  }
});

class Main extends Component {
    constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      open: false
    };

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.routeTo = this.routeTo.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  routeTo(route) {
    window.location = route;
  }

  render() {
    const { classes } = this.props;
    const Auth = new AuthService();

    return (
        <div className={classes.root}>
          <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.appHeader}>
              {Auth.userAuthenticated() && (
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            )}
            <img alt="Logo" src={InsureSignLogo} className={classes.img} />

            <Typography className={classes.flex} variant="title" color="inherit" align="right" noWrap>
                {Auth.userAuthenticated() && (
                    <Button
                      color="inherit"
                      className={classes.loginButton}
                      onClick={() => {
                        Auth.deauthenticateUser();
                      }}
                    >
                      Sign out
                    </Button>
                )}
            </Typography>
          </Toolbar>
        </AppBar>
        {Auth.userAuthenticated() && (
          <Drawer
              variant="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
              }}
              open={this.state.open}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={this.handleDrawerClose}>
                 {classes.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <List>
                <ListItem button onClick={() => {
                  this.routeTo("/home");
                }}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={() => {
                  this.routeTo("/upload-in-process");
                }}>
                    <ListItemIcon>
                        <ProgressIcon />
                    </ListItemIcon>
                    <ListItemText primary="In Progress" />
                </ListItem>
                <ListItem button onClick={() => {
                  this.routeTo("/documents");
                }}>
                    <ListItemIcon>
                        <DocumentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Documents" />
                </ListItem>
                <ListItem button onClick={() => {
                  this.routeTo("/account");
                }}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                </ListItem>
              </List>
            </Drawer>
            )}
            <Router>
                <Grid container direction="column">
                    {/* Login intentionally does not take on appWrapper styles */}
                    <Route exact path="/" component={Login} />
                <div className={classes.appWrapper}>
                    <Route path="/home" component={Home} />
                    <Route path="/upload-in-process" component={Upload} />
                    <Route path="/documents" component={MyDocuments} />
                    <Route path="/account" component={AccountTabs} />
                </div>
                </Grid>
            </Router>
        </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
