import React, { useState } from "react";
import "./App.css";
import Nav from "./views/Nav";
import Home from "./views/Home";
import FavoritesView from "./views/FavoritesView";
import UserSearch from './views/UserSearchView';
import DetailsView from "./views/DetailsView";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

var _ = require('lodash')

const App = () => {
  //Used to populate favorites list and determine if gist is favorite
  const [favorites, setFavorites] = useState(null);
  //Used to populate usersearch list
  const [userGists, setUserGists] = useState(null);
  const [user, setUser] = useState("");
  const [lastUser, setLastUser] = useState(null);

  //Gist detail view
  const [previous, setPrevious] = useState('/');
  const [activeGist, setActiveGist] = useState(null);
  const [isFavorite, setIsFavorite] = useState();

  const getFavorites = () => {
    fetch('http://localhost:3010/getFavorites')
    .then(res => res.json())
    .then(result => {
      setFavorites(result.gists);
    });
  }
  
  const onUserChange = (_user) => {
    setUser(_user);
  }

  //Get a user's gists
  const getUserGists = (_user) => {
    setLastUser(null);
    fetch(`http://localhost:3010/getUserGists?username=${_user}`)
    .then(res => res.json())
    .then(
      (result) =>{
        setLastUser(_user)
        setUserGists(result.gists)
      }
    )
    if(!favorites)
      getFavorites();
  }

  const onViewGist = (gist, previous) => {
    //Set the active gist that is used in the gist detail view
    setActiveGist(gist);
    //Set the previous route that the back button will navigate to
    setPrevious(previous);
    //Check to see if the gist is in favorites
    var idx = _.findIndex(favorites, function(_gist){return _gist.id == gist.id })
    setIsFavorite(idx != -1)
  }

  //Adds a gist to favorites
  const saveFavorite = (gist) => {
    const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: gist.id})
    }
    fetch(`http://localhost:3010/favorite`, req)
    .then(res => res.json())
    .then(
      (result) => {
        //Add the gist to the favorites array
        favorites.push(gist);
        setFavorites(favorites);
        //Update the isFavorite variable
        if(activeGist.id == gist.id)
          setIsFavorite(true);
      }
    )
  }

  //Removes a gist from favorites
  const removeFavorite = (gist) => {
    const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: gist.id})
    }
    fetch(`http://localhost:3010/unfavorite`, req)
    .then(res => res.json())
    .then(
      (result) => {
        //Remove the gist from the favorites array
        var updatedFavorites = _.remove(favorites, function(_gist) { return _gist.id != gist.id});
        setFavorites(updatedFavorites);
        //Update the isFavorite variable that is used in the gist detail
        if(activeGist.id == gist.id)
          setIsFavorite(false);
      }
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />
          <Route path="search" element={
            <UserSearch
              user={user}
              lastUser={lastUser}
              gists={userGists}
              onGetUserGists={getUserGists}
              onViewGist={onViewGist}
              onUserChange={onUserChange}/>}
          />
          <Route path="favorites" element={
            <FavoritesView
              favorites={favorites}
                onGetFavorites={getFavorites}
                onViewGist={onViewGist}/>}
          />
          <Route path="details" element={
            <DetailsView
              saveFavorite={saveFavorite}
              removeFavorite={removeFavorite}
              isFavorite={isFavorite}
              previous={previous}
              gist={activeGist}/>}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;