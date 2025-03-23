declare global {
    interface Window {
        Telegram?: {
            WebApp: {
                initData: string;
                initDataUnsafe: object;
                version: string;
                platform: string;
                colorScheme: string;
                themeParams: Record<string, string>;
                isExpanded: boolean;
                isClosingConfirmationEnabled: boolean;
                backButton: {
                    isVisible: boolean;
                    show(): void;
                    hide(): void;
                    onClick(callback: () => void): void;
                    offClick(callback: () => void): void;
                };
                MainButton: {
                    text: string;
                    color: string;
                    textColor: string;
                    isVisible: boolean;
                    isActive: boolean;
                    setText(text: string): void;
                    onClick(callback: () => void): void;
                    show(): void;
                    hide(): void;
                    enable(): void;
                    disable(): void;
                };
                showAlert(message: string): void;
                ready(): void;
                close(): void;
            };
        };
    }
}

export {};
