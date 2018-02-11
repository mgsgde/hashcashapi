const initialState = {
    hash: "",
    nonce: "",
    challenge: " ",
    difficulty: " "
};


const powParameters = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case 'SET_CHALLENGE_AND_DIFFICULTY':
            newState = { ...state }
            newState.challenge = action.challenge
            newState.difficulty = action.difficulty
            return newState;
        case 'SET_NONCE_AND_HASH':
            newState = { ...state }
            newState.nonce = action.nonce
            newState.hash = action.hash
            return newState;
        default:
            return state
    }
}

export default powParameters