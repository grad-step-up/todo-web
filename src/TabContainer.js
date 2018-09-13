import React, {Component} from "react";
import './ArticleContainer.css';
import {Alert, Tab, Table, Tabs} from "react-bootstrap";
import {Calendar} from "react-calendar";

export default class TabContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabKey: "0"
        }
    }


    render() {
        function onSwitchTab(key) {
            this.setState({
                tabKey: key
            })
        }

        const TabsContainer = (props) => {
            return (
                <Tabs id="tabs-container" activeKey={this.state.tabKey} onSelect={onSwitchTab.bind(this)}>
                    {
                        props.children
                    }
                </Tabs>
            )

        };
        return (
            <TabsContainer>
                <Tab eventKey="0" title="calendar">
                    <Calendar/>
                </Tab>
                <Tab eventKey="1" title="table">
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="2" title="blah">
                    <Alert bsStyle="warning">
                        <strong>Piece of shit</strong>
                    </Alert>
                </Tab>
            </TabsContainer>
        )

    }
}