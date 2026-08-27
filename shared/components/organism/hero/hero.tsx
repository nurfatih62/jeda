"use client";

import { HeroActions } from '../../molecule/hero-actions/hero-actions';

export interface HeroProps {
  onExplore?: () => void;
  onRegister?: () => void;
}

export function Hero({ onExplore, onRegister }: HeroProps) {
  return (
    <section className="mx-auto max-w-259 px-5.25 pb-6.25 pt-14 text-center">
      <h1 className="font-sans mb-5.5 text-4xl font-bold leading-[1.3] text-text-primary">
        Ambil <span className="text-primary">JEDA</span> dan mulai membaca
      </h1>
      <p className="font-sans mb-6 text-2xl font-medium leading-7 text-text-muted">
        Ayo bergabung untuk mendapatkan pengalaman lebih lengkap dengan{' '}
        <span className="font-bold text-text-primary">JEDA</span> dan mulai bacaanmu
      </p>
      <HeroActions onExplore={onExplore} onRegister={onRegister} />
    </section>
  );
}
