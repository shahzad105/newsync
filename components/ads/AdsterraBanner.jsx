"use client";
import { useEffect } from "react";

export default function AdsterraBanner({ id }) {
  useEffect(() => {
    window.atOptions = {
      key: "46d7f5057afce336818f08d0b123a2a6",
      format: "iframe",
      height: 300,
      width: 160,
      params: {},
    };

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//www.highperformanceformat.com/46d7f5057afce336818f08d0b123a2a6/invoke.js";
    script.async = true;
    document.getElementById(id).appendChild(script);
  }, [id]);

  return <div id={id} />;
}
