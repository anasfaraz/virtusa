import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginComponent from './login';
import MenuComponent from './menu';
import signup from './signup';
import logout from './logout';
import pattern from './pattern';
import Profile from './profile';
// import { Products } from '../admin/addproduct';
// import Updateproducts from '../admin/updateproduct';
import PatternValidation from './pattern_validation';
import PatternEdit from './pattern_edit';
import Adminlogin from '../admin/adminlogin';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductScreen } from '../screens/ProductScreen';
import Products from '../admin/addproduct';
class Routing extends Component {


    render() {
        return (
            <>
                <BrowserRouter>
                    <>
                        <MenuComponent />
                        <Switch>
                            <Route path="/signup" exact component={signup} />
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/HomeScreen" exact component={HomeScreen} />
                            <Route path="/pattern" exact component={pattern} />
                            <Route path="/patternv" exact component={PatternValidation} />
                            <Route path="/adminlogin" exact component={Adminlogin} />
                            <Route path="/addproduct" exact component={Products} />
                            <Route exact path="/product/:productid" exact component={ProductScreen} />                     
                            <Route path="/logout" exact component={logout} />
                            <Route path="/patterne" exact component={PatternEdit} />
                            <Route path="/profile" exact component={Profile} />
                        </Switch>
                    </>
                </BrowserRouter>
                
            </>
        )
    }
}

export default Routing