import React from "react";
import { Slow as HairlineSlow } from "@lucasmarkes/hairline/react";

/**
 * Hairline Slow Component (Fig 9.5)
 * Isometric conveyor belt with cargo crates passing through a telemetry gate.
 * Hovering dilates the internal clock, slowing the conveyor belt to a readable crawl.
 */
export function Slow({ className = "", intensity = 0.6, theme = "dark", ...props }) {
  return (
    <div
      className={`hairline-white w-full flex items-center justify-center text-white ${className}`}
      style={{
        "--hairline-plate": "transparent",
        "--hairline-hi": "#ffffff",
        "--hairline-edge": "#ffffff",
        "--hairline-mid": "#ffffff",
        "--hairline-lo": "rgba(255, 255, 255, 0.75)",
        ...props.style,
      }}
    >
      <HairlineSlow
        intensity={intensity}
        theme={theme}
        className="w-full h-auto max-w-full"
        {...props}
      />
    </div>
  );
}

export function SlowDemo() {
  return (
    <div className="flex w-full items-center justify-center bg-transparent p-4">
      <div className="w-full max-w-sm">
        <Slow />
      </div>
    </div>
  );
}

export default Slow;
