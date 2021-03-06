import React, { Component } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import FilmItem from './FilmItem'


class FilmList extends Component{
    
    constructor(props) {
        super(props)
        this.state = {
          films: []
        }
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    render(){
        return(
            <FlatList
            style={styles.list}
            data={this.props.films}
            extraData={this.props.favoritesFilm}
            keyExtractor={(item)=>item.id.toString()}  
            renderItem= {({item}) => 
                <FilmItem 
                    film={item} 
                    displayDetailForFilm={this._displayDetailForFilm}
                    isFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                    />}        
            onEndReachedThreshold={0.5}
            onEndReached={() => {
                if (this.props.currentPage < this.props.totalPages) {
                    this.props.loadFilms()
                }
            }}/>
        )
    }
}

const styles = StyleSheet.create({
    list: {
      flex: 1
    }
  })
  
const mapStateToProps = state => {
    return {
      favoritesFilm: state.favoritesFilm
    }
}
  
export default connect(mapStateToProps)(FilmList)