import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import {Link} from "react-router-dom";
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'

class StoresPage extends React.Component {
    state = {
        stores: []

    }

    componentDidMount() {
        this.getFollowed();
    }

    getFollowed = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/user/get-all-stores", {
            params: {
                token: cookies.get("logged_in")
            }
        })
        .then((response) => {
            this.setState({
                stores: response.data
            })
        })
    }

    render = () => {
        return (
            <div>
                <h2>Store list</h2>
                <div style={{display:'flex', flexDirection:'column'}}>
                {
                    this.state.stores.map((store) => {
                        return (
                            <Link to={"/stores/" + store.id} key={store.id} style={{textDecoration: 'none',margin:'3px', padding:'3px', color:'black'}}>
                                <BsFillArrowUpRightCircleFill/> {store.name}
                            </Link>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

export default StoresPage;