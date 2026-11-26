"use client";

import styles from "./Hero.module.scss";
import { RECORDING_LINK, useRecordingPrices } from "../../lib/recordingOffer";

// Кнопка купівлі запису з ціною «до / після» та бейджем знижки (за Figma-кнопкою Black Friday).
// Ціни до першої перевірки годинника приховані (opacity), щоб на старті акції
// не блимала звичайна ціна замість акційної.
export function HeroBuyButton() {
  const prices = useRecordingPrices();

  return (
    <a
      href={RECORDING_LINK}
      className={`${styles.btnCourse} ${prices.ready ? styles.pricesReady : ""}`}
      aria-label={`Придбати запис за ${prices.now} замість ${prices.old}, знижка ${prices.discount}%`}
    >
      <span className={styles.btnLabel}>Придбати запис за</span>
      <span className={styles.btnPrices} aria-hidden="true">
        <s className={styles.btnPriceOld}>{prices.old}</s>
        <span className={styles.btnPriceNew}>{prices.now}</span>
      </span>
      <span className={styles.btnBadge} aria-hidden="true">
        −{prices.discount}%
      </span>
    </a>
  );
}
