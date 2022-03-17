import React from 'react';
import GistListItem from '../components/ListItem';
import { useNavigate } from 'react-router';
const UserSearch = (props) => {
    const navigate = useNavigate()

    function viewGist(gist){
        props.onViewGist(gist, '/search');
        navigate('/details')
    }

    function handleSubmit(e){
        props.onGetUserGists(props.user)
        e.preventDefault();
    }

    return(
        <div>
            ENTER A USER
            <form onSubmit={handleSubmit}>
                <input
                    defaultValue={props.user}
                    onChange={(e) => props.onUserChange(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
            <ul>
                { props.gists && props.gists.length > 0 &&
                  props.gists.map((gist, index) => {
                    return (
                        <GistListItem gist={gist} key={`searchItem_${index}`} viewGist={viewGist}/>
                    )
                    })
                }
            </ul>
                {props.lastUser && props.gists && props.gists.length == 0 &&
                    <div>NO GISTS FOUND FOR {props.lastUser}</div>
                }
        </div>
    );
};

export default UserSearch;