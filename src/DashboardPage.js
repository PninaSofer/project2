import './App.css';
import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";

import Sale from './Sale';

class DashboardPage extends React.Component {
    
    state = {
        token: "",
        content: "",
        sales: []
    }

    componentDidMount() {
        console.log('here');
        this.getSales()
    }

    onTextChange = (e) => {
        let content = e.target.value;
        this.setState({
            content: content
        })
    }

    // addPost = () => {
    //     const cookies = new Cookies();
    //     let data = new FormData();
    //     if (this.state.file) {
    //         data.append("file", this.state.file, this.state.file.name);
    //     }
    //     data.append("token", cookies.get("logged_in"));
    //     data.append("content", this.state.content);
    //     axios.post("http://localhost:8989/add-post", data, {
    //         headers: {'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p'}
    //     }).then((response) => {
    //             if (response.data) {
    //                 const currentPosts = this.state.posts;
    //                 currentPosts.unshift({
    //                     content: this.state.content,
    //                     date: "Few moments ago..."
    //                 })
    //                 this.setState({
    //                     posts: currentPosts
    //                 })
    //             } else {
    //                 alert("couldn't add post")
    //             }
    //         })
    // }


    getSales = () => {
        
        const cookies = new Cookies();
        axios.get("http://localhost:8989/user/get-sales", {
            params: {
                token: cookies.get("logged_in")
            }
        })
            .then((response) => {
                // console.log(response.data);
                this.setState({
                    sales: response.data
                })
            })
    }

    // removePost = (postId) => {
    //     const cookies = new Cookies();
    //     axios.get("http://localhost:8989/remove-post", {
    //         params: {
    //             token: cookies.get("logged_in"),
    //             postId
    //         }
    //     })
    //         .then((response) => {
    //             const currentPosts = this.state.posts;
    //             this.setState({
    //                 posts: currentPosts.filter((item) => {
    //                     return item.id != postId
    //                 })
    //             })
    //         })
    // }

    // onDrop(accepted, rejected) {
    //     if (accepted && accepted.length > 0) {
    //         this.setState({
    //             file: accepted[0]
    //         })

    //     }
    // };



    render() {
        return (
            <div>
                <h2>Dashboard</h2>
                <div style={{display:'flex', flexWrap:"wrap"}}>
                {
                    this.state.sales.map((sale) => <Sale key={sale.id} sale={sale} />)
                }
                </div>
            </div>
        )
    }
}

export default DashboardPage;