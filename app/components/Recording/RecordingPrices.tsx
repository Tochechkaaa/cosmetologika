"use client";

import styles from "./Recording.module.scss";
import { useRecordingPrices } from "../../lib/recordingOffer";

// Ціни й вікно Black Friday — у lib/recordingOffer.ts (спільні з кнопкою в Hero).
export function RecordingPrices() {
  const prices = useRecordingPrices();

  return (
    <p className={styles.prices}>
      <span className={styles.priceNew}>{prices.now}</span>
      <s className={styles.priceOld}>{prices.old}</s>
    </p>
  );
}
