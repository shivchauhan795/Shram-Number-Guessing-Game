import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const PreviousScore = () => {
    const backendURL = 'https://shram-number-guessing-game-backend.onrender.com/';
    const token = cookies.get("SHRAM_TOKEN");
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await fetch(`${backendURL}getScores`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setScores(data.scores);
                } else {
                    console.error(`Failed to fetch scores: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error fetching scores:', error);
            }
        };

        fetchScores();
    }, []);

    return (
        <div className='flex flex-col items-center h-screen overflow-scroll'>
            <h3 className='text-3xl text-center uppercase font-bold mb-4 mt-4'>Previous Scores</h3>
            <ul>
                {scores.map((score, index) => (
                    <li key={index} className='text-2xl p-2'>Score {index}: {score}</li>
                ))}
            </ul>
        </div>
    );
};

export default PreviousScore;
