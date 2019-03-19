import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/findUserActions';
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

class FindUser extends Component {

    state = {
        search: ""
    }

    componentDidMount(){
        this.props.getAllUsers();
    }

    onChangeSearch(elem){
        let value = elem.target.value;
        this.setState({search: value});
        //console.log(this.state.search);
    }

  render() {
    const users = this.props.users.users;
    let SingleUserLet;
    const { classes } = this.props;

    if( users === null || this.props.users.loading || !this.props.auth.isAuthenticated ){
        SingleUserLet = <Preloader/>;
    }else{
        SingleUserLet = (
            <div>
                <div>
                    <div style={{boxShadow:"0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",padding:"15px 0", margin:"25px 0 0 0 "}}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                onChange={this.onChangeSearch.bind(this)}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                    </div>
                </div>
                { 
                    users.map( (user,key) => (
                        <div key={key}>

                            {!(user._id.indexOf(this.state.search) ===-1 
                            && user.email.indexOf(this.state.search) ===-1 
                            && user._id.indexOf(this.state.search) ===-1) &&

                            <Card className={classes.card} style={{margin:"5px 0"}}>
                                <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                        {
                                            (user.name).substr(0,2)
                                        }
                                    </Avatar>
                                }
                                title={user.name}
                                subheader={user.email}
                                />
                                 <CardContent style={{textAlign:"center"}}>
                                    <Typography component="p">
                                        ID: {user._id}
                                    </Typography>
                                </CardContent>
                            </Card>}
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div>
            {SingleUserLet}
        </div>
    )
  }
}

FindUser.propTypes = {
    auth: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    getAllUsers : PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    users: state.users
});

export default connect(mapStateToProps, { getAllUsers })(withStyles(styles)(FindUser));