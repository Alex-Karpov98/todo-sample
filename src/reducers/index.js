import { combineReducers } from 'redux';
import { RootNavigator } from '../navigations/AppNavigation';

const firstAction = RootNavigator.router.getActionForPathAndParams('List');
const initialNavState = RootNavigator.router.getStateForAction(
  firstAction
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialState = { todos: [] };
for (let i = 1; i < 30; i++) {
  initialState.todos.push({
    id: i,
    title: 'Task-' + i,
    content: 'Content : ' + i,
    completed: i % 2 == 0 ? true : false,
  })
}

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'add':
      return { todos: [...state.todos, action.payload] };
    case 'delete':
      return {
        todos: state.todos.filter((todo) => {
          return todo.id != action.payload.id;
        })
      };
    case 'update':
      return {
        todos: state.todos.map((todo) => {
          if (todo.id == action.payload.id) {
            return action.payload;
          } else {
            return todo;
          }
        })
      };
    default:
      return state;
  }
}


const AppReducer = combineReducers({
  nav,
  todosReducer,
});

export default AppReducer;
