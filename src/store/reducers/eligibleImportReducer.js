import {eligibleImportData} from '../actions/eligibleImportActions';
const eligibleImportReducer = (state = {}, {type, payload, data}) => {
  console.log('aaaa payload', data);
  if (type === eligibleImportData) {
    return Object.assign({}, state, {name: payload, data: data});
  }
  return state;
};

export default eligibleImportReducer;
