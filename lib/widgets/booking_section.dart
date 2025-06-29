import 'package:flutter/material.dart';

class BookingSection extends StatefulWidget {
  const BookingSection({super.key});

  @override
  State<BookingSection> createState() => _BookingSectionState();
}

class _BookingSectionState extends State<BookingSection> {
  DateTime? selectedDate;
  String? selectedTime;
  String? selectedService;

  final List<String> timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  final List<String> services = [
    'Hair Cut & Styling',
    'Hair Coloring',
    'Hair Treatment',
    'Bridal Package'
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      margin: const EdgeInsets.all(24),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Book Your Appointment',
            style: theme.textTheme.displayMedium?.copyWith(
              fontSize: 24,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Choose your preferred date, time, and service',
            style: theme.textTheme.bodyLarge?.copyWith(
              color: theme.colorScheme.onSurface.withOpacity(0.7),
            ),
          ),
          const SizedBox(height: 32),

          // Service Selection
          Text(
            'Select Service',
            style: theme.textTheme.headlineMedium?.copyWith(
              fontSize: 16,
            ),
          ),
          const SizedBox(height: 12),
          DropdownButtonFormField<String>(
            value: selectedService,
            decoration: InputDecoration(
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
              ),
              hintText: 'Choose a service',
            ),
            items: services.map((service) {
              return DropdownMenuItem(
                value: service,
                child: Text(service),
              );
            }).toList(),
            onChanged: (value) {
              setState(() {
                selectedService = value;
              });
            },
          ),
          const SizedBox(height: 24),

          // Date Selection
          Text(
            'Select Date',
            style: theme.textTheme.headlineMedium?.copyWith(
              fontSize: 16,
            ),
          ),
          const SizedBox(height: 12),
          InkWell(
            onTap: () async {
              final date = await showDatePicker(
                context: context,
                initialDate: DateTime.now(),
                firstDate: DateTime.now(),
                lastDate: DateTime.now().add(const Duration(days: 30)),
              );
              if (date != null) {
                setState(() {
                  selectedDate = date;
                });
              }
            },
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                border: Border.all(
                  color: theme.colorScheme.outline,
                ),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                selectedDate != null
                    ? '${selectedDate!.day}/${selectedDate!.month}/${selectedDate!.year}'
                    : 'Choose a date',
                style: theme.textTheme.bodyLarge?.copyWith(
                  color: selectedDate != null
                      ? theme.colorScheme.onSurface
                      : theme.colorScheme.onSurface.withOpacity(0.6),
                ),
              ),
            ),
          ),
          const SizedBox(height: 24),

          // Time Selection
          Text(
            'Select Time',
            style: theme.textTheme.headlineMedium?.copyWith(
              fontSize: 16,
            ),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: timeSlots.map((time) {
              final isSelected = selectedTime == time;
              return InkWell(
                onTap: () {
                  setState(() {
                    selectedTime = time;
                  });
                },
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 8,
                  ),
                  decoration: BoxDecoration(
                    color: isSelected
                        ? theme.colorScheme.primary
                        : theme.colorScheme.surface,
                    border: Border.all(
                      color: isSelected
                          ? theme.colorScheme.primary
                          : theme.colorScheme.outline,
                    ),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    time,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: isSelected
                          ? theme.colorScheme.onPrimary
                          : theme.colorScheme.onSurface,
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
          const SizedBox(height: 32),

          // Book Button
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: selectedService != null &&
                      selectedDate != null &&
                      selectedTime != null
                  ? () {
                      _showBookingConfirmation(context);
                    }
                  : null,
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: const Text('Book Appointment'),
            ),
          ),
        ],
      ),
    );
  }

  void _showBookingConfirmation(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Booking Confirmed!'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Service: $selectedService'),
            Text('Date: ${selectedDate!.day}/${selectedDate!.month}/${selectedDate!.year}'),
            Text('Time: $selectedTime'),
            const SizedBox(height: 16),
            const Text('We\'ll send you a confirmation email shortly.'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              setState(() {
                selectedService = null;
                selectedDate = null;
                selectedTime = null;
              });
            },
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }
}