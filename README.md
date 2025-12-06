# Anita Landing Page

A modern, sleek, black-themed landing page for Anita - Your smart AI finance assistant.

## Features

- **Modern Design**: Black background with white text and grey accents
- **Liquid Glass Effect**: Glassmorphism design for cards and sections
- **Fully Responsive**: Optimized for mobile and desktop devices
- **Smooth Animations**: Subtle hover effects and transitions
- **Rounded Design**: Consistent rounded corners throughout

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Customization

To update the CTA button link, edit the `handleCTAClick` function in `App.jsx`:

```jsx
const handleCTAClick = () => {
  window.location.href = 'https://your-anita-webapp-url.com';
};
```

## Technologies

- React 18
- Vite
- CSS3 (with glassmorphism effects)

