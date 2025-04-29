"use client";
import { useEffect } from "react";

export function FlodeskScript() {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `!function(w,d,t,h,s,n){w.FlodeskObject=n;var fn=function(){(w[n].q=w[n].q||[]).push(arguments)};w[n]=w[n]||fn;var e=d.createElement(t);e.async=1;e.src='https://assets.flodesk.com/universal.js';var f=d.getElementsByTagName(t)[0];f.parentNode.insertBefore(e,f);}(window,document,'script',0,0,'fd');`;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return null;
}
