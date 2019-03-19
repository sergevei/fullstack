import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getPopularNews,getSingleNews} from '../../../actions/profileActions';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import {Link} from 'react-router-dom';

const styles = {
  card: {
    //maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

class MediaCard extends Component{

  reloadSinglePage(id){
    this.props.getPopularNews();
    this.props.getSingleNews(id);
  }

  componentDidMount(){
    this.props.getPopularNews();
  }
  render(){
    const { classes } = this.props;
    const news = this.props.news;
    return (
        <div>
          <p>Popular</p>
          {!isEmpty(news.popular) &&
            <div>
              { news.popular.map((item,index)=>(        
                            <Card className={classes.card} key={index} style={{marginTop:25}}>
                              <CardActionArea>
                                  <CardContent>
                                  <Typography gutterBottom variant="h5" component="h2">
                                      {item.title}
                                  </Typography>
                                  <Typography component="p">
                                      {item.desc}
                                  </Typography>
                                  </CardContent>
                              </CardActionArea>
                              <CardActions>
                              <Button size="small" color="primary">
                                            {item.likes.length}
                                            <p style={{marginLeft:5,marginRight:5}}>LIKES</p>
                                            {
                                                item.likes.map((userLikes, key) => {
                                                    if(userLikes._id === this.props.auth.user.id){
                                                        return <i key={key} style={{color:"#f50057"}} className="material-icons">favorite</i>
                                                    }
                                                    return null;
                                                })
                                            }
                                        </Button>
                                        <Button size="small" color="primary">
                                            { item.comments.length === 0 &&
                                                <i className="material-icons">
                                                    chat_bubble_outline
                                                </i>
                                            }
                                            { item.comments.length !== 0 &&
                                                <i className="material-icons">
                                                    forum
                                                </i>
                                            }
                                            {item.comments.length}
                                        </Button>
                                  <Link to={"/single-news/"+item._id}>
                                      <Button size="small" color="primary" onClick={this.reloadSinglePage.bind(this, item._id)}>
                                        Learn More
                                      </Button>
                                  </Link>
                              </CardActions>
                          </Card>
                ))}
            </div>
          }
      </div>
    );
  }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  getPopularNews: PropTypes.func.isRequired,
  getSingleNews: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  news: state.news
});

export default connect(mapStateToProps, { getPopularNews ,getSingleNews })(withStyles(styles)(MediaCard));