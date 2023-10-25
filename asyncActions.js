const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;

const initialState = {
	loading: false,
	users: [],
	err: [],
};

// action providers
const REQUEST_USERS = 'REQUEST_USERS';
const RECEIVE_USERS = 'RECEIVE_USERS';
const RECEIVE_ERROR = 'RECEIVE_ERROR';

const requesrUsers = () => {
	return {
		type: REQUEST_USERS,
	};
};

const receiveUsers = (users) => {
	return {
		type: RECEIVE_USERS,
		payload: users,
	};
};

const receiveError = (err) => {
	return {
		type: RECEIVE_ERROR,
		payload: err,
	};
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_USERS:
			return {
				...state,
				loading: true,
			};
		case RECEIVE_USERS:
			return {
				...state,
				loading: false,
				users: action.users,
			};
		case RECEIVE_ERROR:
			return {
				...state,
				loading: false,
				err: action.err,
			};
		default:
			return state;
	}
};

// store
const store = createStore(rootReducer);

const unsubscribe = store.subscribe(() =>
	console.log(store.getState()),
);

const actions = bindActionCreators({
	requesrUsers,
	receiveUsers,
	receiveError,
});

unsubscribe();
