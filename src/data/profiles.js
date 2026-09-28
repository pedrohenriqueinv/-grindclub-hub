export const DEFAULT_PROFILE = Object.freeze({
  id: 'pedro',
  name: 'Pedro Henrique',
  avatar: 'PH',
  role: 'Criador & Estrategista'
});

export const DEFAULT_PARTNER_PROFILE = Object.freeze({
  id: 'pra-noia',
  name: 'Pra Noia',
  avatar: 'PN',
  role: 'Editor & Operador'
});

export function swapProfiles(current, partner) {
  return { current: partner, partner: current };
}

export function getProfileFirstName(profile) {
  return profile?.name?.trim().split(/\s+/)[0] || 'Você';
}
