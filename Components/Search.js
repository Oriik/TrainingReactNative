import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'
import { connect } from 'react-redux'

class Search extends Component{

constructor(props){
    super(props)
    this.state = {
         films: [ ],
         isLoading: false
        }
    this.searchedText =""
    this.currentPage = 0
    this.totalPages = 0
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    _searchFilms(){
        this.currentPage = 0
        this.totalPages = 0
        this.setState(
            {
          films: []
            },
            () => this._loadFilms() //Callback because setState is async
        )
    }

    _loadFilms(){
        if(this.searchedText.length == 0) return;

        this.setState({isLoading : true})

        getFilmsFromApiWithSearchedText(this.searchedText, this.currentPage+1).then(data => {
            this.currentPage = data.page
            this.totalPages = data.total_pages
            this.setState({
                films: [ ...this.state.films, ...data.results ],
                isLoading: false            
            })
        })
    }    

    _searchTextInputChanged(text){
        this.searchedText = text
    }

    _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' color="#0000ff" />
            </View>
          )
        }
      }

    render(){        
        return(
        <View style={styles.main_container}>
            <TextInput style={styles.textinput} placeholder='Titre du film' 
            onChangeText={(text) => this._searchTextInputChanged(text) }
            onSubmitEditing={() => this._searchFilms()}
            />
            <Button title="Rechercher" onPress={() => this._searchFilms()}/>
            <FlatList
                data={this.state.films}
                extraData={this.props.favoritesFilm}
                renderItem= {({item}) => 
                    <FilmItem 
                        film={item} 
                        displayDetailForFilm={this._displayDetailForFilm}
                        isFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                        />}
                keyExtractor={(item)=>item.id.toString()}   
                onEndReachedThreshold={0.5}
                onEndReached={()=>{
                    if (this.currentPage < this.totalPages) {
                        this._loadFilms()
                    }
                }}
            />
            {this._displayLoading()}
        </View>  
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop : 50
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 20,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }      
})

const mapStateToProps = (state) => {
    return {
      favoritesFilm: state.favoritesFilm
    }
  }
  
  export default connect(mapStateToProps)(Search)