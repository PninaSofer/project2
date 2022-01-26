import './App.css';
import * as React from "react";

class Sale extends React.Component {
    
    renderDate(date){
        const elements = date.split('-');
        return elements[2] + "/" + elements[1] + "/" + elements[0];
    }

    handleRelevance(){
        if(this.props.isRelevant == true){
            return 'green';
        } else if(this.props.isRelevant == false){
            return 'red';
        }else{
            return 'white'
        }
    }

    render = () => {
        return (
            <div style={{width: '25vw', backgroundColor: this.handleRelevance()}}>
                <div style={{margin:'3px', padding:'3px', border:'1px solid #777'}}>
                    <div style={{backgroundColor:'antiquewhite', fontWeight:'bold'}}>Description: {this.props.sale.description}</div>
                    <div>Start date: {this.renderDate(this.props.sale.saleStart)}</div>
                    <div>End date: {this.renderDate(this.props.sale.saleEnd)}</div>
                    <div>Global: {this.props.sale.global.toString()}</div>
                </div>
            </div>
        )
    }
}

export default Sale;