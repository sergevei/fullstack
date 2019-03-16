import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSingleNews} from '../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';
import Preloader from '../preloader';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
      backgroundColor: red[500],
    },
  });
  

class SingleNews extends Component {

    componentDidMount(){
        this.props.getSingleNews(this.props.match.params.id);
    }
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

  render() {
    const single  = this.props.news.singlenews;
    let SingleNewsLet;
    const { classes } = this.props;
    if( single === null || this.props.news.loading || !this.props.auth.isAuthenticated ){
        SingleNewsLet = <Preloader/>;
    }else{
        SingleNewsLet = (
            <div>
                {!isEmpty(single) &&
                    <div style={{marginTop:25}}>
                        <Card className={classes.card}>
                            <CardHeader
                            title={single.title}
                            subheader={single.category}
                            />
                            <CardMedia
                            className={classes.media}
                            image="https://upload.wikimedia.org/wikipedia/commons/c/c2/Alexandria_Waterfront_%282347809660%29.jpg"
                            //image={single.img}
                            title="Paella dish"
                            />
                            <CardContent>
                            <Typography component="p">
                                {single.allText}
                            </Typography>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                            <IconButton aria-label="Add to favorites">
                                <FavoriteIcon />
                                {single.likes.length}
                            </IconButton>
                            <IconButton aria-label="Share">
                                <i className="material-icons">
                                    question_answer
                                </i>
                                {single.comments.length}
                            </IconButton>
                            </CardActions>
                        </Card>
                    {single.comments.map(elem => (
                            <Card style={{marginTop:25}} className={classes.card}>
                                <div>
                                    <h3 style={{margin:15}}>{elem.name}</h3>
                                    <p style={{margin:15}}>{elem.text}</p>
                                </div>
                            </Card>
                        ))
                    }
                    </div>
                }
            </div>
        );
    }

    return (
      <div>
        {SingleNewsLet}
      </div>
    )
  }
}

SingleNews.propTypes = {
    auth : PropTypes.object.isRequired,
    getSingleNews : PropTypes.func.isRequired,
    news : PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    news: state.news
});

export default connect(mapStateToProps, {getSingleNews})(withStyles(styles)(SingleNews));