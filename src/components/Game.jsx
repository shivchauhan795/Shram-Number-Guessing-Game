import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import ScoreCard from './ScoreCard';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';

const cookies = new Cookies();

const Game = () => {
    const backendURL = 'http://localhost:3000/'
    const token = cookies.get("SHRAM_TOKEN");
    const [randomValue, setRandomValue] = useState(null)
    const [buttonText, setButtonText] = useState('Start')
    const [isClicked, setIsClicked] = useState(false)
    const [userGuess, setUserGuess] = useState('')
    const [feedback, setFeedback] = useState('')
    const [score, setScore] = useState(100)
    const [highScore, setHighScore] = useState(0)
    const [attempts, setAttempts] = useState(0)
    const [isCorrect, setIsCorrect] = useState(false)
    const [showRestart, setShowRestart] = useState(false)
    const [userEmail, setUserEmail] = useState('');

    // get userEmail
    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const email = decodedToken.userEmail;
                const emailPrefix = email.split('@')[0];
                setUserEmail(emailPrefix);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [token]);


    useEffect(() => {
        const fetchHighScore = async () => {
            try {
                const response = await fetch(`${backendURL}getHighScore`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setHighScore(data.highScore);
                } else {
                    console.error(`Failed to fetch high score: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error fetching high score:', error);
            }
        };

        fetchHighScore();
    }, []);



    useEffect(() => {
        setButtonText(isClicked ? 'Stop' : 'Start')
    }, [isClicked])

    const handleStart = () => {
        if (!isClicked) {
            const value = (Math.floor(Math.random() * 101))
            setRandomValue(value)
            // console.log(value)
            setFeedback('')
            setIsCorrect(false) // Reset confetti
            setUserGuess('')
            setAttempts(0)
            setScore(100)
        }
        setIsClicked(!isClicked)
    }

    const handleInputChange = (e) => {
        setUserGuess(e.target.value)
        setFeedback('')
    }

    const handleGuess = async () => {
        const guess = parseInt(userGuess)
        if (!isNaN(guess)) {

            const newAttempts = attempts + 1


            setAttempts(newAttempts)
            // console.log(newAttempts)

            if (newAttempts >= 11) {
                setFeedback(`You've exhausted all attempts! The correct number was ${randomValue}. Try again.`)
                setScore(0)
                await saveScore(0);
                setShowRestart(true)
                return
            }

            const newScore = 100 - (newAttempts - 1) * 10
            setScore(newScore > 0 ? newScore : 0)


            if (guess < randomValue) {
                setFeedback('The number is greater than your guess.')
            } else if (guess > randomValue) {
                setFeedback('The number is smaller than your guess.')
            } else if (guess === randomValue) {
                setFeedback('Congratulations! You guessed the correct number!')
                setShowRestart(true)
                await saveScore(newScore);
            }
        }
    };

    const saveScore = async (score) => {

        try {
            if (score > highScore) {
                setHighScore(score)
                setIsCorrect(true)
            }
            const response = await fetch(`${backendURL}saveScore`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ score }),
            });

            if (!response.ok) {
                throw new Error(`Error saving score: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };



    const handleRestart = () => {
        setRandomValue(null)
        setIsCorrect(false)
        setIsClicked(false)
        setUserGuess('')
        setFeedback('')
        setScore(100)
        setShowRestart(false)
    };



    return (
        <>
            <div className='h-screen flex flex-col flex-wrap'>
                <div className='flex text-center justify-center uppercase text-3xl font-bold pt-8'>
                    Guess The Number
                </div>

                <div className='flex justify-end m'>
                    <ScoreCard highscore={highScore} currentScore={score} email={userEmail} />
                </div>
                <div className='justify-center flex items-center flex-col'>
                    {
                        !isCorrect && !showRestart && (
                            <div>
                                <button onClick={handleStart}
                                    type="button"
                                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6">
                                    {buttonText}
                                </button>
                            </div>)
                    }

                    {isClicked && !isCorrect && !showRestart && (
                        <div className='mt-6'>
                            <input
                                type='number'
                                value={userGuess}
                                onChange={handleInputChange}
                                placeholder='Enter your guess'
                                className='border border-black p-2 rounded'
                            />
                            <button onClick={handleGuess} type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-4 border-black border">Submit Guess</button>
                        </div>
                    )}

                    {feedback && (
                        <div className='mt-4 text-xl flex justify-center text-center'>
                            {feedback}
                        </div>
                    )}

                    {isCorrect && (
                        <>
                            <Confetti className='w-full h-screen' />
                            <div className='mt-2'>
                                <p>Your Score: {score}</p>
                            </div>
                            {showRestart && (
                                <button onClick={handleRestart}
                                    type="button"
                                    className="mt-4 text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5">
                                    Restart Game
                                </button>
                            )}
                        </>
                    )}
                    {!isCorrect && showRestart && (
                        <>
                            <div className='mt-2'>
                                <p>Your Score: {score}</p>
                            </div>
                            {showRestart && (
                                <button onClick={handleRestart}
                                    type="button"
                                    className="mt-4 text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5">
                                    Restart Game
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Game
