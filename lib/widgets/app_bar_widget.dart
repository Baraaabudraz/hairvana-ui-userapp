import 'package:flutter/material.dart';

class AppBarWidget extends StatelessWidget implements PreferredSizeWidget {
  const AppBarWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.primary,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(
              Icons.content_cut,
              color: Theme.of(context).colorScheme.onPrimary,
              size: 20,
            ),
          ),
          const SizedBox(width: 12),
          Text(
            'Hairvana',
            style: Theme.of(context).textTheme.headlineLarge?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
      actions: [
        IconButton(
          onPressed: () {
            _showThemeDialog(context);
          },
          icon: Icon(
            Theme.of(context).brightness == Brightness.light
                ? Icons.dark_mode
                : Icons.light_mode,
          ),
          tooltip: 'Toggle theme',
        ),
        IconButton(
          onPressed: () {
            _showInfoDialog(context);
          },
          icon: const Icon(Icons.info_outline),
          tooltip: 'About',
        ),
      ],
      elevation: 0,
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      foregroundColor: Theme.of(context).textTheme.bodyLarge?.color,
    );
  }

  void _showThemeDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Theme Settings'),
        content: const Text('Theme switching will be implemented in a future update.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  void _showInfoDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('About Hairvana'),
        content: const Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('A Flutter implementation showcasing modern UI components and design patterns.'),
            SizedBox(height: 16),
            Text('Features:'),
            Text('• Responsive design'),
            Text('• Material Design 3'),
            Text('• Smooth animations'),
            Text('• Dark/Light theme support'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}