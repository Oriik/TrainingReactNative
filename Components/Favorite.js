import React, { Component } from 'react'
import { connect } from 'react-redux'
import FilmList from './FilmList'


class Favorite extends Component{
    render(){        
        return(
        <FilmList
            films={this.props.favoritesFilm}
            navigation={this.props.navigation}
            currentPage='1'
            totalPages='1'
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
      favoritesFilm: state.favoritesFilm
    }
  }
  
  export default connect(mapStateToProps)(Favorite)