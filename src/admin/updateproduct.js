import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { render } from 'react-dom';

export default class Updateproducts extends Component {
render(){
    return(<div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th>name</th>
                    <th>description</th>
                    <th>price</th>
                    <th>sold</th>
                    <th>stock</th>
                    <th>discount</th>
                </tr>
                <tbody>
                    {products.map(product => (
                        <tr key={product.name}>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.sold}</td>
                            <td>{product.stock}</td>
                            <td>{product.discount}</td>
                            <td>
                         <Button variant="info" onClick={() => this.props.editProduct(product.id)}>Edit</Button>
                    &nbsp;<Button variant="danger" onClick={() => this.deleteProduct(product.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <td>
                    <Button variant="info" onClick={() => this.props.editProduct(product.id)}>Edit</Button>
                    &nbsp;<Button variant="danger" onClick={() => this.deleteProduct(product.id)}>Delete</Button>
                </td>

            </thead>
            
        </table>
    </div>
    );
}
}