import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [numLength, setNumLength] = useState(6);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed) string += "1234567890";
    if (charAllowed) string += "!~`@#$%^&*()_{}[]|;:<>,./";

    for (let i = 1; i <= numLength; i++) {
      let Char = Math.floor(Math.random() * string.length)

      pass += string.charAt(Char)
      
    }
    setPassword(pass)
  

  }, [numAllowed, charAllowed,numLength, setPassword])

const copyPasswordOClipBord = useCallback(() => {
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
}, [password])
 useEffect(()=>{
  passwordGenerator()
 },[numAllowed, charAllowed,numLength, setPassword, passwordGenerator])
  return (
    <>
      <div className="w-full max-w-lg mx-auto mt-24 shadow-md rounded-lg px-4 py-4  bg-gray-900">
        <h1 className="text-green-600 text-4xl font-semibold  text-center mb-6">
          Password generator
        </h1>
        <div className="flex shadow text-red-600 rounded-lg overflow-hidden mb-4 text-center text-2xl h-12">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}

          />
          <button 
          className="outline-none bg-green-700 text-center text-white px-3 py-0.5 shrink-0"
          onClick={copyPasswordOClipBord}
          >
            copy
          </button>
        </div>
        <div className="flex items-center justify-center text-xl gap-x-2 flex-wrap">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={30}
              value={numLength}
              className="cursor-pointer"
              onChange={(e) => {setNumLength(e.target.value)}}
            />
            <label className=" text-green-500">Length: {numLength}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {setNumAllowed((prev)=> !prev)}}
            />
            <label className=" text-green-500">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label className=" text-green-500">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
