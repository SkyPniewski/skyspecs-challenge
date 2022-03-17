import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DetailsView = (props) => {
    const navigate = useNavigate();

    return (
        <div>
          {/* Navigate to previous list */}
          <button onClick={() => navigate(props.previous)}>
            Back
          </button>
          <div>
            { /* Display correct button depending on if gist is favorited */
              props.isFavorite ?
              <button className="unfavorite" onClick={() => props.removeFavorite(props.gist)}>Unfavorite</button> :
              <button className="favorite" onClick={() => props.saveFavorite(props.gist)}>Favorite</button>
            }
          </div>
          <a href={props.gist.url} target="_blank">{props.gist.url}</a>
                <div>Description: {props.gist.description}</div>
                <div>Created At: {props.gist.created_at}</div>

          <h2>Files</h2>
          <div>
            <ul>
            {/* List any files the gist has */}
            {props.gist.files && Object.keys(props.gist.files).map((key, index) => {
              return(
                <li key={`file_${index}`}><a href={props.gist.files[key].raw_url} target="_blank">{key}</a></li>
              )
              })}
              </ul>
          </div>
      </div>
    );
}

export default DetailsView;