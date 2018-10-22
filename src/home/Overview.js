import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
    root: {
        width: '100%'
    },
    flex: {
        flex: 1
    },
    displayName: {
        lineHeight: '4.7',
        marginLeft: '10px'
    },
    padding: {
        padding: `0 ${theme.spacing.unit * 2}px`,
    }
});

function Overview(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Typography variant="title" color="inherit" className={classes.flex}>
                <span className={classes.displayName}>Documents Overview</span>
            </Typography>
            <List component="nav">
                <ListItem>
                    <Badge color="primary" badgeContent={1}>
                        <Typography className={classes.padding}>Field Placement</Typography>
                    </Badge>
                </ListItem>
                <ListItem >
                    <Badge color="primary" badgeContent={2}>
                        <Typography className={classes.padding}>Waiting for my Signature</Typography>
                    </Badge>
                </ListItem>
                <ListItem>
                    <Badge color="primary" badgeContent={3}>
                        <Typography className={classes.padding}>Out for signature</Typography>
                    </Badge>
                </ListItem>
            </List>
        </div>
    );
}

Overview.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Overview);
