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
