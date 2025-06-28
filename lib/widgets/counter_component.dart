import 'package:flutter/material.dart';

class CounterComponent extends StatefulWidget {
  const CounterComponent({super.key});

  @override
  State<CounterComponent> createState() => _CounterComponentState();
}

class _CounterComponentState extends State<CounterComponent> 
    with SingleTickerProviderStateMixin {
  int count = 0;
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 150),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 1.1,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _animateButton() {
    _animationController.forward().then((_) {
      _animationController.reverse();
    });
  }

  void incrementCount() {
    setState(() {
      count++;
    });
    _animateButton();
  }

  void decrementCount() {
    setState(() {
      count--;
    });
    _animateButton();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24.0),
      margin: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16.0),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 12.0,
            offset: const Offset(0, 4),
            spreadRadius: 0,
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text(
            'Component Example',
            style: TextStyle(
              fontSize: 28.0,
              fontWeight: FontWeight.bold,
              color: Color(0xFF1a1a1a),
              letterSpacing: -0.5,
            ),
          ),
          const SizedBox(height: 24.0),
          AnimatedBuilder(
            animation: _scaleAnimation,
            builder: (context, child) {
              return Transform.scale(
                scale: _scaleAnimation.value,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 20.0,
                    vertical: 12.0,
                  ),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF8F9FA),
                    borderRadius: BorderRadius.circular(12.0),
                    border: Border.all(
                      color: const Color(0xFFE9ECEF),
                      width: 1.0,
                    ),
                  ),
                  child: Text(
                    '$count',
                    style: const TextStyle(
                      fontSize: 32.0,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFF1a1a1a),
                    ),
                  ),
                ),
              );
            },
          ),
          const SizedBox(height: 24.0),
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              _buildButton(
                label: '−',
                onPressed: decrementCount,
                backgroundColor: const Color(0xFFDC3545),
              ),
              const SizedBox(width: 12.0),
              _buildButton(
                label: '+',
                onPressed: incrementCount,
                backgroundColor: const Color(0xFF28A745),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildButton({
    required String label,
    required VoidCallback onPressed,
    required Color backgroundColor,
  }) {
    return Material(
      color: backgroundColor,
      borderRadius: BorderRadius.circular(12.0),
      elevation: 2.0,
      child: InkWell(
        onTap: onPressed,
        borderRadius: BorderRadius.circular(12.0),
        child: Container(
          padding: const EdgeInsets.symmetric(
            horizontal: 24.0,
            vertical: 16.0,
          ),
          child: Text(
            label,
            style: const TextStyle(
              fontSize: 20.0,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}