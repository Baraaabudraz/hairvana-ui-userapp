import 'package:flutter/material.dart';
import '../widgets/hairvana_counter_component.dart';
import '../widgets/app_bar_widget.dart';
import '../widgets/feature_showcase.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppBarWidget(),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Hero Section
              Container(
                padding: const EdgeInsets.all(32.0),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      Theme.of(context).colorScheme.primary.withOpacity(0.05),
                      Theme.of(context).colorScheme.primary.withOpacity(0.02),
                    ],
                  ),
                  borderRadius: BorderRadius.circular(24),
                ),
                child: Column(
                  children: [
                    Text(
                      'Welcome to Hairvana',
                      style: Theme.of(context).textTheme.displayMedium,
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Experience the power of Flutter with beautiful, responsive components',
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: Theme.of(context).textTheme.bodyMedium?.color,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
              
              const SizedBox(height: 32),
              
              // Main Counter Component
              const HairvanaCounterComponent(),
              
              const SizedBox(height: 32),
              
              // Feature Showcase
              const FeatureShowcase(),
              
              const SizedBox(height: 32),
              
              // Additional Components Section
              _buildAdditionalComponents(context),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAdditionalComponents(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Additional Components',
          style: Theme.of(context).textTheme.headlineLarge,
        ),
        const SizedBox(height: 16),
        
        // Grid of sample components
        GridView.count(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
          childAspectRatio: 1.2,
          children: [
            _buildSampleCard(
              context,
              'Button Variants',
              'Explore different button styles',
              Icons.touch_app,
              Colors.blue,
            ),
            _buildSampleCard(
              context,
              'Form Elements',
              'Input fields and validation',
              Icons.edit_note,
              Colors.green,
            ),
            _buildSampleCard(
              context,
              'Navigation',
              'Drawer and tab navigation',
              Icons.navigation,
              Colors.orange,
            ),
            _buildSampleCard(
              context,
              'Data Display',
              'Lists, cards, and tables',
              Icons.view_list,
              Colors.purple,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildSampleCard(
    BuildContext context,
    String title,
    String description,
    IconData icon,
    Color color,
  ) {
    return Card(
      child: InkWell(
        onTap: () {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('$title component coming soon!'),
              behavior: SnackBarBehavior.floating,
            ),
          );
        },
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                icon,
                size: 32,
                color: color,
              ),
              const SizedBox(height: 12),
              Text(
                title,
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  fontSize: 16,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                description,
                style: Theme.of(context).textTheme.bodyMedium,
                textAlign: TextAlign.center,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      ),
    );
  }
}