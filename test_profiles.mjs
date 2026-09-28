import assert from 'node:assert/strict';
import { DEFAULT_PARTNER_PROFILE, swapProfiles } from './src/data/profiles.js';

assert.equal(DEFAULT_PARTNER_PROFILE.name, 'Pra Noia');
assert.equal(DEFAULT_PARTNER_PROFILE.avatar, 'PN');

const currentProfile = { id: 'pedro', name: 'Pedro Henrique' };
const partnerProfile = { id: 'pra-noia', name: 'Pra Noia' };
const swappedProfiles = swapProfiles(currentProfile, partnerProfile);

assert.equal(swappedProfiles.current.name, 'Pra Noia');
assert.equal(swappedProfiles.partner.name, 'Pedro Henrique');
assert.equal(currentProfile.name, 'Pedro Henrique');
assert.equal(partnerProfile.name, 'Pra Noia');

console.log('Profile behavior tests passed.');
