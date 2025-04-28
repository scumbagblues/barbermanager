import { useAppearance } from '@/hooks/use-appearance';

export function Footer() {
    const { appearance } = useAppearance();

    const isDarkMode = appearance === 'dark';

    return (
        <footer
            className={`fixed bottom-0 left-0 w-full py-4 ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
        >
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    © {new Date().getFullYear()} Barber Manager. All rights reserved.
                </p>
                <p className="text-sm">
                    Built by Supercharged Inc.
                </p>
            </div>
        </footer>
    );
}