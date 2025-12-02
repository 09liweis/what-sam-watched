# What Sam Watched

A modern movie tracking web application built with Nuxt 3, featuring movie collections from multiple sources including Douban, Maoyan, IMDB, and more. Track your watched movies, explore new releases, and test your movie knowledge with interactive quizzes.

## 🎬 Features

### Core Functionality
- **Personal Movie Collection**: Track movies you've watched with detailed metadata
- **Multi-Source Integration**: Browse movies from Douban, Maoyan, IMDB, Hong Kong, Taiwan, and Canadian Cineplex
- **Advanced Search**: Search and add movies from Douban API
- **Movie Statistics**: View comprehensive stats about your movie collection
- **Interactive Quiz**: Test your movie knowledge with generated quizzes
- **Authentication**: Secure login system for personalized experience

### Movie Sources
- **Douban**: In theatre, coming soon, popular, chart, and all-time box office
- **Maoyan**: Chinese movie listings
- **IMDB**: Box office rankings
- **Hong Kong Cinema**: Current and upcoming releases
- **Taiwan Cinema**: Current and upcoming releases  
- **Canadian Cineplex**: Local theater listings

### User Interface
- **Responsive Design**: Mobile-friendly with Tailwind CSS
- **Smooth Transitions**: Page transitions and animations
- **Dynamic Navigation**: Auto-hiding header on scroll
- **Filter & Search**: Advanced filtering by country, language, genre, and year
- **Pagination**: Efficient browsing through large collections

## 🛠 Tech Stack

- **Framework**: Nuxt 3 (Vue 3)
- **Styling**: Tailwind CSS with Autoprefixer
- **State Management**: Pinia
- **Image Optimization**: @nuxt/image
- **Deployment**: Render (see render.yaml)
- **TypeScript**: Full TypeScript support
- **API Integration**: Multiple movie database APIs

## 🚀 Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

## 🏃 Development

Start the development server on http://localhost:3000

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## 🏗 Production

Build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Locally preview production build:

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## 🌐 Deployment

This project is configured for deployment on Render. See `render.yaml` for configuration.

## 📁 Project Structure

```
├── components/          # Vue components
│   ├── auth/           # Authentication components
│   ├── movie/          # Movie-related components
│   ├── quiz/           # Quiz components
│   ├── rating/         # Rating display components
│   ├── search/         # Search functionality
│   └── videos/         # Video components
├── constants/          # Application constants
├── layouts/           # Nuxt layouts
├── pages/             # Application pages
│   ├── movie/         # Movie detail pages
│   └── movies/        # Movie listing pages
├── server/            # Server-side code
├── stores/            # Pinia stores
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🔧 Configuration

### Environment Variables
- `API_HOST`: API base URL (configured in nuxt.config.ts)

### Image Domains
- Douban images: `https://img9.doubanio.com` (configured for @nuxt/image)

## 📊 API Endpoints

The application integrates with multiple movie database APIs:
- Douban Search API for movie discovery
- Various cinema APIs for current listings
- Custom backend endpoints for data management

## 🎯 TODO

- [x] Search movie on Douban search API
- [x] Add search movie to DB through API
- [ ] Refactor search and add Douban movie
- [ ] Movie detail page with Douban summary API
- [ ] Enhanced movie recommendations
- [ ] Social features (sharing, reviews)
- [ ] Export movie collection
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🔗 Related Links

- [Nuxt 3 Documentation](https://v3.nuxtjs.org)
- [Vue 3 Documentation](https://vuejs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Pinia Documentation](https://pinia.vuejs.org)