import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { settingsService } from '../services/settingsService';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(() => settingsService.get());

    const saveSettings = useCallback((nextSettings) => {
        const saved = settingsService.save(nextSettings);
        setSettings(saved);
        return saved;
    }, []);

    const value = useMemo(() => ({ settings, saveSettings }), [settings, saveSettings]);

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('useSettings must be used within SettingsProvider');
    return context;
}
