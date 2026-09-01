"use client";

import { HeroActions } from '../../molecule/hero-actions/hero-actions';

export interface HeroProps {
  onExplore?: () => void;
  onRegister?: () => void;
}

export function Hero({ onExplore, onRegister }: HeroProps) {
  return (
    <section className="mx-auto max-w-content px-hero-px pb-hero-pb pt-hero-pt text-center">
      <h1 className="font-sans mb-hero-mb-title text-title font-bold leading-hero-title text-text-primary">
        Ambil <span className="text-primary">JEDA</span> dan mulai membaca
      </h1>
      <p className="font-sans mb-hero-mb-desc text-desc font-medium leading-7 text-text-muted">
        Ayo bergabung untuk mendapatkan pengalaman lebih lengkap dengan{' '}
        <span className="font-bold text-text-primary">JEDA</span> dan mulai bacaanmu
      </p>
      <HeroActions onExplore={onExplore} onRegister={onRegister} />
    </section>
  );
}