import { queryMyFund_REQUEST } from '../utils/ActionsType';
const initialState ={
  errMsg:'',
  myFund:{},
};

export default function (state = initialState,actions ) {

  switch (actions.type){
    case queryMyFund_REQUEST[1]:
      return {
        ...state,
        myFund:actions.result,
        reqMsg:'',
      };
    case 'FAILURE':

      return {
        ...state,
        errMsg:actions.error.msg,
      };
    default:
      return state
  }
}
