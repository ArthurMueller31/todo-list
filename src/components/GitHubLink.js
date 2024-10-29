import React from 'react'
import "./GitHubLink.css"
import { FaGithub } from 'react-icons/fa'

const GitHubLink = () => {
  return (
    <div className='text-holder'>
      <p className='p-text'>
        <FaGithub/>
        <a href='https://github.com/ArthurMueller31/todo-list' target='blank'>Código</a>
      </p>
    </div>
  )
}

export default GitHubLink
