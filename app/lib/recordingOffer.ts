"use client";

import { useEffect, useState } from "react";

// Купівля запису: Woo-товар 13379 на estyderm (LearnPress курс 13350), одразу на чекаут.
export const RECORDING_LINK =
  "https://estyderm.com.ua/?add-to-cart=13379&quantity=1&redirect-to=checkout";

// Black Friday EstyDerm: 26.11 00:00 – 01.12 00:00 за Києвом (UTC+2).
// Ціну в кошику/оплаті підміняє estyderm (theme inc/black-friday.php) у тому ж вікні,
// тут лише відображення. Після 01.12 ціни самі повертаються до звичайних.
const PROMO_START = Date.parse("2026-11-26T00:00:00+02:00");
const PROMO_END = Date.parse("2026-12-01T00:00:00+02:00");

const REGULAR = { now: 2500, old: 3999 };
const PROMO = { now: 1625, old: 2500 };

export type RecordingPrices = {
  now: string;
  old: string;
  /** Знижка у відсотках відносно старої ціни, напр. 35. */
  discount: number;
  /** false до першої перевірки годинника на клієнті (серверний HTML — звичайні ціни). */
  ready: boolean;
};

function isPromoActive(now: number) {
  // ?bf_preview=1 — подивитися акційну ціну до старту (лише відображення).
  const preview = new URLSearchParams(window.location.search).has("bf_preview");

  return now < PROMO_END && (preview || now >= PROMO_START);
}

// Без toLocaleString: ICU у Node та браузері форматує по-різному — був би hydration mismatch.
function formatUah(value: number) {
  return `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} грн`;
}

export function useRecordingPrices(): RecordingPrices {
  // Перший рендер завжди звичайний (збігається з серверним HTML), далі — по годиннику клієнта.
  const [promo, setPromo] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setPromo(isPromoActive(Date.now()));
      setReady(true);
    };

    sync();
    const timer = window.setInterval(sync, 60_000);

    return () => window.clearInterval(timer);
  }, []);

  const prices = promo ? PROMO : REGULAR;

  return {
    now: formatUah(prices.now),
    old: formatUah(prices.old),
    discount: Math.round((1 - prices.now / prices.old) * 100),
    ready,
  };
}
