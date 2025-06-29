import 'package:flutter/material.dart';
import '../widgets/hairvana_userapp.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: HairvanaUserApp(),
    );
  }
}