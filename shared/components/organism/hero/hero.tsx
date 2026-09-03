"use client";

import { useEffect, useState } from 'react';
import { HeroActions } from '../../molecule/hero-actions/hero-actions';
import { supabase } from '../../../../lib/supabase/client';

export interface HeroProps {
  onExplore?: () => void;
  onRegister?: () => void;
  isLoggedIn?: boolean;
}

export function Hero({ onExplore, onRegister, isLoggedIn: isLoggedInProp }: HeroProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp ?? false);

  useEffect(() => {
    if (isLoggedInProp !== undefined) return;
    let mounted = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Gagal memeriksa status login:', error);
        return;
      }
      if (mounted) setIsLoggedIn(Boolean(data.session?.user));
    });
    return () => {
      mounted = false;
    };
  }, [isLoggedInProp]);

  return (
    <section className="mx-auto max-w-content px-hero-px pb-hero-pb pt-hero-pt text-center">
      <h1 className="font-sans mb-hero-mb-title text-title font-bold leading-hero-title text-text-primary">
        {isLoggedIn ? (
          <>Selamat datang kembali di <span className="text-primary">JEDA</span></>
        ) : (
          <>Ambil <span className="text-primary">JEDA</span> dan mulai membaca</>
        )}
      </h1>
      <p className="font-sans mb-hero-mb-desc text-desc font-medium leading-7 text-text-muted">
        {isLoggedIn ? (
          <>Lanjutkan membaca artikel yang sesuai dengan minatmu di <span className="font-bold text-text-primary">JEDA</span></>
        ) : (
          <>Ayo bergabung untuk mendapatkan pengalaman lebih lengkap dengan{' '}
          <span className="font-bold text-text-primary">JEDA</span> dan mulai bacaanmu</>
        )}
      </p>
      <HeroActions
        onExplore={onExplore}
        onRegister={onRegister}
        registerLabel={isLoggedIn ? undefined : 'Daftar'}
        hideRegister={isLoggedIn}
      />
    </section>
  );
}