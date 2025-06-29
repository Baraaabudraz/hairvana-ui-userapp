import 'package:flutter/material.dart';
import '../models/service.dart';

class ServicesSection extends StatelessWidget {
  const ServicesSection({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    final services = [
      Service(
        title: 'Hair Cut & Styling',
        description: 'Professional cuts and styling for all hair types',
        price: '\$45',
        icon: Icons.content_cut,
        duration: '45 min',
      ),
      Service(
        title: 'Hair Coloring',
        description: 'Expert coloring and highlights',
        price: '\$85',
        icon: Icons.palette,
        duration: '90 min',
      ),
      Service(
        title: 'Hair Treatment',
        description: 'Deep conditioning and repair treatments',
        price: '\$65',
        icon: Icons.spa,
        duration: '60 min',
      ),
      Service(
        title: 'Bridal Package',
        description: 'Complete bridal hair and makeup',
        price: '\$150',
        icon: Icons.favorite,
        duration: '120 min',
      ),
    ];

    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Our Services',
            style: theme.textTheme.displayMedium,
          ),
          const SizedBox(height: 8),
          Text(
            'Professional beauty services tailored to your needs',
            style: theme.textTheme.bodyLarge?.copyWith(
              color: theme.colorScheme.onBackground.withOpacity(0.7),
            ),
          ),
          const SizedBox(height: 32),
          
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              childAspectRatio: 0.8,
            ),
            itemCount: services.length,
            itemBuilder: (context, index) {
              final service = services[index];
              return ServiceCard(service: service);
            },
          ),
        ],
      ),
    );
  }
}

class ServiceCard extends StatelessWidget {
  final Service service;

  const ServiceCard({super.key, required this.service});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: theme.colorScheme.primary.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(
                service.icon,
                color: theme.colorScheme.primary,
                size: 24,
              ),
            ),
            const SizedBox(height: 16),
            
            Text(
              service.title,
              style: theme.textTheme.headlineMedium?.copyWith(
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 8),
            
            Text(
              service.description,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurface.withOpacity(0.7),
                height: 1.4,
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            const Spacer(),
            
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  service.price,
                  style: theme.textTheme.headlineMedium?.copyWith(
                    color: theme.colorScheme.primary,
                    fontSize: 18,
                  ),
                ),
                Text(
                  service.duration,
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurface.withOpacity(0.6),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}