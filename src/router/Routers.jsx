import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Bundle from './DynamicRoute';

import Page1 from 'bundle-loader?lazy!../Pages/Page1';
import Page2 from 'bundle-loader?lazy!../Pages/Page2';



export default (
  <div>
    <BrowserRouter basename={'app'} >
      <Switch>
        <Route path="/page1" component={(props)=>BundleCom(props, Page1)} />
        <Route path="/page2" component={(props)=>BundleCom(props, Page2)} />
      </Switch>
    </BrowserRouter>
  </div>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isLogin ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
const BundleCom = (props,loader) => {
    return (
      <Bundle load={loader}>
        {(Com) => <Com {...props}/>}
      </Bundle>
    )
}



