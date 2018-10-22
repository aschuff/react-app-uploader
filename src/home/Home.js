import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../services/AuthService';
import Overview from './Overview';
import Upload from '../Upload';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Intercom from 'react-intercom';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: '20px',
    fontFamily: theme.typography.fontFamily
  },
  flex: {
    flex: 1
  },
  img: {
    padding: '7px',
    height: '4em',
    float: 'left'
  },
  displayName: {
    lineHeight: '4.7',
    marginLeft: '10px'
  }
});

class Home extends Component {
    constructor(props) {
        console.log('props: ', props);
    super(props);
    this.Auth = new AuthService();
    this.state = {
      userAuthenticated: this.Auth.userAuthenticated(),
      user: this.Auth.getUser()
    };
    console.log('this.state.user: ', this.state.user);
    // this.updateDocuments = this.updateDocuments.bind(this);
  }
  render () {
      const { classes } = this.props;

      const { from } = this.props.location.state || { from: { pathname: '/' } };
      const { userAuthenticated } = this.state;
      const { user } = this.state;

      const intercomUser = {
        user_id: user.id,
        email: user.email,
        name: user.name
      };

      if (userAuthenticated === false || user === false) {
          return <Redirect to={from} />;
      }
      return (
        <div className={classes.root}>
            <Intercom appID="l12315zt" {...intercomUser} />
            <Grid item>
              <Typography variant="title" color="inherit" className={classes.flex}>
                <span className={classes.displayName}>
                  {user.groupData.logoUrl && (
                    <img
                      alt="Logo"
                      className={classes.img}
                      src={user.groupData.logoUrl}
                    />
                  )}
                  <strong>Welcome</strong> {user.name}
                </span>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={10}>
                <Overview />
            </Grid>
            <Grid item>
                <Upload />
            </Grid>
        </div>
      );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
