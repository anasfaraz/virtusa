import React, { Component } from 'react';
import AuthenticationService from "../service/authentication";
export class ProductScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: [],
            
            
        };
    }
    componentDidMount() {
        AuthenticationService.FetchProductDetails(sessionStorage.getItem("product_id"))
            .then((res) => {
                console.log(res.data); this.setState({ product: res.data.message })
            })
            .catch(err => console.log("error " + err));
    }
    render() {
        return (
            <div>
         {this.state.product && 
              <div key={this.state.product.id}>
                    <div className="container-fluids" key={this.state.product.id}>

                    <div className="row">
                        <div className="col-md-6">
                        <img className="product-image"src={this.state.product.photo} alt=""></img>
                       </div>
                        <div className="col-md-6">
                            <div className="card ">

                                <div className="row">
                                    <div className="col-md-12">
                                <h1>{this.state.product.name}</h1>
                            </div>
                        </div>
                                <div className="row">
                            <div className="col-md-12">
                                        <span className="label label-primary">Mobiles</span>
                                        <span className="monospaced">product id:{this.state.product.id}</span>
                            </div>
                        </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className="description">
                                        {this.state.product.description}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                    <div className="col-md-12">
                                        <h2 className="product-price">Rs{this.state.product.price}</h2>
                                </div>
                            </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <span className="monospaced">In stock:{this.state.product.stock}</span>
                                </div>
                            </div>
                                <div className="row">
                                    <div className="col-md-3">
                                <div>Ratings</div>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star"></span>
                                </div>
                                    <div className="col-md-12">
                                        <span className="monospaced">Review:
                                    {this.state.product.review}</span>
                                </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                            {this.state.product.allReviews !=null ?
                              this.state.product.allReviews.map(review=>(
                                  
                                  <div className="card card-outline-secondary">
                                  <div className="col-md-12">
                                      <div className="card-header">
                                          Product Reviews
                                   </div>
                                          <p>comment:{review.comments}</p>
                                          <small className="text-muted">Posted by {review.reviewer_name}</small>
                                          <small className="text-muted">Posted on {review.date}</small>

                                          </div>
                                  </div>
                              )):<p></p>}
                              
                            </div>
                       </div>
                        </div>
                        </div>
                    </div>
                 </div>
                </div>
              }                    
            </div>
                    );
    }
}





















