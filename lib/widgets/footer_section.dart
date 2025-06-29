import 'package:flutter/material.dart';

class FooterSection extends StatelessWidget {
  const FooterSection({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        border: Border(
          top: BorderSide(
            color: theme.colorScheme.outline.withOpacity(0.2),
          ),
        ),
      ),
      child: Column(
        children: [
          // Contact Info
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _ContactItem(
                icon: Icons.phone,
                title: 'Call Us',
                subtitle: '+1 (555) 123-4567',
                theme: theme,
              ),
              _ContactItem(
                icon: Icons.location_on,
                title: 'Visit Us',
                subtitle: '123 Beauty St',
                theme: theme,
              ),
              _ContactItem(
                icon: Icons.access_time,
                title: 'Hours',
                subtitle: '9AM - 6PM',
                theme: theme,
              ),
            ],
          ),
          const SizedBox(height: 32),
          
          // Social Media
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _SocialButton(
                icon: Icons.facebook,
                onTap: () {},
                theme: theme,
              ),
              const SizedBox(width: 16),
              _SocialButton(
                icon: Icons.camera_alt,
                onTap: () {},
                theme: theme,
              ),
              const SizedBox(width: 16),
              _SocialButton(
                icon: Icons.alternate_email,
                onTap: () {},
                theme: theme,
              ),
            ],
          ),
          const SizedBox(height: 24),
          
          // Copyright
          Text(
            '© 2024 Hairvana. All rights reserved.',
            style: theme.textTheme.bodySmall?.copyWith(
              color: theme.colorScheme.onSurface.withOpacity(0.6),
            ),
          ),
        ],
      ),
    );
  }
}

class _ContactItem extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final ThemeData theme;

  const _ContactItem({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.theme,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            color: theme.colorScheme.primary.withOpacity(0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Icon(
            icon,
            color: theme.colorScheme.primary,
            size: 24,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          title,
          style: theme.textTheme.headlineMedium?.copyWith(
            fontSize: 14,
          ),
        ),
        Text(
          subtitle,
          style: theme.textTheme.bodySmall?.copyWith(
            color: theme.colorScheme.onSurface.withOpacity(0.7),
          ),
        ),
      ],
    );
  }
}

class _SocialButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;
  final ThemeData theme;

  const _SocialButton({
    required this.icon,
    required this.onTap,
    required this.theme,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        width: 48,
        height: 48,
        decoration: BoxDecoration(
          border: Border.all(
            color: theme.colorScheme.outline.withOpacity(0.3),
          ),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(
          icon,
          color: theme.colorScheme.onSurface.withOpacity(0.7),
          size: 24,
        ),
      ),
    );
  }
}