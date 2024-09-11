import { createStore , compose} from "redux";


const enhancers = compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );


const initialState = {
    items: [],
    totalPrice: 0,
    count:0,
};

const addToCart = (state, action) => {
    const existingItem = state.items.find(item => item.id === action.item.id);
    const newTotalPrice = state.totalPrice + parseFloat(action.item.price);

    if (existingItem) {
        const updatedItems = state.items.map(item =>
            item.id === action.item.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        return { ...state, items: updatedItems, totalPrice: +newTotalPrice.toFixed(2),count :state.count+1 };
    } else {
        return { ...state, items: [...state.items, { ...action.item, quantity: 1 }], totalPrice: +newTotalPrice.toFixed(2), count:state.count+1 };
    }
};

const removeFromCart = (state, action) => {
    const itemIndex = state.items.findIndex(item => item.id === action.itemId);
    if (itemIndex !== -1) {
        const itemToRemove = state.items[itemIndex];
        const newTotalPrice = state.totalPrice - parseFloat(itemToRemove.price);

        if (itemToRemove.quantity === 1) {
            return {
                ...state,
                items: [...state.items.slice(0, itemIndex), ...state.items.slice(itemIndex + 1)],
                totalPrice: +newTotalPrice.toFixed(2),
                count: state.count - 1
            };
        } else {
            const updatedItems = state.items.map(item =>
                item.id === action.itemId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            return { ...state, items: updatedItems, totalPrice: +newTotalPrice.toFixed(2), count: state.count -1 };
        }
    }
    return state;
};



const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "addToCart":
            return addToCart(state, action);
        case "removeFromCart":
            return removeFromCart(state, action);
        case "resetCart":
            return {...initialState };
        default:
            return state;
    }
};

const store = createStore(cartReducer, enhancers);
export default store