import { configure } from "mobx";

import memoize from "memoize-state";

import { EnergyStore } from "./EnergyStore";

configure({
  isolateGlobalState: true,
});

interface StoreConfig {}

export type RootStore = {
  energyStore: EnergyStore;
};

type StoreCreator = (config: StoreConfig) => RootStore;

export const createStore: StoreCreator = memoize(() => ({
  energyStore: new EnergyStore(),
}));

export { EnergyStore };
