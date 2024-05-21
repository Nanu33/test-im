import {updateGame} from '../actions/gameActions';
const gameReducer = (state = {}, {type, payload}) => {
  switch (type) {
    case updateGame:
      return {name: payload};
    default:
      return state;
  }
};

export default gameReducer;
