import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthenticationService from "../service/authentication";
import { toast } from 'react-toastify';



export default class Products extends Component {

state = {
      name: "",
      description: "",
      price:"",
      sold:"",
      stock:"",
      discount:"",
      loading: false,
      message: ""};


  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]
          : event.target.value
      }
    )
  }
  handleSubmit= async (e) => {
    e.preventDefault();
    const data = {
      name:this.state.name,
      description:this.state.description,
      price:this.state.price,
      sold:this.state.sold,
      discount:this.state.discount,
      stock:this.state.stock
    }
    console.log(data);
    // this.setState({
    //   message: "",
    //   loading: true
    // });
    AuthenticationService.FetchAddProduct(data).then(res=>toast.success("Product added")).catch(err=>toast.error("Failed to add"))
  

  }


  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
         
          <Form>

            <div className="form-group">
              <label htmlFor="name">Name</label>

              <Input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Input
                type="text"
                className="form-control"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">price</label>

              <Input
                type="text"
                className="form-control"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sold">Sold</label>

              <Input
                type="text"
                className="form-control"
                name="sold"
                value={this.state.sold}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock</label>

              <Input
                type="text"
                className="form-control"
                name="stock"
                value={this.state.stock}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="discount">Discount</label>

              <Input
                type="text"
                className="form-control"
                name="discount"
                value={this.state.discount}
                onChange={this.handleChange}
              />
            </div>
           
            <div className="form-group">
              <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>
                <span>Submit</span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
export {Products}