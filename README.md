# Hairvana Flutter App

A complete Flutter implementation recreating the Hairvana UI components from the original Next.js/React version. This app showcases modern Flutter development practices with Material Design 3, smooth animations, and responsive layouts.

## 🚀 Features

- **Cross-Platform**: Runs natively on Android and iOS
- **Material Design 3**: Modern design system with dynamic theming
- **Smooth Animations**: 60fps animations using Flutter's animation framework
- **Responsive Layout**: Adapts to different screen sizes and orientations
- **Dark/Light Theme**: System-aware theme switching
- **Component Showcase**: Interactive examples of various UI components
- **Performance Optimized**: Efficient widget composition and state management

## 📱 Screenshots

The app includes:
- Interactive counter component with smooth animations
- Feature showcase highlighting Flutter capabilities
- Component gallery with various UI elements
- Responsive design that works on phones and tablets

## 🛠️ Getting Started

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

## 📁 Project Structure

```
lib/
├── main.dart                           # App entry point
├── theme/
│   └── app_theme.dart                  # Theme configuration
├── screens/
│   └── home_screen.dart                # Main home screen
└── widgets/
    ├── app_bar_widget.dart             # Custom app bar
    ├── hairvana_counter_component.dart # Main counter component
    └── feature_showcase.dart           # Feature display widget
```

## 🎨 Design System

### Colors
- **Primary**: `#1a1a1a` (Dark gray)
- **Background**: `#F5F5F5` (Light gray)
- **Success**: `#10B981` (Green)
- **Error**: `#EF4444` (Red)
- **Warning**: `#F59E0B` (Orange)

### Typography
- **Font Family**: Inter (via Google Fonts)
- **Responsive text scaling**
- **Consistent spacing and hierarchy**

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Material Design 3 elevated buttons
- **Animations**: Smooth scale and ripple effects

## 🔧 Key Components

### HairvanaCounterComponent
The main interactive component featuring:
- Animated counter display
- Smooth button interactions
- Ripple effects on button press
- Scale animations for visual feedback

### AppBarWidget
Custom app bar with:
- Brand logo and title
- Theme toggle functionality
- Info dialog
- Consistent styling

### FeatureShowcase
Displays app capabilities:
- Cross-platform support
- Animation capabilities
- Material Design 3
- Responsive layout

## 🚀 Performance

- **Optimized Rebuilds**: Using `setState` only when necessary
- **Efficient Animations**: Hardware-accelerated animations
- **Memory Management**: Proper disposal of animation controllers
- **Responsive Design**: Adaptive layouts for different screen sizes

## 🎯 Future Enhancements

- [ ] Theme persistence
- [ ] Additional component examples
- [ ] Navigation between screens
- [ ] Form validation examples
- [ ] Data persistence
- [ ] API integration examples

## 📄 License

This project is created for educational and demonstration purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.