const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_ADDED = 'CAKE_ADDED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_ADDED = 'ICECREAM_ADDED';

// action has a type ppty, and an action creator returns an action obj
function orderCake() {
	return {
		type: CAKE_ORDERED,
		payload: 'cake ordered',
		// quantity: 1,
	};
}

function addCakes(qty) {
	return {
		type: CAKE_ADDED,
		payload: qty,
	};
}

function orderIcecream(qty) {
	return { type: ICECREAM_ORDERED, payload: qty };
}

function addIcecream(qty) {
	return {
		type: ICECREAM_ADDED,
		payload: qty,
	};
}

// reducer
const initialStateCake = {
	quantity: 10,
};

const initialStateIcecream = {
	quantity: 200,
};
const cakeReducer = (state = initialStateCake, action) => {
	switch (action.type) {
		case CAKE_ORDERED:
			console.log(action.payload);
			return {
				...state,
				quantity: state.quantity - 1,
			};
		case CAKE_ADDED:
			return {
				...state,
				quantity: state.quantity + action.payload,
			};
		default:
			return state;
	}
};
const icecreamReducer = (state = initialStateIcecream, action) => {
	switch (action.type) {
		case ICECREAM_ORDERED:
			console.log(action.payload);
			return {
				...state,
				quantity: state.quantity - 1,
			};
		case ICECREAM_ADDED:
			return {
				...state,
				quantity: state.quantity + action.payload,
			};
		default:
			return state;
	}
};

const rootReducer = redux.combineReducers({
	cake: cakeReducer,
	icecream: icecreamReducer,
});

// store
const store = createStore(rootReducer, applyMiddleware(logger));
console.log('initial state', store.getState());

const unsubscribe = store.subscribe(() =>
	console.log(store.getState()),
);

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(addCakes(3));

const actions = bindActionCreators(
	{ orderCake, addCakes, orderIcecream, addIcecream },
	store.dispatch,
);

actions.addCakes(7);
actions.addIcecream(20);
actions.orderCake();

unsubscribe();
