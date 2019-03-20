import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSingleUser } from '../../actions/findUserActions';
import Preloader from '../preloader';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import CardContent from '@material-ui/core/CardContent';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/isEmpty';

const styles = theme => ({
    card: {
      //maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: "#3f51b5",
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 3,
        width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inline:{
        display: 'inline-flex'
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        //width: 200,
        },
    }
  });

class PreviewUser extends Component {

    componentDidMount(){
        this.props.getSingleUser(this.props.match.params.id);
    }

    render() {

        const userProfile = this.props.users.singleUser[0];
        let SingleUserLet;
        const { classes } = this.props;

        if(isEmpty(userProfile)){
            SingleUserLet = <Preloader/>;
        }else{
            SingleUserLet = (
                <Card className={classes.card} style={{margin:"5px 0"}}>
                                <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                        {
                                            (userProfile.name).substr(0,2)
                                        }
                                    </Avatar>
                                }
                                title={userProfile.name}
                                subheader={userProfile.email}
                                />
                                 <CardContent style={{textAlign:"center"}} className={classes.CardContent}>
                                    <Typography component="p">
                                        ID: {userProfile.id}
                                    </Typography>
                                    {!userProfile.profile &&
                                        <div>
                                            <Typography component="p">
                                                Phone: {userProfile.contactNumber}
                                            </Typography>
                                            <Typography component="p">
                                                About: {userProfile.aboutYourself}
                                            </Typography>
                                            <Typography component="p">
                                                Status: {userProfile.status}
                                            </Typography>
                                            <Typography component="p">
                                                News posted: {userProfile.numNews}
                                            </Typography>
                                            <div>
                                                {userProfile.social.vk &&
                                                    <p>VK: {userProfile.social.vk}</p>
                                                }
                                                {userProfile.social.facebook &&
                                                    <p>Facebook: {userProfile.social.facebook}</p>
                                                }
                                                {userProfile.social.instagram &&
                                                    <p>instagram: {userProfile.social.instagram}</p>
                                                }
                                                {userProfile.social.github &&
                                                    <p>github: {userProfile.social.github}</p>
                                                }
                                            </div>
                                        </div>
                                    }

                                    {userProfile.profile &&
                                        <Typography component="p">
                                             {userProfile.profile}
                                        </Typography>
                                    }
                                </CardContent>
                    </Card>
            );
        }
        return(
            <div>
                {SingleUserLet}
            </div>
        );
    }
}

PreviewUser.propTypes = {
    auth: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    getSingleUser : PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    users: state.users
});

export default connect(mapStateToProps, { getSingleUser })(withStyles(styles)(PreviewUser));