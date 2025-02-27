import { useState,useCallback,useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numallowd, setnumallowd] = useState(false)
  const [charallowd, setcharallowd] = useState(false)
  const [psswd, setpsswd] = useState('')
  const passwordRef = useRef(null)
  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numallowd) str += "0123456789"
    if(charallowd) str += "!@#$%^&*()_+"

    for(let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpsswd(pass)

  }, [length, numallowd, charallowd])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(psswd)
    passwordRef.current?.select()
  }

  useEffect(()=>{
    generatePassword()
  }, [length, numallowd, charallowd])



  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
       <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={psswd}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
         <button onClick={copyPasswordToClipboard}
        className='outline-none bg-violet-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
      </div>
      <div
      className='flex text-sm gap-x-2'
      >
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={15}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setlength(e.target.value)}
          name=""
          id=""
          />
          <label htmlFor="length">Length : {length }</label>
          </div>
          <div className='flex items-center gap-x-1'>
          
          <input 
          type="checkbox"
          defaultChecked={numallowd}
          onChange={() => {setnumallowd((prev) => !prev)
          }}
          name=""
          id=""
          />
          <label htmlFor="length">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
          
          <input 
          type="checkbox"
          defaultChecked={charallowd}
          onChange={() => {setcharallowd((prev) => !prev)
          }}
          name=""
          id=""
          />
          <label htmlFor="length">Characters</label>
          </div>
    </div>
    </div>
  )
}

export default App
