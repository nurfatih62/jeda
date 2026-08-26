import { Button } from "../../atom/button/button";

export interface HeroActionsProps {
  onExplore?: () => void;
  onRegister?: () => void;
}

export function HeroActions({
  onExplore,
  onRegister,
}: HeroActionsProps) {
  return (
    <div className="flex items-center justify-center gap-2.5">
      <Button
        variant="outline"
        colorState="default"
        onClick={onExplore}
      >
        Jelajahi dulu
      </Button>

      <Button
        variant="primary"
        colorState="default"
        onClick={onRegister}
      >
        Daftar
      </Button>
    </div>
  );
}