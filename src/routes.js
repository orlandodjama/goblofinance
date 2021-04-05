import React from 'react'
import { Route } from 'react-router-dom'
import Login from './containers/Login'
import Ajout from './containers/Ajout'
import Encaissement from './containers/Encaissement'


const BaseRouter = () => (
    <div>
        <Route exact path="/Login" component={Login}/>
        <Route exact path="/Ajout" component={Ajout}/>
        <Route exact path="/Encaissement" component={Encaissement}/>
    </div>
) ;

export default BaseRouter;