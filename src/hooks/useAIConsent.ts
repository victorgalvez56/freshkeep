import { useState, useCallback } from 'react';
import { useSettings } from '../contexts/SettingsContext';

export function useAIConsent() {
  const { settings, updateSetting } = useSettings();
  const [showDialog, setShowDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const requireConsent = useCallback(
    (action: () => void) => {
      if (settings.hasConsentedAI) {
        action();
      } else {
        setPendingAction(() => action);
        setShowDialog(true);
      }
    },
    [settings.hasConsentedAI],
  );

  const handleAccept = useCallback(async () => {
    await updateSetting('hasConsentedAI', true);
    setShowDialog(false);
    pendingAction?.();
    setPendingAction(null);
  }, [updateSetting, pendingAction]);

  const handleDecline = useCallback(() => {
    setShowDialog(false);
    setPendingAction(null);
  }, []);

  return {
    hasConsented: settings.hasConsentedAI,
    showDialog,
    requireConsent,
    handleAccept,
    handleDecline,
  };
}
