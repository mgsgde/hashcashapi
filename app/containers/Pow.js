import React from 'react'
import { connect } from 'react-redux'
import POW from '../components/common/POW.js'



const mapDispatchToProps = dispatch => {
    return {
        setChallengeAndDifficulty: (challenge, difficulty) => {
            dispatch({
                type: 'SET_CHALLENGE_AND_DIFFICULTY',
                challenge: challenge,
                difficulty: difficulty
            })
        },
        setNonceAndHash: (nonce, hash) => {
            dispatch({
                type: 'SET_NONCE_AND_HASH',
                nonce: nonce,
                hash: hash
            })
        }
    }
}

const mapStateToProps = state => {
  return {
      hash: state.hash, 
      nonce: state.nonce, 
      challenge: state.challenge, 
      difficulty: state.difficulty 
  }
}


let Pow = connect(mapStateToProps, mapDispatchToProps)(POW)

export default Pow