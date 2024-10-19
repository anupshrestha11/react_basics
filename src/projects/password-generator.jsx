import { useCallback, useEffect, useRef, useState } from "react";

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharsAllowed, setSpecialCharsAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef();

  const generatePassword = useCallback(() => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) chars += "0123456789";
    if (specialCharsAllowed) chars += "!@#$%^&*()_+=-{}[]|:;<>,.?/~`";

    let result = "";
    for (let i = 0; i < length; i++) {
      let randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
      result += randomChar;
    }
    setPassword(result);
    console.log(result);
  }, [length, numberAllowed, specialCharsAllowed]);

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(password);
    passwordInputRef.current.select();
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword, length, numberAllowed, specialCharsAllowed]);

  return (
    <>
      <div className="w-full h-screen bg-gray-600 p-1 flex justify-center items-center">
        <div className="max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
          <h1 className="text-white text-center my-3 text-xl">
            Password Generator
          </h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordInputRef}
            />
            <button
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
              onClick={copyPasswordToClipboard}
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
                id="length"
                name="length"
              />
              <label htmlFor="length">Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                className="cursor-pointer"
                onChange={() => setNumberAllowed((oldValue) => !oldValue)}
              />
              <label htmlFor="numberAllowedInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={specialCharsAllowed}
                className="cursor-pointer"
                onChange={() => setSpecialCharsAllowed((oldValue) => !oldValue)}
              />
              <label htmlFor="specialCharsInput">Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordGenerator;
