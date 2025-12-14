/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6366f1',
                    dark: '#4f46e5',
                    light: '#818cf8',
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                },
                secondary: {
                    DEFAULT: '#a855f7',
                    dark: '#9333ea',
                    light: '#c084fc',
                    500: '#a855f7',
                    600: '#9333ea',
                },
                accent: {
                    DEFAULT: '#ec4899',
                    dark: '#db2777',
                    light: '#f472b6',
                },
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444',
                background: {
                    DEFAULT: '#0f172a',
                    light: '#1e293b',
                    dark: '#020617',
                },
                surface: {
                    DEFAULT: '#1e293b',
                    light: '#334155',
                    dark: '#0f172a',
                },
                text: {
                    DEFAULT: '#f1f5f9',
                    muted: '#94a3b8',
                    dark: '#64748b',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'gradient-success': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(240,100%,70%,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(280,100%,70%,0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(260,100%,70%,0.2) 0px, transparent 50%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'slide-down': 'slideDown 0.4s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'bounce-slow': 'bounce 3s infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
            boxShadow: {
                'glow': '0 0 20px rgba(99, 102, 241, 0.5)',
                'glow-lg': '0 0 40px rgba(99, 102, 241, 0.6)',
                'glow-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
                'inner-glow': 'inset 0 0 20px rgba(99, 102, 241, 0.3)',
                'elegant': '0 10px 40px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)',
                'elegant-lg': '0 20px 60px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)',
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
