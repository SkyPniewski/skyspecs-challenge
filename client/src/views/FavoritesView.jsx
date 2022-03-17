import React from 'react';
import GistListItem from '../components/ListItem';
import { useNavigate } from 'react-router-dom';
const FavoritesView = (props) => {
    const navigate = useNavigate();

    //Function to update the active gist and then navigate to details view
    function viewGist(gist){
        props.onViewGist(gist, '/favorites');
        navigate('/details')
    }
    
    return (
        <div>
            FAVORITES
            {
                !props.favorites &&
                <button className="submit" onClick={props.onGetFavorites}>Load Favorites</button>
            }
            <ul>
                {props.favorites &&
                 props.favorites.map((gist, index) => {
                    return (
                        <GistListItem gist={gist} key={`favoriteItem_${index}`} viewGist={viewGist}></GistListItem>
                    )
                })}
            </ul>
            {
                props.favorites && props.favorites.length == 0 &&
                <div>YOU DON'T HAVE ANY FAVORITES</div>
            }
        </div>
    )
};

export default FavoritesView;