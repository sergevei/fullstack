import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class index extends Component {

    state = {
        tracks: [],
        hasMoreItems: true,
        nextHref: null
    };

    loadItems(page) {
            let self = page;
            var tracks = self.state.tracks;
            resp.collection.map((track) => {
                if(track.artwork_url == null) {
                    track.artwork_url = track.user.avatar_url;
                }

                tracks.push(track);
            });

            if(resp.next_href) {
                self.setState({
                    tracks: tracks,
                    nextHref: resp.next_href
                });
            } else {
                self.setState({
                    hasMoreItems: false
                });
            }
        }


  render() {
    const items = ["<div style={{height:500}}>asdasas</div>","<div style={{height:500}}>asdasas</div>","<div style={{height:500}}>asdasas</div>"];

    return (
      <div>
          <div style="height:700px;overflow:auto;">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadFunc}
                    hasMore={true || false}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={false}
                >
                    {items}
                </InfiniteScroll>
            </div>
      </div>
    )
  }
}
index.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    news: state.news
});

export default connect(mapStateToProps)(index);