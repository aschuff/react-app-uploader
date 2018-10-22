import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AuthService from './services/AuthService';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: '100%',
    fontFamily: theme.typography.fontFamily
  },
  flex: {
    flex: 1,
    lineHeight: '0.8rem',
    fontSize: '1.2rem'
  },
  footerLinks: {
    color: '#296b9c'
  },
  appFooter: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: '#f5f5f5'
  }
});

function Footer(props) {
  const { classes } = props;
  const Auth = new AuthService();
  const footerDate = new Date().getFullYear();

  return (
    <div className={classes.root}>
      {Auth.userAuthenticated() && (
        <AppBar position="fixed">
          <Toolbar className={classes.appFooter}>
            <Typography
              variant="title"
              color="primary"
              align="left"
              className={classes.flex}
            >
              <Grid container spacing={8} justify="flex-start">
                <Grid item xs={12} sm={5}>
                  <small>Copyright &copy; {footerDate} InsureSign</small>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <small>
                    <a
                      className={classes.footerLinks}
                      href="https://insuresign.com/security/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Security
                    </a>{' '}
                    |{' '}
                    <a
                      className={classes.footerLinks}
                      href="https://insuresign.com/terms-of-service/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms of Service
                    </a>{' '}
                    |{' '}
                    <a
                      className={classes.footerLinks}
                      href="http://assist.insuresign.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Help
                    </a>{' '}
                    |{' '}
                    <a
                      className={classes.footerLinks}
                      href="mailto:help@insuresign.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contact
                    </a>
                  </small>
                </Grid>
              </Grid>
            </Typography>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
