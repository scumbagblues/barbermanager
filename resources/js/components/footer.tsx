import { useAppearance } from '@/hooks/use-appearance';

export function Footer() {
    const { appearance } = useAppearance();

    const isDarkMode = appearance === 'dark';

    return (
        <footer
            className={`absolute bottom-0 left-0 w-full py-2 px-4 z-50 shadow-lg ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
        >
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-sm">
                    © {new Date().getFullYear()} Barber Manager. All rights reserved. Built by Supercharged Inc.
                </p>
            </div>
        </footer>
    );
}