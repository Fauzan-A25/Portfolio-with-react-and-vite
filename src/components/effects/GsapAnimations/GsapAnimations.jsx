import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './GsapAnimations.css';

const GsapAnimations = () => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    const createParticles = () => {
      const particleCount = 40;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'gsap-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        container.appendChild(particle);
        particlesRef.current.push(particle);

        // Animate particle with GSAP
        gsap.to(particle, {
          duration: 3 + Math.random() * 4,
          y: -window.innerHeight,
          opacity: 0,
          repeat: -1,
          ease: 'power1.inOut',
          delay: Math.random() * 2,
        });
      }
    };

    // Create animated orbs
    const createOrbs = () => {
      const orbContainer = document.createElement('div');
      orbContainer.className = 'gsap-orbs-container';
      container.appendChild(orbContainer);

      const orbs = ['orb-1', 'orb-2', 'orb-3'];
      orbs.forEach((orbClass) => {
        const orb = document.createElement('div');
        orb.className = `gsap-orb ${orbClass}`;
        orbContainer.appendChild(orb);

        // Animate orbs with GSAP
        gsap.to(orb, {
          duration: 8 + Math.random() * 4,
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          opacity: [0.2, 0.5, 0.2],
          repeat: -1,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        });
      });
    };

    // Create grid lines
    const createGridLines = () => {
      const gridContainer = document.createElement('div');
      gridContainer.className = 'gsap-grid-container';
      container.appendChild(gridContainer);

      for (let i = 0; i < 4; i++) {
        const line = document.createElement('div');
        line.className = `gsap-grid-line`;
        line.style.top = `${(i + 1) * 25}%`;
        gridContainer.appendChild(line);

        gsap.to(line, {
          duration: 3,
          opacity: [0, 0.1, 0],
          repeat: -1,
          ease: 'power1.inOut',
          delay: i * 0.5,
        });
      }
    };

    createParticles();
    createOrbs();
    createGridLines();

    return () => {
      gsap.killTweensOf('.gsap-particle');
      gsap.killTweensOf('.gsap-orb');
      gsap.killTweensOf('.gsap-grid-line');
    };
  }, []);

  return (
    <div ref={containerRef} className="gsap-animations-wrapper">
      {/* Animation elements are created dynamically */}
    </div>
  );
};

export default GsapAnimations;
