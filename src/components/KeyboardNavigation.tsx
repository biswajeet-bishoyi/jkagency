"use client";

import { useEffect, useRef } from "react";

export default function KeyboardNavigation() {
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow default behavior for modifier keys
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

      const deckSection = document.getElementById("projects-deck");
      const deckContainer = document.getElementById("projects-scroll-container");

      if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
        // If we are currently looking at the nested scroll container, check if we should scroll inside it
        if (deckSection && deckContainer) {
          const rect = deckSection.getBoundingClientRect();
          // If the section is practically filling the viewport
          if (Math.abs(rect.top) < 100) {
            // Check if there is still room to scroll down inside the deck
            // Add a small 10px buffer to handle subpixel rounding
            if (deckContainer.scrollTop + deckContainer.clientHeight < deckContainer.scrollHeight - 10) {
              e.preventDefault();
              if (isScrolling.current) return;
              
              const slides = Array.from(deckContainer.children);
              let targetSlide = null;
              for (const slide of slides) {
                if ((slide as HTMLElement).offsetTop > deckContainer.scrollTop + 50) {
                  targetSlide = slide;
                  break;
                }
              }

              if (targetSlide) {
                isScrolling.current = true;
                deckContainer.scrollTo({ top: (targetSlide as HTMLElement).offsetTop, behavior: 'smooth' });
                setTimeout(() => { isScrolling.current = false; }, 600);
              }
              return; // Stop global scroll
            }
          }
        }

        e.preventDefault();
        if (isScrolling.current) return;

        const sections = Array.from(document.querySelectorAll('section'));
        // Find the first section that is significantly below our current viewport top
        const currentScroll = window.scrollY;
        
        let targetSection = null;
        for (const section of sections) {
          const top = section.getBoundingClientRect().top + currentScroll;
          if (top > currentScroll + 50) { // 50px buffer
            targetSection = section;
            break;
          }
        }

        const executeScroll = (target: Element | number) => {
          isScrolling.current = true;
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(target, { duration: 1.2 });
          } else {
            if (typeof target === 'number') {
              window.scrollTo({ top: target, behavior: 'smooth' });
            } else {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
          setTimeout(() => { isScrolling.current = false; }, 600);
        };

        if (targetSection) {
          const targetTop = targetSection.getBoundingClientRect().top;
          if (targetTop > window.innerHeight * 1.1) {
            executeScroll(window.scrollY + window.innerHeight);
          } else {
            executeScroll(targetSection);
          }
        } else {
          executeScroll(window.scrollY + window.innerHeight);
        }

      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        // If we are currently looking at the nested scroll container, check if we should scroll inside it
        if (deckSection && deckContainer) {
          const rect = deckSection.getBoundingClientRect();
          // If the section is practically filling the viewport
          if (Math.abs(rect.top) < 100) {
            // Check if there is still room to scroll up inside the deck
            if (deckContainer.scrollTop > 10) {
              e.preventDefault();
              if (isScrolling.current) return;
              
              const slides = Array.from(deckContainer.children);
              let targetSlide = null;
              for (let i = slides.length - 1; i >= 0; i--) {
                const slide = slides[i] as HTMLElement;
                if (slide.offsetTop < deckContainer.scrollTop - 50) {
                  targetSlide = slide;
                  break;
                }
              }

              if (targetSlide) {
                isScrolling.current = true;
                deckContainer.scrollTo({ top: (targetSlide as HTMLElement).offsetTop, behavior: 'smooth' });
                setTimeout(() => { isScrolling.current = false; }, 600);
              }
              return; // Stop global scroll
            }
          }
        }

        e.preventDefault();
        if (isScrolling.current) return;

        const sections = Array.from(document.querySelectorAll('section'));
        const currentScroll = window.scrollY;
        
        let targetSection = null;
        // Search backwards to find the first section above us
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          const top = section.getBoundingClientRect().top + currentScroll;
          if (top < currentScroll - 50) { // 50px buffer
            targetSection = section;
            break;
          }
        }

        const executeScroll = (target: Element | number) => {
          isScrolling.current = true;
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(target, { duration: 1.2 });
          } else {
            if (typeof target === 'number') {
              window.scrollTo({ top: target, behavior: 'smooth' });
            } else {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
          setTimeout(() => { isScrolling.current = false; }, 600);
        };

        if (targetSection) {
          const targetTop = targetSection.getBoundingClientRect().top;
          if (targetTop < -window.innerHeight * 1.1) {
            executeScroll(window.scrollY - window.innerHeight);
          } else {
            executeScroll(targetSection);
          }
        } else {
          executeScroll(window.scrollY - window.innerHeight);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
}
