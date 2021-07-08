import { createReducer } from '@reduxjs/toolkit'
import { conditionChanged } from './actions';

const defaultState = {
    condition: {
        face: { title: '', id: ''},
        anxiety: 0,
        stress: 0
    }
};
export default createReducer(defaultState, (builder) => {
    builder.addCase(conditionChanged, (state, action) => {
        state.condition = action.payload
    })
});

/*(state = defaultState, { type, payload }) => {
    //const retState = state.condition ? state : { ...state, condition: defaultCondition };
    switch (type) {
        case 'CONDITION_CHANGED':
            return {
                ...state,
                condition: payload.condition
            }
        default:
            return state;
    }
}*/