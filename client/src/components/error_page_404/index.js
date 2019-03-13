import React, { Component } from 'react'

export default class ErrorPage extends Component {
  render() {
    return (
        <div className="error-page" style={{textAlign: 'center', marginTop: '20%'}}>
        <i className="material-icons" style={{fontSize: 200 , color: '#f50057'}}>
            error_outline
        </i>
        <h1 style={{color: '#3f51b5'}}>ERROR 404<br></br>Page not found</h1>
        </div>
    )
  }
}
