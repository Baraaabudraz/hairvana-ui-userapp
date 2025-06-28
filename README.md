# Hairvana Flutter App

A Flutter implementation of the Hairvana counter component, recreated from the original Next.js/React version.

## Features

- Clean, modern UI design matching the original component
- Smooth animations and micro-interactions
- Responsive layout that works on different screen sizes
- Material Design 3 theming
- Optimized for both Android and iOS

## Getting Started

### Prerequisites

- Flutter SDK (3.0.0 or higher)
- Dart SDK
- Android Studio / VS Code with Flutter extensions
- iOS development tools (for iOS deployment)

### Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   flutter pub get
   ```

### Running the App

To run the app in debug mode:

```bash
flutter run
```

To build for release:

```bash
# Android
flutter build apk --release

# iOS
flutter build ios --release
```

## Project Structure

```
lib/
├── main.dart                 # App entry point
├── counter_screen.dart       # Main counter screen
└── widgets/
    └── counter_component.dart # Enhanced counter component with animations
```

## Key Components

- **CounterScreen**: The main screen containing the counter functionality
- **CounterComponent**: An enhanced version with animations and improved styling
- **Material Design 3**: Modern theming and component styling

## Customization

The app uses a clean color scheme that can be easily customized in `main.dart`:

- Primary color: `#1a1a1a` (dark gray)
- Background: `#F5F5F5` (light gray)
- Component background: White with subtle shadows

## Performance

- Optimized widget rebuilds using `setState` only when necessary
- Smooth 60fps animations using Flutter's animation framework
- Minimal memory footprint with efficient widget composition