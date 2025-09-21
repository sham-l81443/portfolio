import { useEffect, useRef } from 'react';

const MouseFollower = () => {
  const followerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const tailsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Main follower
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
      }
      
      // Multiple tails with different delays
      tailsRef.current.forEach((tail, index) => {
        if (tail) {
          const delay = (index + 1) * 50;
          const size = 20 - (index * 2);
          setTimeout(() => {
            tail.style.transform = `translate(${x - size/2}px, ${y - size/2}px)`;
          }, delay);
        }
      });
      
      // Main glow effect
      setTimeout(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate(${x - 25}px, ${y - 25}px)`;
        }
      }, 150);
    };

    const handleMouseEnter = () => {
      if (followerRef.current && glowRef.current) {
        followerRef.current.style.opacity = '1';
        glowRef.current.style.opacity = '1';
        tailsRef.current.forEach((tail) => {
          if (tail) tail.style.opacity = '1';
        });
      }
    };

    const handleMouseLeave = () => {
      if (followerRef.current && glowRef.current) {
        followerRef.current.style.opacity = '0';
        glowRef.current.style.opacity = '0';
        tailsRef.current.forEach((tail) => {
          if (tail) tail.style.opacity = '0';
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-50 opacity-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
          borderRadius: '50%',
          boxShadow: '0 0 20px hsl(var(--primary) / 0.6), 0 0 40px hsl(var(--secondary) / 0.4)',
          transition: 'transform 0.1s ease-out',
        }}
      />
      
      {/* Multiple faded tails */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el && tailsRef.current) {
              tailsRef.current[index] = el;
            }
          }}
          className="fixed top-0 left-0 pointer-events-none opacity-0 transition-opacity duration-300"
          style={{
            width: `${20 - (index * 2)}px`,
            height: `${20 - (index * 2)}px`,
            background: `linear-gradient(135deg, hsl(var(--primary) / ${0.4 - (index * 0.06)}), hsl(var(--secondary) / ${0.3 - (index * 0.04)}))`,
            borderRadius: '50%',
            boxShadow: `0 0 ${15 - (index * 2)}px hsl(var(--primary) / ${0.2 - (index * 0.03)})`,
            transition: `transform ${0.2 + (index * 0.1)}s ease-out`,
            zIndex: 49 - index,
          }}
        />
      ))}
      
      {/* Delayed glow effect */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-40 opacity-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, hsl(var(--secondary) / 0.2) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(10px)',
          transition: 'transform 0.3s ease-out',
        }}
      />
      
      {/* Ambient particles */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-30 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, hsl(var(--secondary) / 0.1) 0%, transparent 50%),
            radial-gradient(circle at 60% 20%, hsl(var(--accent) / 0.05) 0%, transparent 50%)
          `,
        }}
      />
    </>
  );
};

export default MouseFollower;