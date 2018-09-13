import React, {Component} from "react";
import './ArticleContainer.css';
import {Button, ButtonToolbar} from "react-bootstrap";

export default class ArticleContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            count: 3,
            view: "scroll",
            showScrollButton: false
        }

    }

    toggleScroll(view) {
        console.log(this);
        this.setState({view: view})
    }

    onScroll(e) {
        let element = e.target;
        if (element.clientHeight < element.scrollHeight) {
            this.setState({showScrollButton: true})
        }
        e.stopPropagation();
    }

    showMore() {
        this.setState({
            count: this.state.count + 1,
            showScrollButton: false
        })
    }

    render() {
        const Content = (props) => {
            return props.articles.slice(0, props.count).map((article) => (
                <div className="content-border" key={article.title}>
                    <div>
                        <h1>
                            {article.title}
                        </h1>
                    </div>
                    <div className="content-container" onScroll={event => event.stopPropagation()}>
                        <div className="content">
                            <div>
                                <p>
                                    {article.text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ));
        };
        return (
            <div className="article">
                <div className="title">
                    <h1>{this.props.title}</h1>
                </div>
                <ButtonToolbar className="center">
                    <Button bsStyle="primary" onClick={() => this.toggleScroll("scroll")}>scroll</Button>
                    <Button bsStyle="success" onClick={() => this.toggleScroll("full")}>full</Button>
                    <Button bsStyle="info" className={this.state.showScrollButton ? "" : "hidden"}
                            onClick={this.showMore.bind(this)}>
                        more
                    </Button>
                </ButtonToolbar>
                <div className="container center">
                    <div className={`contents ${this.state.view}`} onScroll={this.onScroll.bind(this)}>
                        <Content articles={this.props.articles} count={this.state.count}/>
                    </div>
                </div>
            </div>
        )
    }
}