import { configureStore } from 'redux';

const testStore = () => {
  // ...
  const test = 'test'
  return test
};

const store = configureStore(testStore);

export default store;
