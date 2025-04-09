"use client";

import { useState, useEffect } from "react";
import Input, { isValidPhoneNumber } from "react-phone-number-input/input";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [erroPhoneNumber, setErroPhoneNumber] = useState<undefined | boolean>(
    false,
  );
  const [errorFocus, seterrorFocus] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  function inputSetPhoneNumber(phone: string | undefined) {
    if (typeof phone == "string") {
      if (isValidPhoneNumber(phone, "BR")) {
        setErroPhoneNumber(false);
      } else {
        setErroPhoneNumber(true);
      }
    }
    setPhoneNumber(phone);
  }

  return (
    <>
      <header className="flex w-full flex-col items-center pt-5">
        <h1 className="text-4xl md:text-7xl">Link Generator</h1>
        <h1 className="text-3xl text-[#25D366] md:text-5xl">Whatsapp</h1>
      </header>
      <main className="w-full h-full flex items-center justify-center mt-5 flex-col gap-5">
        <form className="flex flex-col gap-5" method="POST">
          <div className="flex flex-col">
            <label htmlFor="phoneNumber">phone number</label>
            {/* <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              maxLength={16}
              className="bg-[#DFDFDF] rounded-lg p-2 pl-[10px] w-[80vw] shadow-[0_4px_4px_rgba(0,0,0,0.25)] focus:outline-[#25D366] max-w-[300px] placeholder:text-[#404040]"
              placeholder="(00) 0 0000-0000"
              onChange={(e) => setPhoneNumberInput(e.target.value)}
              value={phoneNumber}
            /> */}
            <Input
              className="bg-[#DFDFDF] rounded-lg p-2 pl-[10px] w-[80vw] shadow-[0_4px_4px_rgba(0,0,0,0.25)] focus:outline-[#25D366] max-w-[300px] placeholder:text-[#404040]"
              placeholder="(00) 0 0000-0000"
              country="BR"
              value={phoneNumber}
              onChange={inputSetPhoneNumber}
            />
            {erroPhoneNumber ? (
              <span className="mt-2 text-red-500">
                Por favor, digite um número válido!
              </span>
            ) : (
              <span></span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phoneNumber">message</label>
            <textarea
              className="bg-[#DFDFDF] rounded-lg p-2 pl-[10px] w-[80vw] shadow-[0_4px_4px_rgba(0,0,0,0.25)] focus:outline-[#25D366] max-w-[300px] placeholder:text-[#404040] resize-none"
              placeholder="Write a message here..."
              required
              rows={7}
            ></textarea>
          </div>
          <button className="bg-[#25D366] p-2 text-white tracking-wider rounded-lg shadow-lg shadow-[#25D366]/50 mt-2 cursor-pointer hover:tracking-widest transition-all hover:bg-[#128c7e]">
            Generate
          </button>
          <div className="bg-[#DFDFDF] w-full p-3 border-2 border-gray-300 rounded-sm flex">
            <span></span>
            <button></button>
          </div>
        </form>
      </main>
      <footer className="absolute bottom-1 w-full text-center">
        <span>Developer @szthalisson</span>
      </footer>
    </>
  );
}
