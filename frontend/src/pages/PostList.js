import React, { Component } from 'react';

class PostList extends Component {

    constructor(props) {
        super(props)

        this.state={
            posts: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:3001/api/posts')
        .then(response =>{
            this.setState({
                posts: response.data
            })
            console.log(response.data)
        })
    }
    render(){
        return(
            <div>
                <h1>PostList</h1>
            </div>
        )
    }
}


