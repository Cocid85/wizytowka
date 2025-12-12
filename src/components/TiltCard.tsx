'use client';

import Tilt from 'react-parallax-tilt';
import { ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  return (
    <Tilt
      className={className}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      transitionSpeed={1500}
      scale={1.02}
      glareEnable
      glareMaxOpacity={0.2}
      glareColor="#ffd700"
      glarePosition="all"
    >
      {children}
    </Tilt>
  );
}

