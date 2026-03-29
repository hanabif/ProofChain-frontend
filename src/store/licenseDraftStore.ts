import { create } from 'zustand';

interface LicenseDraft {
  title: string;
  type: 'personal' | 'exclusive' | 'non-exclusive';
  price: number;
  description: string;
}

interface LicenseDraftStore {
  draft: LicenseDraft | null;
  setDraft: (draft: LicenseDraft) => void;
  clearDraft: () => void;
}

export const useLicenseDraftStore = create<LicenseDraftStore>((set) => ({
  draft: null,
  setDraft: (draft) => set({ draft }),
  clearDraft: () => set({ draft: null }),
}));
