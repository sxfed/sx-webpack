import {
    queryMyFund_REQUEST
} from '../utils/ActionsType';

import  { FetchAPI as FetchPromise } from '../utils/fetch'


export function warnings(err) {
  return {
    type:ERROR,
    payload:err
  }
}

/*
*
* 接口请求
*
* */
export function queryMyFund(data) {
  return {
    types: [...queryMyFund_REQUEST],
    payload:data,
    promise:()=>{
     return FetchPromise("/trade/query/queryMyFund",'post',data)
    }
  };
}
