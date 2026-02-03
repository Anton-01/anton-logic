# Anton Logic

> Professional Software Development & Digital Services Agency Website
A modern, responsive single-page application featuring bilingual support, custom animations, glassmorphism design, and a tech-blue color palette. Built with vanilla HTML5, CSS3, and JavaScript for optimal performance.

![Anton Logic](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Features

- **Bilingual Support** - Full Spanish/English language switching with localStorage persistence
- **Responsive Design** - Mobile-first approach with breakpoints at 640px, 768px, 1024px, and 1200px
- **Modern Animations** - Custom AOS-like scroll animations, parallax effects, and smooth transitions
- **Glassmorphism UI** - Contemporary design with glass-morphism cards and gradient overlays
- **SEO Optimized** - Comprehensive meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation, and focus management
- **Performance** - No external dependencies, lazy loading, and optimized asset delivery
- **Contact Form** - Integrated form with validation and notification system

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Custom properties, Grid, Flexbox, Animations |
| JavaScript ES6+ | Interactivity, IntersectionObserver, LocalStorage |
| Google Fonts | Space Grotesk & DM Sans typography |

## Project Structure

```
anton-logic/
├── index.html          # Main HTML file with all sections
├── styles.css          # Complete styling with CSS variables
├── script.js           # JavaScript modules and functionality
├── favicon.svg         # Vector favicon
├── README.md           # Project documentation
└── .gitignore          # Git ignore rules
```

## Sections

1. **Hero** - Eye-catching introduction with code mockup and statistics
2. **Services** - Six service offerings with animated cards
3. **About** - Company value proposition with feature highlights
4. **Portfolio** - Featured projects showcase
5. **Process** - Four-step workflow timeline
6. **Contact** - Multi-channel contact information and form
7. **Footer** - Links, social media, and legal information

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#0055FF` | Buttons, links, accents |
| Secondary Teal | `#00D4AA` | Gradients, highlights |
| Dark | `#0A1628` | Backgrounds, text |
| White | `#FFFFFF` | Light sections, cards |

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/antonlogic/anton-logic.git
cd anton-logic
```

2. Open `index.html` in your browser or serve with a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

3. Visit `http://localhost:8000` in your browser.

## Configuration

### Language Settings

The website defaults to Spanish but automatically detects browser language. Users can toggle between ES/EN using the header button. Preferences are saved in localStorage.

### Contact Form

The contact form currently simulates submission. For production, integrate with your preferred email service:

- **Web3Forms** - Free, no backend required
- **Formspree** - Simple form backend
- **EmailJS** - Send emails directly from JavaScript
- **Custom API** - Your own backend endpoint

### Anti-Spam Protection

Recommended protections for production:
- **Honeypot field** - Hidden field to catch bots
- **reCAPTCHA v3** - Invisible spam protection
- **Rate limiting** - Server-side request throttling
- **Input validation** - Client and server-side validation

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 80+ |
| Firefox | 75+ |
| Safari | 13+ |
| Edge | 80+ |

## Performance

- **Lighthouse Score**: 95+ Performance
- **No external frameworks** - Reduced bundle size
- **CSS Variables** - Efficient theming
- **Lazy loading** - Deferred image loading
- **Intersection Observer** - Efficient scroll handling

## Customization

### Colors

Edit CSS variables in `styles.css`:
```css
:root {
    --color-primary: #0055FF;
    --color-secondary: #00D4AA;
    --color-dark: #0A1628;
}
```

### Content

Update text using `data-es` and `data-en` attributes for bilingual support:
```html
<h1 data-es="Hola" data-en="Hello">Hola</h1>
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Anton Logic**
- Website: [antonlogic.com](https://antonlogic.com)
- Email: contacto@antonlogic.com
- LinkedIn: [@antonlogic](https://linkedin.com/company/antonlogic)
- Twitter: [@antonlogic](https://twitter.com/antonlogic)

---

Built with passion by **Anton Logic** | Ciudad de Morelia, Michoacán, MX
