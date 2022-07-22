import React, { useState, useRef } from 'react'

const RefExample = () => {
  const [myNum, setMyNum] = useState(0);

  const inputOne = useRef();
  const inputTwo = useRef();


  const getNumBox = () => {
    console.log("Hello");
    console.log(inputOne.current);
    inputOne.current.style.width = "400px";
  }

  const getTextBox = () => {
    console.log("World");
    console.log(inputTwo.current);
  }
  return (
    <div>
      <p>RefExample</p>
      <input type="number" value={myNum} onChange={e => setMyNum(e.target.value)} ref={inputOne} style={{ width: '100px' }} />
      <input type="text" value={myNum} onChange={e => setMyNum(e.target.value)} ref={inputTwo} />
      <h3>Value is : {myNum}</h3>
      <button onClick={() => getNumBox()}>Rupees</button>
      <button onClick={() => getTextBox()}>Dollars</button>
    </div>
  )
}

export default RefExample