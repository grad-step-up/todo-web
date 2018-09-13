import React, {Component} from 'react';
import './App.css';
import {Button} from "react-bootstrap";



class App extends Component {



    render() {
        this.setState({isDetail: true});

        const DetailPage = (props) => {
            return <Button detail={props.product}/>
        };
        const ListPage = (props) => {
            return <div>detail</div>
        };

        if(this.state.isDetail) {
            return (
                <DetailPage detail={this.state.products[0]}/>
            );
        }else {
            return (
                <ListPage products={this.state.products}/>
            );
        }
    }
}

export default App;
