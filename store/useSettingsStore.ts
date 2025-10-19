import { create } from 'zustand';

type Unit = 'celsius' | 'fahrenheit';

interface SettingsState {
  unit: Unit;
  toggleUnit: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  unit: 'celsius',
  toggleUnit: () =>
    set((state) => ({
      unit: state.unit === 'celsius' ? 'fahrenheit' : 'celsius',
    })),
}));