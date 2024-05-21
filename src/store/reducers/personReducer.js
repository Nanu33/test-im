import {UPDATE_NAME} from '../actions/personActions';
const peronReducer = (state = {}, {type, payload, data}) => {
  console.log('aaaa payload', data);
  if (type === UPDATE_NAME) {
    return Object.assign({}, state, {name: payload, data: data});
  }
  return state;
};

export default peronReducer;
