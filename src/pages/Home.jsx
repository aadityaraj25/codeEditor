import React from 'react'

const Home = () => {
  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <h1 className='mainLebel'>Paste Invitation Room</h1>
        <div className='inputGroup'>
          <input 
            type="text"
            className='InputBox'
            placeholder='ROOM ID'
          />
          <input 
            type="text"
            className='InputBox'
            placeholder='USERNAME'
          />
          <button className='btn joinBtn'>Join</button>
          
        </div>
      </div>
    </div>
  )
}

export default Home