import 'package:flutter/material.dart';

class HairvanaCounterComponent extends StatefulWidget {
  const HairvanaCounterComponent({super.key});

  @override
  State<HairvanaCounterComponent> createState() => _HairvanaCounterComponentState();
}

class _HairvanaCounterComponentState extends State<HairvanaCounterComponent>
    with TickerProviderStateMixin {
  int count = 0;
  late AnimationController _scaleController;
  late AnimationController _rippleController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _rippleAnimation;

  @override
  void initState() {
    super.initState();
    
    _scaleController = AnimationController(
      duration: const Duration(milliseconds: 150),
      vsync: this,
    );
    
    _rippleController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 1.05,
    ).animate(CurvedAnimation(
      parent: _scaleController,
      curve: Curves.easeInOut,
    ));
    
    _rippleAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _rippleController,
      curve: Curves.easeOut,
    ));
  }

  @override
  void dispose() {
    _scaleController.dispose();
    _rippleController.dispose();
    super.dispose();
  }

  void _animateButton() {
    _scaleController.forward().then((_) {
      _scaleController.reverse();
    });
    _rippleController.forward().then((_) {
      _rippleController.reset();
    });
  }

  void _incrementCount() {
    setState(() {
      count++;
    });
    _animateButton();
  }

  void _decrementCount() {
    setState(() {
      count--;
    });
    _animateButton();
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Container(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Title
            Text(
              'Component Example',
              style: Theme.of(context).textTheme.displayMedium,
              textAlign: TextAlign.center,
            ),
            
            const SizedBox(height: 32),
            
            // Counter Display
            AnimatedBuilder(
              animation: _scaleAnimation,
              builder: (context, child) {
                return Transform.scale(
                  scale: _scaleAnimation.value,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 32,
                      vertical: 20,
                    ),
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.primary.withOpacity(0.05),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: Theme.of(context).colorScheme.primary.withOpacity(0.1),
                        width: 1,
                      ),
                    ),
                    child: Text(
                      '$count',
                      style: Theme.of(context).textTheme.displayLarge?.copyWith(
                        fontSize: 48,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                );
              },
            ),
            
            const SizedBox(height: 32),
            
            // Action Buttons
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _buildActionButton(
                  context,
                  label: '−',
                  onPressed: _decrementCount,
                  backgroundColor: Theme.of(context).colorScheme.error,
                  foregroundColor: Colors.white,
                ),
                
                const SizedBox(width: 16),
                
                _buildActionButton(
                  context,
                  label: '+',
                  onPressed: _incrementCount,
                  backgroundColor: const Color(0xFF10B981),
                  foregroundColor: Colors.white,
                ),
              ],
            ),
            
            const SizedBox(height: 24),
            
            // Additional Info
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surface,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: Theme.of(context).colorScheme.outline.withOpacity(0.2),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.info_outline,
                    size: 16,
                    color: Theme.of(context).textTheme.bodyMedium?.color,
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Tap the buttons to see smooth animations',
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

  Widget _buildActionButton(
    BuildContext context, {
    required String label,
    required VoidCallback onPressed,
    required Color backgroundColor,
    required Color foregroundColor,
  }) {
    return Stack(
      alignment: Alignment.center,
      children: [
        // Ripple effect
        AnimatedBuilder(
          animation: _rippleAnimation,
          builder: (context, child) {
            return Container(
              width: 60 + (_rippleAnimation.value * 20),
              height: 60 + (_rippleAnimation.value * 20),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: backgroundColor.withOpacity(
                  0.3 * (1 - _rippleAnimation.value),
                ),
              ),
            );
          },
        ),
        
        // Main button
        Material(
          color: backgroundColor,
          borderRadius: BorderRadius.circular(16),
          elevation: 4,
          shadowColor: backgroundColor.withOpacity(0.3),
          child: InkWell(
            onTap: onPressed,
            borderRadius: BorderRadius.circular(16),
            child: Container(
              width: 60,
              height: 60,
              alignment: Alignment.center,
              child: Text(
                label,
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: foregroundColor,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}