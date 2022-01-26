import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

class AssociationItem extends React.Component {
  state = {
      checked: this.props.checked,
      id: this.props.id
    }


  updateServer(isChecked){
    const serverUrl = 'http://localhost:8989/user/'
    const add = 'add-association';
    const remove = 'remove-association';
    let url = serverUrl;
    const cookies = new Cookies();
    const token = cookies.get("logged_in")
    if(isChecked === true){
        url += add;
    }else{
        url += remove
    }
    let data = new FormData();
    data.append("associationId", this.state.id);
    data.append("token", token);
    axios.post(url, data).then((response) => {
        console.log(response)
        if(response.data === false){
            alert('internal server error');
        }else{
        }
     }).catch(error => {
         console.log(error.response)
         console.log(error.request)
         console.log(error.message)
         console.log(error)
     })      
  }

  handleCheck(){
    this.updateServer(!this.state.checked)
    this.setState({ checked: !this.state.checked })
    
  }
  render() {
    return (
      <div>
        <label>
          {" "}
          {this.props.name}{" "}
          <input
            type="checkbox"
            checked={this.state.checked}
            value={this.state.checked}
            onChange={this.handleCheck.bind(this) }
          />{" "}
        </label>
      </div>
    );
  }
}

export default AssociationItem