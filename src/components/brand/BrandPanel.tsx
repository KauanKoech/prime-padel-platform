"use client";

import Image from "next/image";
import { useState } from "react";
import { arena } from "../../content/arena";
import styles from "./brand-panel.module.css";

export function BrandLogo({ tone = "green" }: { tone?: "green" | "white" }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={styles.logo} role="img" aria-label={arena.name}>
      {failed ? <span className={styles.fallback}>{arena.name}</span> : (
        <Image src={`/brand/prime-padel-${tone}.png`} alt="" width={554} height={269}
          unoptimized loading="eager" onError={() => setFailed(true)} />
      )}
    </span>
  );
}

export function BrandPanel() {
  return (
    <figure className={styles.panel}>
      <div className={styles.artwork}>
        <div className={styles.circle} aria-hidden="true" />
        <BrandLogo tone="white" />
      </div>
      <figcaption>Imagem ilustrativa da marca</figcaption>
    </figure>
  );
}
