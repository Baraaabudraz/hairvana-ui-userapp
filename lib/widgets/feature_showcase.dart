import 'package:flutter/material.dart';

class FeatureShowcase extends StatelessWidget {
  const FeatureShowcase({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Features',
          style: Theme.of(context).textTheme.headlineLarge,
        ),
        const SizedBox(height: 16),
        
        _buildFeatureCard(
          context,
          icon: Icons.phone_android,
          title: 'Cross-Platform',
          description: 'Runs natively on both Android and iOS devices',
          color: Colors.blue,
        ),
        
        const SizedBox(height: 12),
        
        _buildFeatureCard(
          context,
          icon: Icons.animation,
          title: 'Smooth Animations',
          description: 'Fluid 60fps animations with Flutter\'s animation framework',
          color: Colors.green,
        ),
        
        const SizedBox(height: 12),
        
        _buildFeatureCard(
          context,
          icon: Icons.palette,
          title: 'Material Design 3',
          description: 'Modern design system with dynamic theming support',
          color: Colors.purple,
        ),
        
        const SizedBox(height: 12),
        
        _buildFeatureCard(
          context,
          icon: Icons.responsive_layout,
          title: 'Responsive Layout',
          description: 'Adapts beautifully to different screen sizes and orientations',
          color: Colors.orange,
        ),
      ],
    );
  }

  Widget _buildFeatureCard(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String description,
    required Color color,
  }) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(
                icon,
                color: color,
                size: 24,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    description,
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}