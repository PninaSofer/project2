import './App.css';
import * as React from "react";
import axios from "axios";

import Sale from './Sale';

class StorePage extends React.Component {
    
    state = {
        sales: [],
        store:''
    }

    componentDidMount() {
        this.loadSales();
    }

    loadSales = () => {
        axios.get("http://localhost:8989/user/get-store-details", {
            params: {
                storeId: parseInt(this.props.match.params.id)
            }
        })
        .then((response) => {
            console.log(response.data);
            this.setState({
                store: response.data
            })
        })

        axios.get("http://localhost:8989/user/get-store-sales", {
            params: {
                storeId: parseInt(this.props.match.params.id)
            }
        })
        .then((response) => {
            this.setState({
                sales: response.data
            })
        })
    }

    render = () => {
        return (
            <div>
                <h1>{this.state.store.name} details</h1>
                <div style={{display:'flex', flexWrap:"wrap"}}>
                {
                    this.state.sales.map((sale) => <Sale key={sale.id} sale={sale} />)
                }
                </div>
            </div>
        )
    }
}

export default StorePage;