import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Preloader from '../preloader';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ProfileActions from '../profile_actions';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
      }
});

class Profile extends Component {

    componentDidMount(){
        this.props.getCurrentProfile();
    }
    
    onDeleteAccount (e) {
        e.preventDefault();
        
        if(window.confirm("Delete your account?")){
            this.props.deleteAccount();
        }
    }

    render() {

    const { user ,isAuthenticated} = this.props.auth;
    const { profile , loading } = this.props.profile;
    const { classes } = this.props;

    let profileContent;

    if( profile === null || loading || !isAuthenticated ){
        profileContent = <Preloader/>;
    }else{
        //Check user profile
        if(Object.keys(profile).length>0){
            //Has profile
            profileContent=(
                <div>
                    <h1>Hello, {user.name}</h1>
                        { profile.aboutYourself && <p>{profile.aboutYourself}</p> }
                        { profile.handle && <p>{profile.handle}</p> }
                        { profile.contactNumber && <p>{profile.contactNumber}</p> }
                        { profile.status && <p>{profile.status}</p> }
                        { profile.contactEmail && <p>{profile.contactEmail}</p> }
                    <h1>Socila links</h1>
                        { profile.social &&
                            <div>
                                { profile.social.vk && <p>{profile.social.vk}</p> }
                                { profile.social.facebook && <p>{profile.social.facebook}</p> }
                                { profile.social.instagram && <p>{profile.social.instagram}</p> }
                                { profile.social.github && <p>{profile.social.github}</p> }
                            </div>
                        }
                    <ProfileActions/>

                    {/*DELETE ACCOUNT
                    <Button variant="outlined" color="primary" className={classes.button} onClick={this.onDeleteAccount.bind(this)}>
                            <i className="material-icons">
                                delete_sweep
                            </i>
                            Delete Profile
                    </Button>
                    */}
                </div>
            );
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
    deleteAccount : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {getCurrentProfile , deleteAccount})(withStyles(styles)(Profile));