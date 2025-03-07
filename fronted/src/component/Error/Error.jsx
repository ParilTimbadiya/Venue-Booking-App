import React from 'react'
import "./Error.css"
const Error = () => {
  return (
    <div className='errorContainer'>
      <div className='error'>
        <p>😅</p>
        
          <span>Try Reloading if that doesn't work, the API daily limit is reached</span>
      </div>
    </div>
  )
}

export default Error