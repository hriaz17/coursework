import React from 'react';
import ProductItem from './ProductItem';
import { getProducts } from '../repository';
import { Link } from 'react-router-dom';

export default class ProductList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			sortFlag: true
		}
		this.sortProducts =this.sortProducts.bind(this);
	}

	sortProducts(){
		this.setState({sortFlag: true});
	}

	componentWillMount() {
		getProducts().then((products) => {
			if(this.state.sortFlag === false)
				this.setState({ products });
			else
			{
				products.sort((a, b) => a.price - b.price);
				this.setState({ products });
			}
	    });
	}


	render() {
		const { products } =  this.state;
		return (
			<div className=" container">
				<h3 className="card-title">List of Available Products</h3>
				<hr/>
				<button onClick={this.sortProducts}>sort by price</button>
				<hr/>
				{
					products.map((product, index) => <ProductItem product={product} key={index}/>)
				}
				<hr/>
				<Link to="/checkout"><button className="btn btn-success float-right">Checkout</button></Link>
				<Link to="/cart"><button className="btn btn-primary float-right" style={{  marginRight: "10px" }}>View Cart</button></Link>
				<br/><br/><br/>
			</div>
		);
	}
}
