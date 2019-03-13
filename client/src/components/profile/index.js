import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Preloader from '../preloader';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        color: "#fff",
        borderColor : "#fff"
      }
});

class Profile extends Component {

    componentDidMount(){
        this.props.getCurrentProfile();
    }
    render() {

    const { user ,isAuthenticated} = this.props.auth;
    const { profile , loading } = this.props.profile;
    const { classes } = this.props.classes;

    let profileContent;

    if( profile === null || loading || !isAuthenticated ){
        profileContent = <Preloader/>;
    }else{
        //Check user profile
        if(Object.keys(profile).length>0){
            //Has profile
            profileContent=<h1>Has profile</h1>
        }else{
            //Hasn't profile
            profileContent = (
                <div className="col-md-12">
                     <h1>Hello, {user.name}</h1>
                     <Link to="/create-profile">
                        <Button variant="contained" color="primary" className={this.props.classes.button}>
                            Create you profile now!
                        </Button>
                    </Link>
                </div>
            );
        }
    }

    return (
      <div>
          <h1>PROFILE</h1>
          <div className="col-md-12">{profileContent}</div>
      </div>
    )
  }
}

Profile.propTypes = {
    getCurrentProfile : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {getCurrentProfile})(withStyles(styles)(Profile));