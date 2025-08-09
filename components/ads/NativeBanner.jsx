"use client";
import { useEffect } from "react";

export default function NativeBannerAd() {
  const containerId = "container-1d1e462af2bd165e63f764eabbe25b23"; // EXACT ID from Adsterra

  useEffect(() => {
    // Remove old script if it exists to avoid duplicates
    const oldScript = document.querySelector(
      `script[data-adsterra="${containerId}"]`
    );
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.dataset.adsterra = containerId; // custom attribute to track it
    script.src =
      "//pl27379625.profitableratecpm.com/1d1e462af2bd165e63f764eabbe25b23/invoke.js";

    document.getElementById(containerId)?.appendChild(script);
  }, []);

  return <div id={containerId}></div>;
}
