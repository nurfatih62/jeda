import React from "react";

import { Typography } from "../../typography/typography";
import { HeroActions } from "../../molecule/hero-actions/hero-actions";

export interface HeroProps {
  title?: string;
  description?: string;
}

export const Hero = ({
  title = "Ambil JEDA dan mulai membaca",
  description = "Ayo bergabung untuk mendapatkan pengalaman lebih lengkap dengan JEDA dan mulai bacaanmu",
}: HeroProps) => {
  return (
    <section
      className="
        mx-auto
        max-w-[1036px]
        px-[21px]
        pt-[56px]
        pb-[25px]
        text-center
      "
    >
      <Typography
        variant="heading1"
        className="
          mb-[22px]
          text-(--primary-text)
        "
      >
        Ambil{" "}
        <span className="text-(--primary)">
          JEDA
        </span>{" "}
        dan mulai membaca
      </Typography>

      <Typography
        variant="heading2"
        className="
          mx-auto
          mb-[24px]
          max-w-[1036px]
          text-(--text-secondary)
        "
      >
        Ayo bergabung untuk mendapatkan pengalaman lebih lengkap dengan{" "}
        <span className="font-bold text-(--primary-text)">
          JEDA
        </span>{" "}
        dan mulai bacaanmu
      </Typography>

      <HeroActions />
    </section>
  );
};