import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../services/AuthService';
import DocumentService from '../services/DocumentService';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Intercom from 'react-intercom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
  table: {
    minWidth: 700,
  },
  flex: {
    flex: 1
  },
  displayName: {
    lineHeight: '4.7',
    marginLeft: '10px'
  }
});

class MyDocuments extends Component {
    constructor(props) {
        console.log('props: ', props);
        super(props);
        this.Auth = new AuthService();
        this.Documents = new DocumentService();
        this.state = {
            userAuthenticated: this.Auth.userAuthenticated(),
            theDocuments: [],
            user: this.Auth.getUser()
        };
        console.log('MyDocuments this.state: ', this.state);
        // this.updateDocuments = this.updateDocuments.bind(this);
    }

    componentDidMount() {
        this.getDocuments();
    }

    // updateDocuments() {
    //     this.getDocuments();
    // }

    getDocuments() {
        return this.Documents.getDocuments()
        .then((response) => {
            this.setState({
              theDocuments: response
            });
            console.log('response: ', response);
            console.log('MyDocuments this.state.theDocuments: ', this.state.theDocuments);

        });
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
                      <strong>My Documents</strong>
                    </span>
                  </Typography>
                </Grid>
                {/* <Grid item xs={12} lg={10}> */}
                    {/* filters go here */}
                {/* </Grid> */}
                <Grid item>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Document name (search bar here)</TableCell>
                                    <TableCell numeric>Participants</TableCell>
                                    <TableCell numeric>Created</TableCell>
                                    <TableCell numeric>Status</TableCell>
                                    <TableCell numeric>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                           {this.state.theDocuments.map(theDocument => {
                               return (
                                <TableRow key={theDocument.id}>
                                    <TableCell component="th" scope="row">
                                        {theDocument.title}
                                    </TableCell>
                                    <TableCell numeric>{theDocument.userId}</TableCell>
                                    <TableCell numeric>{theDocument.created}</TableCell>
                                    <TableCell numeric>{theDocument.status}</TableCell>
                                    <TableCell numeric>action here</TableCell>
                                </TableRow>
                                );
                            })}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </div>
        );
    }
}

MyDocuments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyDocuments);
