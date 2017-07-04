import { combineReducers} from 'redux';
import  GlobalReducer  from './GlobalReducer';
import  PromiseReducer  from './PromiseReducer';

const mainReducer = combineReducers({
  GlobalReducer,
  PromiseReducer,
});

export default  mainReducer;

