"use client";

import { Button } from '../../atom/button/button';

export interface HeroActionsProps {
  onExplore?: () => void;
  onRegister?: () => void;
  exploreLabel?: string;
  registerLabel?: string;
  hideRegister?: boolean;
}

export function HeroActions({
  onExplore,
  onRegister,
  exploreLabel = 'Jelajahi dulu',
  registerLabel = 'Daftar',
  hideRegister = false,
}: HeroActionsProps) {
  return (
    <div className="flex items-center justify-center gap-(--spacing-hero-gap)">
      <Button variant="outline" onClick={onExplore} className="w-explore-btn">
        {exploreLabel}
      </Button>
      {!hideRegister && (
        <Button variant="primary" onClick={onRegister} className="w-register-btn">
          {registerLabel}
        </Button>
      )}
    </div>
  );
}