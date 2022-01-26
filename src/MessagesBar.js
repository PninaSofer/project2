import './App.css';
import * as React from "react";
import Cookies from "universal-cookie";

class MessagesBar extends React.Component {
    

    state = {
        ws:null,
        messages:[],
        currentPos:0,
        intervalId:null
    }

    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get("logged_in")
        const tempWs = new WebSocket("ws://localhost:8989/stream?token="+token)
        tempWs.onmessage = (message) => {
            const msg = JSON.parse(message.data);
            if(msg.test){
                //console.log(msg);
            }else{
                this.setState({messages:msg})
                // alert(msg.msg);
            }
        }
        this.setState({ws: tempWs});
        const intervalId = setInterval( () => {
            let pos = this.state.currentPos + 1;
            if(pos === this.state.messages.length){
                pos = 0;
            }
            this.setState({currentPos:pos});

        }, 5000)
        this.setState({intervalId})
    }

    componentWillUnmount(){
        if(this.state.intervalId){
            clearInterval(this.state.intervalId);
            this.setState({intervalId: null})
        }
    }

    render() {
        return (
            <div style={{marginRight: "20px", marginLeft: "20px", border: "1px solid", padding: "5px", marginTop:'20px'}}>
                
                <div>
                {
                    this.state.messages.length > 0 && (
                    <div style={{display:'flex', justifyContent:'start'}}>
                        <h3 style={{marginRight: '3vw'}} >{this.state.messages[this.state.currentPos].title}</h3>
                        <h4>{this.state.messages[this.state.currentPos].message}</h4>
                    </div>)
                }
                </div>

            </div>
        )
    }
}
export default MessagesBar;
