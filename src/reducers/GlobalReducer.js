import {TOAST,LOADING} from '../utils/ActionsType';
const initialState ={
  fuiToast:false,
  fuiLoading:false,
}

export default function (state = initialState,actions ) {
  const {payload} = actions;
  switch (actions.type){
    case TOAST:
      return {
        ...state,
        fuiToast:payload
      };
    case LOADING:
      return {
        ...state,
        fuiLoading:payload
      };
    default:
      return state
  }
}
