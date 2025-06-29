import 'package:flutter/material.dart';

class Service {
  final String title;
  final String description;
  final String price;
  final IconData icon;
  final String duration;

  Service({
    required this.title,
    required this.description,
    required this.price,
    required this.icon,
    required this.duration,
  });
}