import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '10%',
    fontFamily: theme.typography.fontFamily
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  margin: {
    marginBottom: '15px'
  },
  errorMessage: {
    color: '#f44336',
    margin: 0,
    fontSize: '0.75rem',
    minHeight: '1em',
    marginTop: '8px',
    marginBottom: '16px',
    fontFamily: 'Gudea',
    lineHeight: '1em'
},
formLink: {
    textTransform: 'none'
},
linkLeft: {
    float: 'left',
    fontSize: '14px',
    color: theme.palette.primary.main
},
linkRight: {
    float: 'right',
    fontSize: '14px',
    color: theme.palette.text.primary
}
});

function LoginForm(props) {
  const {
    classes,
    onSubmit,
    onChange,
    hasError,
    hasHelperText,
    formError
  } = props;

  return (
    <div className={classes.root}>
        <Grid container justify="center">
        <Grid item md={3}>
          <Paper className={classes.paper}>
            <form action="/" onSubmit={onSubmit}>
              <h2 className="card-heading">InsureSign Login</h2>
              <div>
                <TextField
                  placeholder="email"
                  name="email"
                  type="text"
                  error={hasError}
                  onChange={onChange}
                  helperText={hasHelperText}
                  className={classes.margin}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  placeholder="password"
                  name="password"
                  type="password"
                  error={formError && true}
                  onChange={onChange}
                  className={classes.margin}
                  fullWidth
                />
              </div>
              {props.formError && (
                <p className={classes.errorMessage}>{formError}</p>
              )}
              <div>
                <Button
                  type="submit"
                  variant="raised"
                  label="Login"
                  color="primary"
                  fullWidth
                  className={classes.margin}
                >
                  Login
                </Button>
              </div>
              <Grid container direction="row" justify="space-between" alignItems="center">
                  <Grid item xs>
                      <a className={classes.formLink + classes.linkLeft}>
                        Forgot password?
                    </a>
                    </Grid>
                    <Grid item xs>
                        <a className={classes.formLink + classes.linkRight}>
                            <Checkbox />
                            Remember me
                        </a>
                    </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        </Grid>
    </div>
  );
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(LoginForm);
