import React from 'react'

const ScoreCard = ({ highscore, currentScore, email }) => {
    return (
        <>
            <div className='border-2 border-black rounded m-6 p-2 uppercase font-bold'>
                <div className='font-semibold'>
                    Welcome {email}
                </div>
                <div>
                    Highest Score : {highscore}
                </div>
                <div>
                    Current Score : {currentScore}
                </div>
            </div>
        </>
    )
}

export default ScoreCard
