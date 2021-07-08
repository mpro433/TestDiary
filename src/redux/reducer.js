const defaultState = {
    condition: null
};

const defaultCondition = {
    face: 0,
    anxiety: 0,
    stress: 0
};

export default reducer = (state = defaultState, { type, payload }) => {
    const retState = state.condition ? state : { ...state, condition: defaultCondition };
    switch (type) {
        case 'CONDITION_CHANGED':
            return {
                ...retState,
                condition: payload.condition
            }
        default:
            return state;
    }
}