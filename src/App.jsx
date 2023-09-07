import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [password, setPasword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState("false");
  const [charAllowed, setCharAllowed] = useState("false");
  const [length, setLength] = useState(8);
  const passwordRef= useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+{}[]"
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPasword(pass)
  }, [length, numberAllowed, charAllowed])
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator()

  }, [numberAllowed, length, charAllowed, passwordGenerator]
  )
  return (
    <>
      <div className="w-full max-w-md rounded-lg shadow-md mx-auto bg-gray-800 text-orange-500 px-4 py-3 my-8">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg mb-4 overflow-hidden">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="outline-none w-full py-1 px-3"

          />
          <button  onClick={copyPasswordToClipboard} className="outline-none py-0.5 px-3 bg-blue-600 text-white">
            copy
          </button>
        </div>
        <div className="flex">
          <input type="range" min={8} max={30} value={length} onChange={(e) => { setLength(e.target.value) }} />
          <div className="flex px-2">Length :{length}</div>
          <div className="px-2">
            <input type="checkbox" defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }} />
            <label className="px-2">Number</label>
          </div>
          <div className="">
            <input type="checkbox" defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }
              } />
            <label className="px-1">characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
