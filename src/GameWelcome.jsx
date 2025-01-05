import React from 'react'
import { Link } from 'react-router-dom'

const GameWelcome = () => {
  return (
    <div className=" h-dvh flex justify-center items-center bg-gradient-to-r from-blue-800 to-purple-900 text-white relative">
      <div className    ="wrapper">
  <div className="box">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
<div className="flex flex-col text-center items-center justify-center gap-5 relative z-10">
      <h1 className="text-4xl phone:text-[1.5rem] font-press-start animate-fadeIn">
      WELCOME TO Dodge Quest!
      </h1>
      <p className="text-lg font-cursive animate-fadeIn animate-delay-200">
      Dodge the falling blocks. Can you master the dash?
      </p>
      <div>
        <Link to="/gamemode">
      <button
        className="mt-8 px-8 py-4 phone:px-4 phone:text-[0.9rem] bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl font-press-start text-lg 
            transform hover:scale-105 transition-transform duration-200 
            border-b-4 border-blue-600 hover:border-blue-500 
            active:border-b-0 active:translate-y-1 shadow-lg 
            hover:shadow-blue-300/50 bounce-on-hover animate-jump">
        Start Game
      </button>
      </Link>
      </div>
      <p className="text-lg font-cursive animate-fadeIn animate-delay-200">
      Click 'Start Game' to play the game.
      </p>
     
      </div>
      </div>
  )
}

export default GameWelcome