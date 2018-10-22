import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ContactsIcon from '@material-ui/icons/Contacts';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    flex: {
      flex: 1
    },
    displayName: {
      lineHeight: '4.7',
      marginLeft: '10px'
    }
});

class AccountTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid item>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        <span className={classes.displayName}>
                            <strong>Account</strong>
                        </span>
                    </Typography>
                </Grid>
                <Paper square className={classes.root}>
                    <Tabs
                      value={this.state.value}
                      onChange={this.handleChange}
                      fullWidth
                      indicatorColor="primary"
                      textColor="primary">
                        <Tab icon={<PersonIcon />} label="My Preferences" />
                        <Tab icon={<SettingsIcon />} label="Team Settings" />
                        <Tab icon={<GroupIcon />} label="Team Members" />
                        <Tab icon={<CreditCardIcon />} label="Billing" />
                        <Tab icon={<ContactsIcon />} label="My Contacts" />
                    </Tabs>
                </Paper>
            </div>
        );
    }
}

AccountTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountTabs);
