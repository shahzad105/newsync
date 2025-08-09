"use client";
import { useEffect } from "react";

export default function AdsterraSmallBanner({ id }) {
  useEffect(() => {
    window.atOptions = {
      key: "e185f3c1d537c4e67d96216e15a31473",
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
    };

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//www.highperformanceformat.com/e185f3c1d537c4e67d96216e15a31473/invoke.js";
    script.async = true;
    document.getElementById(id)?.appendChild(script);
  }, [id]);

  return <div id={id} />;
}
