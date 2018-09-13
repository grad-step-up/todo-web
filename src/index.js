import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from "./registerServiceWorker";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {Table} from "react-bootstrap";
import {connect, Provider} from "react-redux";
import {createStore} from "redux";

const MainPage = () => {
    return (
        <div>
            <div>
                <Link to="/hello">Hello</Link>
                <br/>
                <Link to="/world">World</Link>
            </div>
        </div>
    );
}
const ListPage = ({products}) => {
    console.log(products);
    return (
        <Table>
            <thead>
            <tr>
                <th>
                    Id
                </th>
                <th>
                    Product
                </th>
                <th>
                    Action
                </th>
            </tr>
            </thead>
            <tbody>
            {
                products.map(product => <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td><Link to={`/details/${product.id}`}>Details</Link></td>
                </tr>)
            }
            </tbody>
        </Table>
    );
};

const DetailPage = ({product}) => {
    // const product = products.find(value => value.id == match.params.id);
    return (
        <div className="w3-container w3-center w3-animate-opacity">
            <Link to="/">Go Back</Link>
            <div>Product Name: {product.name}</div>
            <div>Price: {product.price}</div>
            <div>Stock: {product.stock}</div>
            <div>Taxable: {product.taxable ? "YES" : "NO"}</div>
        </div>
    )
}

const mapProductsStateToProps = state => {
    return {products: state};
};
const RouterPage = () => {
    return <div>
        <BrowserRouter>
            <Switch>
                {/*<Route exact path="/" component={WrappedListPage}/>*/}
                <Route exact path="/" render={props => {
                    const WrappedListPage = connect(mapProductsStateToProps)(ListPage);
                    return <WrappedListPage/>;
                }}/>

                <Route path="/details/:id" render={(props) => {
                    console.log(props);
                    const WrappedDetailPage = connect((state) => ({
                        product: state.find(value => value.id == props.match.params.id)
                    }))(DetailPage);
                    return <WrappedDetailPage/>;
                }}/>
                <Route render={() => {
                    return (
                        <div className="w3-center">
                            <img
                                src="https://cdn.colorlib.com/wp/wp-content/uploads/sites/2/pure-css-free-404-error-page-templates.jpg" alt=""/>
                        </div>
                    )
                }}/>
            </Switch>
        </BrowserRouter>
    </div>;
};


function createProductStore() {

    const reducer = (state = [], action) => {
        return state;
    };

    const initialState = [
        {id: 1, name: "Book", price: 11, stock: 21, taxable: true},
        {id: 2, name: "Food", price: 12, stock: 22, taxable: false},
        {id: 3, name: "Computer", price: 13, stock: 23, taxable: true},
        {id: 4, name: "Watch", price: 14, stock: 24, taxable: false},
    ];

    return createStore(reducer, initialState);
}

ReactDOM.render(
    <Provider store={createProductStore()}>
        <RouterPage/>
    </Provider>, document.getElementById('root'));
// const Wrapper = filterDirtyWords(ArticleContainer);
// ReactDOM.render(<TabContainer/>, document.getElementById('content'));

// ReactDOM.render(<Wrapper articles={articles}/>, document.getElementById('content'));
// ReactDOM.render(<ToDo store={createToDoStore()}/>, document.getElementById('content'));


registerServiceWorker();
//
// let store = createToDoStore();
//
// store.subscribe(() => {
//     console.log("update:" + store.getState().map((value) => `${value.id}:${value.text}`));
// });
//
// store.dispatch({type: "DEL_TODO", todo: {id: 1}});
// store.dispatch({type: "ADD_TODO", todo: {text: "js bull shit"}});
//
//
