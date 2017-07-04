import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';



/*
 * 三类组件，公有组件无需用户权限，私有组件需要登陆状态，复用组件多条产品线复用。
 * 复用组件又分公有复用组件，和私有复用组件
 *
 * ***/


export class PublicComponent extends React.Component{

  static loginStatus;
  static userInfo;
  constructor(props, state){
    super(props, state);
      this.loginStatus = '';
      this.userInfo = '';
  }
}



export class ProtectedComponent extends React.Component{
  static loginStatus;
  static userInfo;
  constructor(props, state){
    super(props, state);
    this.loginStatus = isLogin();
    this.userInfo = getUserInfo();
    if(!this.loginStatus){
      this.props.history.push(`/page1`)
    }
  }
}


export const PublicContainer = (function(mapStateToProps,mapDispatchToProps,Component) {
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(Component));
});
