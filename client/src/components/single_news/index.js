import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSingleNews, likeNewsSingle, commentNewsSingle} from '../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';
import Preloader from '../preloader';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';

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
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        //width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });
  

class SingleNews extends Component {
    state={
      textComment: ""
    }
    componentDidMount(){
        this.props.getSingleNews(this.props.match.params.id);
    }
    likeNews(id ,newsId){
        this.props.likeNewsSingle(id , newsId);
    }
    onSubmit(id ,newsId){
        const createNewComment = {
          textComment: this.state.textComment,
          inputName: this.props.auth.user.name
        }
        this.props.commentNewsSingle(id, newsId, createNewComment);
    }
    onChangeComment(elem){
      let value = elem.target.value;
      this.setState({textComment: value});
      //console.log(this.state.textComment);
    }
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
                            <Typography component="h5">
                                {single.author}
                            </Typography>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                            <IconButton color="primary" aria-label="Add to favorites" onClick={this.likeNews.bind(this, single._id , this.props.match.params.id)}>
                              { single.likes.length === 0 &&
                                    <i className="material-icons">
                                      favorite_border
                                    </i>
                              }
                              { single.likes.length != 0 &&
                                    <i className="material-icons">
                                      favorite
                                    </i>
                              }
                              {
                                single.likes.map((userLikes, key) => {
                                  if(userLikes._id === this.props.auth.user.id){
                                      return <i key={key} style={{color:"#f50057"}} className="material-icons">favorite</i>
                                  }
                                })
                              }
                                {single.likes.length}
                            </IconButton>
                            <IconButton aria-label="Share" color="primary">
                                { single.comments.length === 0 &&
                                  <i className="material-icons">
                                    chat_bubble_outline
                                  </i>
                                }
                                { single.comments.length != 0 &&
                                  <i className="material-icons">
                                    forum
                                  </i>
                                }
                                {single.comments.length}
                            </IconButton>
                            </CardActions>
                        </Card>
                    {single.comments.map((elem , key)=> (
                            <Card key = {key} style={{marginTop:25}} className={classes.card}>
                                <div>
                                    <h3 style={{margin:15}}>{elem.name}</h3>
                                    <p style={{margin:15}}>{elem.text}</p>
                                </div>
                            </Card>
                        ))
                    }
                        <main className={classes.main}>
                          <CssBaseline />
                          <Paper className={classes.paper}>
                            <form className={classes.form}>
                              <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="comments">Comments</InputLabel>
                                <Input name="comments" id="comments" autoComplete="comments" onChange={this.onChangeComment.bind(this)}/>
                              </FormControl>
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.onSubmit.bind(this, single._id , this.props.match.params.id)}
                              >
                                Add comment
                              </Button >
                            </form>
                          </Paper>
                        </main>
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
    classes : PropTypes.object.isRequired,
    likeNewsSingle : PropTypes.func.isRequired,
    commentNewsSingle : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    news: state.news
});

export default connect(mapStateToProps, {getSingleNews, likeNewsSingle, commentNewsSingle })(withStyles(styles)(SingleNews));