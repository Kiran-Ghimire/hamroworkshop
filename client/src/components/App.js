import React from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';



import Appointment from './Appointment';
import Contact from './Contact';
import Home from './Home';
import Services from './Services';
import Offers from './Offers';
import Header from './Header';
import  Login  from './Login/Login';
import  SignUp  from './Login/SignUp';

const App = () => {
    return (
        <div>
            <BrowserRouter>
            <div>
            <Header />
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/hamro/services" exact component={Services}/>
                <Route path="/hamro/appointment" exact component={Appointment}/>
                <Route path="/hamro/offers" exact component={Offers}/>
                <Route path="/hamro/contact" exact component={Contact}/>
                <Route path="/hamro/login" exact component={Login}/> 
                <Route path="/hamro/signup" exact component={SignUp}/>   
            </Switch>
            
            </div>
            </BrowserRouter>
        </div>
    )
};

export default App;
