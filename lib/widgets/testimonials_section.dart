import 'package:flutter/material.dart';
import '../models/testimonial.dart';

class TestimonialsSection extends StatelessWidget {
  const TestimonialsSection({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    final testimonials = [
      Testimonial(
        name: 'Sarah Johnson',
        review: 'Amazing service! The stylist understood exactly what I wanted and delivered beyond my expectations.',
        rating: 5,
        service: 'Hair Cut & Styling',
      ),
      Testimonial(
        name: 'Emily Davis',
        review: 'Professional and friendly staff. My hair color turned out perfect!',
        rating: 5,
        service: 'Hair Coloring',
      ),
      Testimonial(
        name: 'Jessica Wilson',
        review: 'The hair treatment made my hair so soft and healthy. Highly recommend!',
        rating: 5,
        service: 'Hair Treatment',
      ),
    ];

    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'What Our Clients Say',
            style: theme.textTheme.displayMedium,
          ),
          const SizedBox(height: 8),
          Text(
            'Real reviews from satisfied customers',
            style: theme.textTheme.bodyLarge?.copyWith(
              color: theme.colorScheme.onBackground.withOpacity(0.7),
            ),
          ),
          const SizedBox(height: 32),
          
          SizedBox(
            height: 200,
            child: PageView.builder(
              itemCount: testimonials.length,
              itemBuilder: (context, index) {
                final testimonial = testimonials[index];
                return TestimonialCard(testimonial: testimonial);
              },
            ),
          ),
        ],
      ),
    );
  }
}

class TestimonialCard extends StatelessWidget {
  final Testimonial testimonial;

  const TestimonialCard({super.key, required this.testimonial});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 8),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: List.generate(5, (index) {
                  return Icon(
                    index < testimonial.rating
                        ? Icons.star
                        : Icons.star_border,
                    color: Colors.amber,
                    size: 20,
                  );
                }),
              ),
              const SizedBox(height: 16),
              
              Expanded(
                child: Text(
                  testimonial.review,
                  style: theme.textTheme.bodyLarge?.copyWith(
                    height: 1.5,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        testimonial.name,
                        style: theme.textTheme.headlineMedium?.copyWith(
                          fontSize: 16,
                        ),
                      ),
                      Text(
                        testimonial.service,
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.colorScheme.onSurface.withOpacity(0.6),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}