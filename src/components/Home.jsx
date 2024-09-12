import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div className='pb-5 h-screen'>

                <div className='text-black flex items-center text-center justify-evenly p-10 flex-wrap'>
                    <div className='hometext text-6xl flex flex-wrap text-wrap items-center justify-center  w-1/2'>
                        Shram Assignment - Number Guessing Game!!
                    </div>

                </div>
                <div className='flex justify-center gap-3'>
                    <Link to='/register'><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg uppercase px-5 py-2.5 text-center me-2 mb-2">Register</button>
                    </Link>
                    <Link to='/login'><button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg uppercase px-5 py-2.5 text-center me-2 mb-2">Login</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Home