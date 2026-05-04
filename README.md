# bytesize.

> A mobile-first educational platform built with React Native and Expo

bytesize. is an interactive learning application that delivers bite-sized courses in a modern, engaging interface. Designed with a Neo-brutalist aesthetic, ByteSize makes education accessible, fun, and visually striking.

---

## Features

- **Course Library**: Browse and access multiple courses across various subjects
- **Progress Tracking**: Visual progress bars and completion tracking for each course
- **Interactive Lessons**: Multiple lesson types including:
  - Theory blocks for conceptual learning
  - Flashcards for memorization
  - Multiple choice questions
  - Fill-in-the-blanks exercises
  - Matching games
- **User Accounts**: Personalized learning experience with account management
- **Responsive Design**: Optimized for mobile devices with smooth animations
- **Offline Support**: Built with Expo for cross-platform compatibility

---

## Quick Start

### For Users (Expo Go - Zero Setup)

1. Install [Expo Go](https://expo.dev/client) on your mobile device
2. Ask a team member for the development QR code
3. Scan and start learning!

### For Developers

```bash
# Clone the repository
git clone https://github.com/JamesFromOrgus/BytesizeFrontEnd.git
cd BytesizeFrontEnd

# Install dependencies
npm install

# Start the development server
npm start
```

---

## Tech Stack

- **Framework**: React Native 0.83.2
- **Runtime**: Expo SDK 55
- **Language**: TypeScript 5.9
- **UI Library**: React Native core components
- **Fonts**: Montserrat (Google Fonts)
- **Navigation**: Custom navigation system
- **State Management**: React Hooks

---

## Project Structure

```
bytesize/
├── .expo/                      # Expo configuration cache (auto-generated)
├── .vscode/                    # VSCode workspace settings
├── assets/                     # Images, icons, and static resources
│   ├── accounts-icon.png
│   ├── accounts-selected-icon.png
│   ├── adaptive-icon.png
│   ├── back-arrow.png
│   ├── cartoonpfp-2.jpg
│   ├── cartoonpfp-3.jpg
│   ├── cartoonpfp-4.jpg
│   ├── cartoonpfp.jpg
│   ├── ellipse-black.png
│   ├── ellipse.png
│   ├── favicon.png
│   ├── graph-cat.png
│   ├── home-icon.png
│   ├── home-selected-icon.png
│   ├── icon.png
│   ├── lesson-selection-ellipse.png
│   ├── page-locator-centre.png
│   ├── page-locator-right.png
│   ├── pattern-black.png
│   ├── pattern.png
│   ├── splash-icon.png
│   └── star.png
│
├── Atoms/                      # Atomic design: smallest UI components
│   ├── Button.tsx              # Reusable button component
│   ├── InputBox.tsx            # Text input component
│   └── Toggle.tsx              # Toggle switch component
│
├── Molecules/                  # Composed components from atoms
│   ├── dummy_molecule.tsx      # Example molecule component
│   ├── FillInTheBlanks.tsx     # Fill-in-the-blanks exercise
│   ├── Flashcards.tsx          # Flashcard learning component
│   ├── Match.tsx               # Matching game component
│   ├── MultiChoice.tsx         # Multiple choice question
│   ├── MultiChoiceOption.tsx   # Individual multiple choice option
│   └── TheoryBlock.tsx         # Theory/content block component
│
├── Pages/                      # Screen components (full pages)
│   ├── AccountPage.tsx         # User account page
│   ├── CourseLessonsPage.tsx   # Course lesson listing
│   ├── HomePage.tsx            # Main home screen
│   ├── Lesson1.tsx             # Individual lesson screens
│   ├── Lesson2.tsx
│   ├── Lesson3.tsx
│   ├── Lesson4.tsx
│   ├── Lesson5.tsx
│   ├── Lesson6.tsx
│   ├── Lesson7.tsx
│   ├── Lesson8.tsx
│   ├── Lesson9.tsx
│   ├── Lesson10.tsx
│   ├── Lesson11.tsx
│   ├── LessonPage.tsx          # Lesson container/wrapper
│   ├── LessonSuccessPage.tsx   # Lesson completion screen
│   ├── LoginPage.tsx           # User login screen
│   ├── OnboardingPage.tsx      # First-time user onboarding
│   ├── RegisterPage.tsx        # User registration screen
│   ├── SettingsPage.tsx        # App settings screen
│   └── StartPage.tsx           # Initial landing page
│
├── node_modules/               # Installed dependencies (auto-generated)
├── .gitignore                  # Git ignore rules
├── app.json                    # Expo application configuration
├── App.tsx                     # Main application entry point
├── index.ts                    # Root index file
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── StyleVariables.tsx          # Global design system (colors, fonts)
├── README.md                   # Project documentation
└── tsconfig.json               # TypeScript compiler configuration
```

**Component Architecture**: Follows [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) principles for scalable UI development.

---

## Design System

ByteSize features a bold Neo-brutalist design with:

- **Color Palette**: 
  - Orange (Primary courses)
  - Blue (Secondary courses)
  - Green (Featured/Active)
  - Black (Borders & text)
  - White (Backgrounds)

- **Typography**: Montserrat SemiBold (600)
- **UI Elements**: Thick black borders, rounded corners, flat colors
- **Animations**: Smooth transitions with React Native Animated API

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with QR code |
| `npm run android` | Launch on Android emulator |
| `npm run ios` | Launch on iOS simulator (macOS only) |
| `npm run web` | Launch in web browser |

---

## Git Workflow

**Active Branch**: `main`

```bash
# Always work on main branch
git switch main

# Before starting work
git pull origin main

# After making changes
git add .
git commit -m "feat: add lesson completion animation"
git push origin main
```

**Commit Message Convention**:
- `feat:` New features
- `fix:` Bug fixes
- `refactor:` Code restructuring
- `docs:` Documentation updates

---

## Component Overview

### Atoms (Reusable UI Components)
- **Button**: Customizable button with image/text support
- **InputBox**: Text input with validation styling
- **Toggle**: Switch component for settings

### Molecules (Composite Components)
- **Flashcards**: Swipeable card-based learning
- **MultiChoice**: Multiple choice question component
- **FillInTheBlanks**: Interactive text completion
- **Match**: Drag-and-drop matching game
- **TheoryBlock**: Rich text content blocks

### Pages (Screens)
- **HomePage**: Course catalog and featured content
- **CourseLessonsPage**: Lesson list for a course
- **LessonPage**: Individual lesson container
- **LessonSuccessPage**: Completion celebration screen
- **AccountPage**: User profile and settings
- **LoginPage** / **RegisterPage**: Authentication flows
- **OnboardingPage**: First-time user experience

---

## Troubleshooting

**Common Issues:**

| Issue | Solution |
|-------|----------|
| Fonts not loading | Run `npx expo start -c` to clear cache |
| Module not found | Delete `node_modules` and run `npm install` |
| Expo CLI not found | Install globally: `npm install -g expo-cli` |
| Android emulator won't start | Verify Android Studio setup and AVD creation |
| iOS simulator issues (macOS) | Run `xcode-select --install` |

---

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Atomic Design Principles](https://bradfrost.com/blog/post/atomic-web-design/)

---

## Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request to `main`

**Code Style:**
- Use TypeScript for all new files
- Follow existing component structure (Atoms/Molecules/Pages)
- Keep components focused and reusable
- Use `StyleVariables.tsx` for all colors and design tokens
- Add comments for complex logic

---

## License

This project is part of an educational initiative. All rights reserved.

---

## Acknowledgments

- Design inspiration from Neo-brutalist UI trends
- Font: [Montserrat by Google Fonts](https://fonts.google.com/specimen/Montserrat)
- Built with love using Expo and React Native

---

## Contact

For questions or support:
- GitHub Issues: [Report a bug](https://github.com/JamesFromOrgus/BytesizeFrontEnd/issues)
