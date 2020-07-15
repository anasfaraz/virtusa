import React, { Component } from 'react';
import AuthenticationService from "../service/authentication";
import {Link} from 'react-router-dom';

export class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        AuthenticationService.FetchHomeProducts(sessionStorage.getItem("id")).then(res => this.setState({ products: res.data.message}))
        
    }
    render() {
        const { products } = this.state;
        console.log(products);
    return (
      <div key="{product.id}">
        {products.map(product => (
            <div key={product.id}> 
            <div className="container-fluid">
              <div className="row">
              <div className="col-sm-4">
                <div className="cards">
                            <Link to={'/product/' + product.id} onClick={()=>{sessionStorage.setItem("p",product.id)}}><img src={product.photo} className="pic" alt="" ></img></Link>
                            <Link to={'/product/' + product.id} onClick={() => { sessionStorage.setItem("p", product.id) }}><h5 className="card-title"><button>{product.name}</button></h5></Link>
                        <p className="price">Rs.{product.price}</p>
                            <p>Sold:{product.sold}</p>

                        <p>{product.description}</p>
                  
                 </div>
                    </div>
                </div>
                </div>
            </div>
             ))}       
            
         </div>
    );
}
}























