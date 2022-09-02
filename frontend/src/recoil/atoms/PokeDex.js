import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const PokeDex = atom({
  key: "PokeDex",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
