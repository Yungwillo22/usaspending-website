/**
 * titleBarFilterReducer.js
 * Created by Nick Torres 4/11/24
 */

export const initialState = {
    hasResults: false
};

const titleFilterBarReducer = (state = initialState, action) => {
    console.debug("ACTION: ", action);
    switch (action.type) {
        case 'SET_HAS_RESULTS': {
            return Object.assign({}, {
                hasResults: action.value
            });
        }
        default:
            return state;
    }
};

export default titleFilterBarReducer;
