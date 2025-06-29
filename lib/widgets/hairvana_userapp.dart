import 'package:flutter/material.dart';
import '../widgets/hero_section.dart';
import '../widgets/services_section.dart';
import '../widgets/booking_section.dart';
import '../widgets/testimonials_section.dart';
import '../widgets/footer_section.dart';

class HairvanaUserApp extends StatelessWidget {
  const HairvanaUserApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const SingleChildScrollView(
      child: Column(
        children: [
          HeroSection(),
          ServicesSection(),
          BookingSection(),
          TestimonialsSection(),
          FooterSection(),
        ],
      ),
    );
  }
}