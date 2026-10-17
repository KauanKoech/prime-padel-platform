import type { PlayerDetails } from './booking';

export const PLAYER_LIMITS = { maxName: 80, maxNotes: 300 } as const;

/** Só dígitos, sem o 55 do Brasil quando vier junto. */
export function phoneDigits(phone: string) {
  let digits = phone.replace(/\D/g, '');
  if (digits.length > 11 && digits.startsWith('55')) digits = digits.slice(2);
  return digits;
}

/** Regras de apresentação do formulário (a API futura valida de novo do lado dela). */
export function validatePlayer(player: PlayerDetails) {
  const name = player.name.trim();
  return {
    name: name.length >= 2 && name.length <= PLAYER_LIMITS.maxName,
    phone: /^[1-9]\d{9,10}$/.test(phoneDigits(player.phone)),
    notes: player.notes.length <= PLAYER_LIMITS.maxNotes,
  };
}

export const isPlayerValid = (player: PlayerDetails) => Object.values(validatePlayer(player)).every(Boolean);
