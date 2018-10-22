import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// https://react-dropzone.js.org/#examples
import Dropzone from 'react-dropzone';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';
import AuthService from './services/AuthService';
import DocumentService from './services/DocumentService';
import _ from 'lodash';

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
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  dropzone: {
    borderStyle: 'dotted',
    borderColor: 'gray'
  }
});

class Upload extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.Docs = new DocumentService();

    this.state = {
      files: [],
      user: this.Auth.getUser(),
      theDocuments: []
    };
    this.updateTheDocuments = this.updateTheDocuments.bind(this);
    console.log('this.state: ', this.state);
  }

  componentDidMount() {
    this.getUploadedDocuments();
  }

  updateTheDocuments() {
    this.getUploadedDocuments();
  }

  getUploadedDocuments() {
    return this.Docs.getUploadedDocuments().then((uploadedDocs)=> {
      for (var i = 0; i < uploadedDocs.Items.length; i++) {
        const savedUploadDocument = uploadedDocs.Items[i];
        savedUploadDocument.name = savedUploadDocument.id;
        this.state.theDocuments.push(savedUploadDocument);
      }
    }).then((allDocuments)=> {
      this.setState({
        files: this.state.theDocuments
      });
    });
  }

  onDrop(files) {
    this.setState({
      files
    });

    const file = _.toPlainObject(files[0]);
    const params = {
      name: file.name,
      size: file.size,
      type: file.type,
      userId: this.state.user.id
    }

    const createQueryParams = params =>
    Object.keys(params).map(k => `${k}=${encodeURI(params[k])}`).join('&');

    const queryParams = createQueryParams(params)
    console.log('queryParams', queryParams);

    return axios.post(`https://dev-go.insuresign.com/api/users/files`, queryParams).then((presignedResponse)=> {
      console.log('presignedResponse', presignedResponse);
      params.id = presignedResponse.data.id;
      params.url = presignedResponse.data.url;
      params.mimeType = presignedResponse.data.mimeType;
      const theDocument = {
        id: params.id,
        processing: true,
        converting: false,
        filename: params.name
      };
      this.state.theDocuments.push(theDocument);

      console.log('theDocument', theDocument);
      console.log('this.state.theDocuments', this.state.theDocuments);
      // use raw XMLHttpRequest instead of fileItem.upload() to work around IE limitation
      // http://stackoverflow.com/questions/29220569/direct-uploading-to-aws-s3-signaturedoesnotmatch-only-for-ie
      const xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open('PUT', params.url, true);
      xmlHttpRequest.setRequestHeader('Content-Type', params.mimeType);

      xmlHttpRequest.onload = function () {
        if (xmlHttpRequest.status !== 200) {
          console.log('No onload');
        }
      };

      const hasFileExtension = theDocument.filename.match(/\..*/);
      if (hasFileExtension) {
        xmlHttpRequest.send(files[0]);
      } else {
        console.log('Bad xmlHttpRequest');
      }
    }).catch((err)=> {
      console.log('err', err);
    })
  }
  render() {
    const { classes } = this.props;
    console.log('this.state', this.state);
    return (
      <div className={classes.root}>
        <Typography variant="title" color="inherit" className={classes.flex}>
          <span className={classes.displayName}>Upload a Document for Participants to Sign</span>
        </Typography>
        <div>
            <Dropzone className={classes.dropzone} onDrop={this.onDrop.bind(this)} multiple={true}>
              <Button variant="contained" color="default" className={classes.button}>
                Upload
                <CloudUploadIcon className={classes.rightIcon} />
              </Button>
              <Typography component="p">
                OR Drag and Drop a File/Document
              </Typography>
                {
                  this.state.theDocuments.map(f =>
                      <li key={f.name}>{f.name} - {f.size} bytes</li>
                  )
                }
            </Dropzone>
        </div>
      </div>
    );
  }
}

Upload.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Upload);
