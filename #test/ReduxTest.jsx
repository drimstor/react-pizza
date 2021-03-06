/* -------------- Redux -------------- */

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);

store.subscribe(() => console.log('хранилище изменилось -', store.getState()));

console.log(store.getState());

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });

console.log(store.getState());

/* -------------^ Redux ^------------- */
