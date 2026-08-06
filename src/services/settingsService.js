import storage from './localStorageService';

export const settingsService = {
  get: () => storage.getSettings(),
  save(settings) {
    storage.saveSettings(settings);
    return settings;
  },
};
