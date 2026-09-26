import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SplitTextHeading Component
 * Splits text into individual character spans and animates them on scroll
 * matching exact GSAP specification:
 * gsap.from(chars.chars, {
 *   opacity: 0, y: 30,
 *   duration: 0.5, stagger: 0.03,
 *   ease: "back.out(1.7)"
 * });
 */
export default function SplitTextHeading({
  children,
  text,
  as: Tag = "h2",
  className = "",
  stagger = 0.03,
  duration = 0.5,
  y = 30,
  ease = "back.out(1.7)",
  startTrigger = "top 90%",
  delay = 0,
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll(".split-char");
    if (!chars || chars.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: y,
          scale: 0.9,
          willChange: "transform, opacity",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: duration,
          stagger: stagger,
          delay: delay,
          ease: ease,
          clearProps: "transform,opacity,scale,willChange",
          scrollTrigger: {
            trigger: el,
            start: startTrigger,
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, duration, y, ease, startTrigger, delay, children, text]);

  // Helper to split a string into words and characters preserving word wrap and spaces
  const renderSplittedString = (str, keyPrefix = "str") => {
    if (typeof str !== "string") return str;

    const words = str.split(/\s+/).filter(Boolean);
    const hasLeadingSpace = /^\s/.test(str);
    const hasTrailingSpace = /\s$/.test(str);

    return (
      <React.Fragment key={keyPrefix}>
        {hasLeadingSpace && <span className="inline-block">&nbsp;</span>}
        {words.map((word, wordIdx) => (
          <React.Fragment key={`${keyPrefix}-wfrag-${wordIdx}`}>
            <span key={`${keyPrefix}-w-${wordIdx}`} className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIdx) => (
                <span
                  key={`${keyPrefix}-c-${wordIdx}-${charIdx}`}
                  className="split-char inline-block"
                  style={{ willChange: "transform, opacity" }}
                >
                  {char}
                </span>
              ))}
            </span>
            {wordIdx < words.length - 1 && (
              <span className="split-space inline-block">&nbsp;</span>
            )}
          </React.Fragment>
        ))}
        {hasTrailingSpace && <span className="inline-block">&nbsp;</span>}
      </React.Fragment>
    );
  };

  // Helper to process children (handles strings, numbers, React elements, arrays)
  const processNode = (node, index = 0) => {
    if (typeof node === "string") {
      return renderSplittedString(node, `txt-${index}`);
    }

    if (typeof node === "number") {
      return renderSplittedString(String(node), `num-${index}`);
    }

    if (React.isValidElement(node)) {
      // If node is <br />, preserve it
      if (node.type === "br") {
        return React.cloneElement(node, { key: `br-${index}` });
      }

      const childContent = node.props.children;
      if (typeof childContent === "string") {
        return React.cloneElement(node, {
          key: `elem-${index}`,
          children: renderSplittedString(childContent, `elem-txt-${index}`),
        });
      } else if (Array.isArray(childContent)) {
        return React.cloneElement(node, {
          key: `elem-${index}`,
          children: childContent.map((subNode, subIdx) =>
            processNode(subNode, `${index}-${subIdx}`)
          ),
        });
      } else if (React.isValidElement(childContent)) {
        return React.cloneElement(node, {
          key: `elem-${index}`,
          children: processNode(childContent, `${index}-0`),
        });
      }
      return node;
    }

    return node;
  };

  const contentToRender = text
    ? renderSplittedString(text, "txt-root")
    : Array.isArray(children)
    ? children.map((child, idx) => processNode(child, idx))
    : processNode(children, 0);

  return (
    <Tag ref={containerRef} className={`split-heading ${className}`} {...props}>
      {contentToRender}
    </Tag>
  );
}
