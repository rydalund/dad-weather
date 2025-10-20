import { create } from 'zustand';
import { Unit } from '@/constants/unit';

interface SettingsState {
  unit: Unit;
  toggleUnit: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
 unit: Unit.Celsius,
  toggleUnit: () =>
    set((state) => ({
      unit: state.unit === Unit.Celsius ? Unit.Fahrenheit : Unit.Celsius,
    })),
}));