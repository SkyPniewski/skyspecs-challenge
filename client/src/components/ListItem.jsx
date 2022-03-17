import React from 'react';

class GistListItem extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <li>
                <a href={this.props.gist.url} target="_blank">{this.props.gist.url}</a>
                <div>Description: {this.props.gist.description}</div>
                <div>Created At: {this.props.gist.created_at}</div>
                <button onClick={() => this.props.viewGist(this.props.gist)}>View</button>
          </li>
        )
    }
}

export default GistListItem;