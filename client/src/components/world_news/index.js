import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getWorldNews, likeNews} from '../../actions/profileActions';
import { connect } from 'react-redux';
import isEmpty from '../../validation/isEmpty';
import {Link} from 'react-router-dom';

const styles = {
  card: {
    //maxWidth: 345,
    margin: 25
  },
  media: {
    height: 200,
  },
};

class MediaCard extends Component {
    
    componentDidMount(){
        this.props.getWorldNews();
    }
    likeNews(id){
        this.props.likeNews(id);
    }

render(){
    const { classes } = this.props;
        return (
            <div className="main-content">
                <p style={{textAlign:"center"}}>World news</p>
            {!isEmpty(this.props.news.world) &&
                <div>
                {
                    this.props.news.world.map((item,index)=>(          
                        <div key={index}>
                            <Card className={classes.card}>
                                <div className="row">
                                    <div className="col-md-5">
                                        <CardActionArea>
                                            <CardMedia
                                            className={classes.media}
                                            image="https://upload.wikimedia.org/wikipedia/commons/c/c2/Alexandria_Waterfront_%282347809660%29.jpg"
                                            //image={item.img}
                                            title="Contemplative Reptile"
                                            />
                                        </CardActionArea>
                                    </div>
                                    <div className="col-md-7">
                                        <CardActionArea>
                                            <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {item.title}
                                            </Typography>
                                            <Typography component="p" style={{color:"rgb(171, 171, 171)"}}>
                                                {item.category}
                                            </Typography>
                                            <Typography component="p">
                                                {item.desc}
                                            </Typography>
                                            <Typography component="h5">
                                                {item.author}
                                            </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                        <Button size="small" color="primary" onClick={this.likeNews.bind(this, item._id)}>
                                            { item.likes.length === 0 &&
                                                <i className="material-icons">
                                                    favorite_border
                                                </i>
                                            }
                                            { item.likes.length !== 0 &&
                                                <i className="material-icons">
                                                    favorite
                                                </i>
                                            }
                                            {
                                                item.likes.map((userLikes, key) => {
                                                    if(userLikes._id === this.props.auth.user.id){
                                                        return <i key={key} style={{color:"#f50057"}} className="material-icons">favorite</i>
                                                    }
                                                    return null;
                                                })
                                            }
                                            {item.likes.length}
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
                                            <Button size="small" color="primary">
                                                Read more
                                            </Button>
                                        </Link>
                                        </CardActions>
                                        </div>
                                    </div>
                                </Card>
                        </div>          
                    ))
                }
                </div>
            }
            </div>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
    getWorldNews : PropTypes.func.isRequired,
    likeNews : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired,
    news : PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    news: state.news
});

export default connect(mapStateToProps, { getWorldNews ,likeNews })(withStyles(styles)(MediaCard));