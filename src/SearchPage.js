import "./App.css";
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import Sale from "./Sale";

class SearchPage extends React.Component {
  state = {
    searchText: "",
    sales: [],
    stores: []
  };

  componentDidMount(){
    const cookies = new Cookies();
    axios.get("http://localhost:8989/user/get-stores", {
      params: {
          token: cookies.get("logged_in")
      }
    })
    .then((response) => {
        console.log(response.data);
        this.setState({
            stores: response.data
        })
    })
  }


  onSearch = () => {
    if (this.state.searchText.length === 0) {
      alert("Please enter a value to search");
      return;
    }
    const cookies = new Cookies();
    axios
      .get("http://localhost:8989/user/search-sales", {
        params: {
          token: cookies.get("logged_in"),
          search: this.state.searchText,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          sales: response.data,
        });
      });
  };

  isInStore(sale) {
    if(sale.isGlobal === true){
      return true;
    }

    const store = this.state.stores.find( (store) => store.storeObject.id === sale.storeObject.id)
    if(store){
      return true;
    }else{
      return false;
    }
  }

  render = () => {
    return (
      <div>
        <h1>Search Sales</h1>
        <input
          placeholder="Enter sale description"
          type="text"
          value={this.state.searchtext}
          onChange={(e) => this.setState({ searchText: e.target.value })}
        />
        <button type="button" disabled={this.state.searchText.length === 0} onClick={this.onSearch}>
          Search
        </button>
        <hr />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {this.state.sales.map((sale) => (
            <Sale key={sale.id} sale={sale} isRelevant={this.isInStore(sale)} />
          ))}
        </div>
      </div>
    );
  };
}

export default SearchPage;
