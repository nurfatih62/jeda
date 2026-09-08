"use client";

import { Button } from '../../atom/button/button';

export interface HeroActionsProps {
  onExplore?: () => void;
  onRegister?: () => void;
  exploreLabel?: string;
  registerLabel?: string;
}

export function HeroActions({
  onExplore,
  onRegister,
  exploreLabel = 'Jelajahi dulu',
  registerLabel = 'Daftar',
}: HeroActionsProps) {
  return (
    <div className="flex items-center justify-center gap-2.5">
      <Button variant="outline" onClick={onExplore} className="w-35">
        {exploreLabel}
      </Button>
      <Button variant="primary" onClick={onRegister} className="w-26.25">
        {registerLabel}
      </Button>
    </div>
  );
}
