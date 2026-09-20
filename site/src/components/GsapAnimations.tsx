"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GsapAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document
        .querySelectorAll(".gs-hidden")
        .forEach((el) => el.classList.remove("gs-hidden"));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.fromTo(
      "[data-gs='eyebrow']",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
      .fromTo(
        "[data-gs='wordmark']",
        { opacity: 0, transform: "scale(0.92)" },
        { opacity: 1, transform: "scale(1)", duration: 0.8 },
        "-=0.3"
      )
      .fromTo(
        "[data-gs='sub']",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.4"
      )
      .fromTo(
        "[data-gs='roles']",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.3"
      )
      .fromTo(
        "[data-gs='cta-btn']",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.2"
      )
      .fromTo(
        "[data-gs='card-c']",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.3"
      )
      .fromTo(
        "[data-gs='card-l']",
        { opacity: 0, x: -40, y: 40 },
        { opacity: 0.8, x: 0, y: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        "[data-gs='card-r']",
        { opacity: 0, x: 40, y: 40 },
        { opacity: 0.8, x: 0, y: 0, duration: 0.6 },
        "-=0.5"
      );

    // Scroll-triggered reveals
    const revealElements = document.querySelectorAll("[data-gs='reveal']");
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power1.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    });

    // Stagger reveals for lists
    const staggerGroups = document.querySelectorAll("[data-gs-stagger]");
    staggerGroups.forEach((group) => {
      const children = group.querySelectorAll("[data-gs='stagger-item']");
      gsap.fromTo(
        children,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power1.out",
          scrollTrigger: { trigger: group, start: "top 80%" },
        }
      );
    });

    // Timeline track grow
    const track = document.querySelector("[data-gs='track']");
    if (track) {
      gsap.fromTo(
        track,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.8,
          ease: "power1.out",
          scrollTrigger: { trigger: track, start: "top 80%" },
        }
      );
    }

    // Inspector panels
    const inspectors = document.querySelectorAll("[data-gs='inspector']");
    inspectors.forEach((panel, i) => {
      gsap.fromTo(
        panel,
        { opacity: 0, transform: "scale(0.9)" },
        {
          opacity: 1,
          transform: "scale(1)",
          duration: 0.5,
          delay: 0.1 + i * 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: panel.closest("section") || panel,
            start: "top 70%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
