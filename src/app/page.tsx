"use client";

import { useState, useEffect, FormEvent } from "react";
import { FaRegCopy } from "react-icons/fa";
import Input, { isValidPhoneNumber } from "react-phone-number-input/input";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [erroPhoneNumber, setErroPhoneNumber] = useState<undefined | boolean>(
    false,
  );

  const [message, setMessage] = useState<string | undefined>("");
  const [erroMessage, setErroMessage] = useState<undefined | boolean>(false);

  const [viewURL, setViewURL] = useState<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string>("");

  function generateLink(e: FormEvent) {
    e.preventDefault();

    inputSetPhoneNumber(phoneNumber);
    inputSetMessage(message);

    if (erroPhoneNumber || !phoneNumber) {
      document.getElementById("phoneNumber")?.focus();
    } else if (erroMessage || !message) {
      document.getElementById("message")?.focus();
    } else {
      const phone = encodeURIComponent(phoneNumber.replace("+", ""));
      const EncodeMessage = encodeURIComponent(message);

      setLinkUrl(`https://wa.me/${phone}?text=${EncodeMessage}`);
      copyLink();
      setViewURL(true);

      setMessage("");
      setPhoneNumber("");
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(linkUrl);
  }

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

  function inputSetMessage(message: string | undefined) {
    if (message == "" || message == undefined || message == null) {
      setErroMessage(true);
    } else {
      setErroMessage(false);
    }
    setMessage(message);
  }

  return (
    <>
      <header className="flex w-full flex-col items-center pt-5">
        <h1 className="text-4xl md:text-7xl">Link Generator</h1>
        <h1 className="text-3xl text-[#25D366] md:text-5xl">Whatsapp</h1>
      </header>
      <main className="w-full h-full flex items-center justify-center mt-5 flex-col gap-5">
        <form
          className="flex flex-col gap-5"
          method="POST"
          onSubmit={(e) => generateLink(e)}
        >
          <div className="flex flex-col">
            <label htmlFor="phoneNumber">phone number</label>
            <Input
              className="bg-[#DFDFDF] rounded-lg p-2 pl-[10px] w-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] focus:outline-[#25D366] max-w-[300px] placeholder:text-[#404040]"
              placeholder="(00) 0 0000-0000"
              country="BR"
              id="phoneNumber"
              value={phoneNumber}
              onChange={inputSetPhoneNumber}
            />
            {erroPhoneNumber ? (
              <span className="mt-2 text-red-500 text-[14px]">
                Por favor, digite um número válido!
              </span>
            ) : (
              <span></span>
            )}
          </div>
          <div className="flex flex-col w-[300px]">
            <label htmlFor="phoneNumber">message</label>
            <textarea
              className="bg-[#DFDFDF] rounded-lg p-2 pl-[10px] w-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] focus:outline-[#25D366] max-w-[300px] placeholder:text-[#404040] resize-none"
              placeholder="Write a message here..."
              rows={7}
              id="message"
              value={message}
              onChange={(e) => inputSetMessage(e.target.value)}
            ></textarea>
            {erroMessage ? (
              <span className="mt-2 text-red-500 text-[14px]">
                Por favor, digite uma mensagem válida!
              </span>
            ) : (
              <span></span>
            )}
          </div>
          <button className="bg-[#25D366] p-2 text-white tracking-wider rounded-lg shadow-lg shadow-[#25D366]/50 mt-2 cursor-pointer hover:tracking-widest transition-all hover:bg-[#128c7e]">
            Generate
          </button>
        </form>
        {linkUrl ? (
          <div className="flex bg-[#DFDFDF] w-fit p-3 border-2 border-gray-300 rounded-sm items-center justify-between gap-2">
            <span className="text-[14px] text-nowrap">
              {linkUrl.slice(0, 30) + "..."}
            </span>
            <button
              className="bg-[#25D366] rounded-sm p-2 cursor-pointer hover:bg-[#128c7e] transition-all"
              onClick={copyLink}
            >
              {" "}
              <FaRegCopy className="text-2xl text-white" />
            </button>
          </div>
        ) : (
          <></>
        )}
      </main>
      <footer className="absolute bottom-1 w-full text-center">
        <span>Developer @szthalisson</span>
      </footer>
    </>
  );
}
