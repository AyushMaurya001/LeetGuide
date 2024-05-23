import { atom } from "recoil";

export const answerAtom = atom({
  key: 'answerAtomKey',
  default: "Loading answer"
})

export const hintAtom = atom({
  key: 'hintAtomKey',
  default: [
    "hint1",
    "hint2",
    "hint3"
  ]
})

export const hintIdAtom = atom({
  key: 'hintIdAtomKey',
  default: 0
})

export const answerStatusAtom = atom({
  key: 'answerStatusAtomKey',
  default: false
})

export const pageUrlAtom = atom({
  key: 'pageUrlAtomKey',
  default: ''
})

export const questionDetailAtom = atom({
  key: 'questionDetailAtomKey',
  default: ''
})

export const backendStatusAtom = atom({
  key: 'backendStatusAtomKey',
  default: false
})

export const answerButtonDisplayStatusAtom = atom({
  key: 'answerButtonDisplayStatusAtomKey',
  default: false
})