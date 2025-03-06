"use client";
import React from "react";
import {FaRemoveFormat } from "react-icons/fa";
import { MdFormatBold, MdLink, MdOutlineFormatItalic, MdOutlineFormatUnderlined } from "react-icons/md";

function TextFormatter({ applyBold, applyItalic, applyUnderline, applyLink, removeFormatting }) {
  return (
    <div className="flex space-x-4 my-2 text-[#999999]">
      <button onClick={applyBold} className="text-xl"><MdFormatBold /></button>
      <button onClick={applyItalic} className="text-xl"><MdOutlineFormatItalic /></button>
      <button onClick={applyUnderline} className="text-xl"><MdOutlineFormatUnderlined /></button>
      <button onClick={applyLink} className="text-xl"><MdLink /></button>
      <button onClick={removeFormatting} className="text-base"><FaRemoveFormat /></button>
    </div>
  );
}

export default TextFormatter;
