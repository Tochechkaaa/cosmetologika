"use client";

import { useEffect, useState } from "react";
import styles from "./Recording.module.scss";

// Black Friday EstyDerm: 26.11 00:00 – 01.12 00:00 за Києвом (UTC+2).
// Ціну в кошику/оплаті підміняє estyderm (theme inc/black-friday.php) у тому ж вікні,
// тут лише відображення. Після 01.12 блок сам повертається до звичайних цін.
const PROMO_START = Date.parse("2026-11-26T00:00:00+02:00");
const PROMO_END = Date.parse("2026-12-01T00:00:00+02:00");

const REGULAR = { now: "2 500 грн", old: "3 999 грн" };
const PROMO = { now: "1 625 грн", old: "2 500 грн" };

function isPromoActive(now: number) {
  // ?bf_preview=1 — подивитися акційну ціну до старту (лише відображення).
  const preview = new URLSearchParams(window.location.search).has("bf_preview");

  return now < PROMO_END && (preview || now >= PROMO_START);
}

export function RecordingPrices() {
  // Перший рендер завжди звичайний (збігається з серверним HTML), далі — по годиннику клієнта.
  const [promo, setPromo] = useState(false);

  useEffect(() => {
    const sync = () => setPromo(isPromoActive(Date.now()));

    sync();
    const timer = window.setInterval(sync, 60_000);

    return () => window.clearInterval(timer);
  }, []);

  const prices = promo ? PROMO : REGULAR;

  return (
    <p className={styles.prices}>
      <span className={styles.priceNew}>{prices.now}</span>
      <s className={styles.priceOld}>{prices.old}</s>
    </p>
  );
}
