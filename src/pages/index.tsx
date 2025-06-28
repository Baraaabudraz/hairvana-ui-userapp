'use client';

import React, { useState, useRef, useEffect, useCallback, useTransition } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  Camera,
  Scissors,
  Palette,
  Heart,
  Star,
  MapPin,
  Calendar,
  User,
  MessageCircle,
  Send,
  ArrowLeft,
  Filter,
  Search,
  Clock,
  Wand2,
  Play,
  Share2,
  Download,
  RotateCcw,
  Zap,
  ChevronRight,
  X,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  LogIn,
  UserPlus,
  Bot,
  Lightbulb,
  TrendingUp,
  ChevronDown,
  Mic,
  ImageIcon,
  Award,
  Users,
  Check,
  BookOpen,
  Crown,
  Target,
  Vote,
  Smile,
  Phone,
  Wallet,
  CreditCard,
  Bitcoin,
  History,
  Settings,
} from 'lucide-react';
// Utility function for cn
function cnUtil(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Use the utility if cn is not available
const cnFallback = typeof cn !== 'undefined' ? cn : cnUtil;

// Hook for click outside
function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      const target = event.target;

      if (!el || !target || el.contains(target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(mouseEvent, listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener(mouseEvent, listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, mouseEvent]);
}

// Animated Text Cycle Component
interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

function AnimatedTextCycle({
  words,
  interval = 3000,
  className = "",
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState("auto");
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (measureRef.current) {
      const elements = measureRef.current.children;
      if (elements.length > currentIndex) {
        const newWidth = elements[currentIndex].getBoundingClientRect().width;
        setWidth(`${newWidth}px`);
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  const containerVariants = {
    hidden: {
      y: -20,
      opacity: 0,
      filter: "blur(8px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    },
  };

  return (
    <>
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={`font-bold ${className}`}>
            {word}
          </span>
        ))}
      </div>

      <motion.span
        className="relative inline-block"
        animate={{
          width,
          transition: {
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 1.2,
          }
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block font-bold ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ whiteSpace: "nowrap" }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}

// Morphing Popover Components
interface MorphingPopoverContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  uniqueId: string;
}

const MorphingPopoverContext = React.createContext<MorphingPopoverContextValue | null>(null);

function usePopoverLogic({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} = {}) {
  const uniqueId = React.useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isOpen = controlledOpen ?? uncontrolledOpen;

  const open = () => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(true);
    }
    onOpenChange?.(true);
  };

  const close = () => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(false);
    }
    onOpenChange?.(false);
  };

  return { isOpen, open, close, uniqueId };
}

interface MorphingPopoverProps {
  children: React.ReactNode;
  transition?: any;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MorphingPopover({
  children,
  transition = { type: 'spring', bounce: 0.1, duration: 0.4 },
  defaultOpen,
  open,
  onOpenChange,
  className,
}: MorphingPopoverProps) {
  const popoverLogic = usePopoverLogic({ defaultOpen, open, onOpenChange });

  return (
    <MorphingPopoverContext.Provider value={popoverLogic}>
      <div
        className={cnFallback('relative flex items-center justify-center', className)}
        key={popoverLogic.uniqueId}
      >
        {children}
      </div>
    </MorphingPopoverContext.Provider>
  );
}

interface MorphingPopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
}

function MorphingPopoverTrigger({
  children,
  className,
}: MorphingPopoverTriggerProps) {
  const context = React.useContext(MorphingPopoverContext);
  if (!context) {
    throw new Error('MorphingPopoverTrigger must be used within MorphingPopover');
  }

  return (
    <motion.div
      key={context.uniqueId}
      layoutId={`popover-trigger-${context.uniqueId}`}
      onClick={context.open}
    >
      <motion.button
        layoutId={`popover-label-${context.uniqueId}`}
        key={context.uniqueId}
        className={className}
        aria-expanded={context.isOpen}
        aria-controls={`popover-content-${context.uniqueId}`}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}

interface MorphingPopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

function MorphingPopoverContent({
  children,
  className,
}: MorphingPopoverContentProps) {
  const context = React.useContext(MorphingPopoverContext);
  if (!context) throw new Error('MorphingPopoverContent must be used within MorphingPopover');

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, context.close);

  useEffect(() => {
    if (!context.isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') context.close();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [context.isOpen, context.close]);

  return (
    <AnimatePresence>
      {context.isOpen && (
        <motion.div
          ref={ref}
          layoutId={`popover-trigger-${context.uniqueId}`}
          key={context.uniqueId}
          id={`popover-content-${context.uniqueId}`}
          role='dialog'
          aria-modal='true'
          className={cnFallback(
            'absolute overflow-hidden rounded-xl border border-border bg-background p-4 text-foreground shadow-2xl z-50',
            className
          )}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({
  minHeight,
  maxHeight,
}: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(
          textarea.scrollHeight,
          maxHeight ?? Number.POSITIVE_INFINITY
        )
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  return { textareaRef, adjustHeight };
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  showRing?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, showRing = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className={cnFallback("relative", containerClassName)}>
        <textarea
          className={cnFallback(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "transition-all duration-200 ease-in-out",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
            showRing ? "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" : "",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {showRing && isFocused && (
          <motion.span
            className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-purple-500/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

interface HairstyleCard {
  id: string;
  name: string;
  image: string;
  category: string;
  aiMatch: number;
  trending: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface StylistProfile {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  location: string;
  price: number;
  availability: string[];
}

interface Salon {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  address: string;
  distance: string;
  services: string[];
  priceRange: string;
  openHours: string;
  phone: string;
}

interface StyleSuggestion {
  icon: React.ReactNode;
  label: string;
  description: string;
  category: string;
}

interface HistoryItem {
  id: string;
  name: string;
  aiMatch: number;
  date: string;
  status: 'booked' | 'saved' | 'tried';
  image: string;
}

// Main Hairvana Component
export function HairvanaInterface() {
  const [appState, setAppState] = useState<'splash' | 'auth' | 'onboarding' | 'main'>('splash');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [activeView, setActiveView] = useState<'home' | 'gallery' | 'booking' | 'profile' | 'evaluation' | 'bookAppointment' | 'payment' | 'favorites' | 'salons' | 'paymentDetails' | 'history' | 'salonDetails' | 'styleDetails' | 'settings' | 'bookingHistory'>('home');
  const [selectedStyle, setSelectedStyle] = useState<HairstyleCard | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const [stylist, setStylist] = useState<StylistProfile | null>(null);
  const [selectedAppointmentStylist, setSelectedAppointmentStylist] = useState<StylistProfile | null>(null);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [selectedSalonForDetails, setSelectedSalonForDetails] = useState<Salon | null>(null);
  const [selectedStyleForDetails, setSelectedStyleForDetails] = useState<HairstyleCard | null>(null);
  const [bookingHistory, setBookingHistory] = useState([
    {
      id: "booking1",
      salon: "The Hair Lab",
      stylist: "Sarah Chen",
      style: "Curtain Bangs",
      date: "Dec 15, 2024",
      time: "2:00 PM",
      status: "upcoming",
      price: "$135.00"
    },
    {
      id: "booking2",
      salon: "Luxe Beauty Studio",
      stylist: "Marcus Rodriguez",
      style: "Beach Waves",
      date: "Nov 28, 2024",
      time: "10:00 AM",
      status: "completed",
      price: "$120.00"
    }
  ]);
  const [settings, setSettings] = useState({
    notifications: true,
    theme: 'light',
    language: 'English'
  });
  const [selectedAppointmentStyle, setSelectedAppointmentStyle] = useState<HairstyleCard | null>(null);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [likedStyles, setLikedStyles] = useState<Set<string>>(new Set());
  const [favoriteStyles, setFavoriteStyles] = useState<HairstyleCard[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('Today, Oct 26');
  const [selectedTime, setSelectedTime] = useState<string>('2:00 PM');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cash' | null>(null);
  const [paymentType, setPaymentType] = useState<'card' | 'crypto' | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [salonViewMode, setSalonViewMode] = useState<'list' | 'map'>('list');
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    {
      id: "hist1",
      name: "Medium Wavy Bob",
      aiMatch: 91,
      date: "June 16, 2025",
      status: "booked",
      image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=600&fit=crop"
    },
    {
      id: "hist2",
      name: "Classic Pixie Cut",
      aiMatch: 76,
      date: "May 30, 2025",
      status: "saved",
      image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6f6c?w=400&h=600&fit:crop"
    },
    {
      id: "hist3",
      name: "Curtain Bangs",
      aiMatch: 88,
      date: "May 20, 2025",
      status: "tried",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit:crop"
    },
  ]);

  const shouldReduceMotion = useReducedMotion();
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 50,
    maxHeight: 120,
  });

  const userProfile = {
    name: 'Sara M.',
    faceShape: 'Oval',
    preferences: ['Wavy', 'Long'],
  };

  const onboardingStepsData = [
    {
      icon: <Sparkles className="w-16 h-16 text-purple-500" />,
      title: "Welcome to Hairvana!",
      description: "Discover your perfect look and book with ease.",
    },
    {
      icon: <Calendar className="w-16 h-16 text-orange-500" />,
      title: "Book Instantly",
      description: "Find and book a matching salon nearby with available slots. Smooth and fast.",
    },
    {
      icon: <Heart className="w-16 h-16 text-red-500" />,
      title: "Save & Share Styles",
      description: "Save your favorite looks and keep track of your style journey.",
    },
    {
      icon: <History className="w-16 h-16 text-blue-500" />,
      title: "Track Your History",
      description: "Keep a record of your past bookings and tried styles.",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppState('onboarding'); // Changed to onboarding first
    }, 2000); // Simulate splash screen duration
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingNext = () => {
    if (onboardingStep < onboardingStepsData.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setAppState('auth'); // Changed to auth after onboarding
    }
  };

  const defaultHairstyles: HairstyleCard[] = [
    {
      id: '1',
      name: 'Curtain Bangs',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop',
      category: 'Bangs',
      aiMatch: 94,
      trending: true,
      difficulty: 'Medium'
    },
    {
      id: '2',
      name: 'Layered Bob',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=600&fit=crop',
      category: 'Bob',
      aiMatch: 89,
      trending: false,
      difficulty: 'Easy'
    },
    {
      id: '3',
      name: 'Beach Waves',
      image: 'https://images.unsplash.com/photo-1595475038665-8de2a4b72bb8?w=400&h=600&fit:crop',
      category: 'Waves',
      aiMatch: 92,
      trending: true,
      difficulty: 'Easy'
    },
    {
      id: '4',
      name: 'Pixie Cut',
      image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6f6c?w=400&h=600&fit:crop',
      category: 'Short',
      aiMatch: 87,
      trending: false,
      difficulty: 'Hard'
    }
  ];

  const defaultSalons: Salon[] = [
    {
      id: '1',
      name: 'The Hair Lab',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 120,
      address: '123 Madison Ave, New York, NY',
      distance: '0.3 miles',
      services: ['Cuts', 'Color', 'Styling', 'Treatments'],
      priceRange: '$-$',
      openHours: '9:00 AM - 8:00 PM',
      phone: '(555) 123-4567'
    },
    {
      id: '2',
      name: 'Luxe Beauty Studio',
      image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit:crop',
      rating: 4.9,
      reviewCount: 89,
      address: '456 5th Ave, New York, NY',
      distance: '0.5 miles',
      services: ['Premium Cuts', 'Balayage', 'Extensions'],
      priceRange: '$$-$$',
      openHours: '10:00 AM - 9:00 PM',
      phone: '(555) 987-6543'
    },
    {
      id: '3',
      name: 'Urban Cuts',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit:crop',
      rating: 4.6,
      reviewCount: 156,
      address: '789 Broadway, New York, NY',
      distance: '0.8 miles',
      services: ['Cuts', 'Beard Trim', 'Styling'],
      priceRange: '$-$',
      openHours: '8:00 AM - 7:00 PM',
      phone: '(555) 456-7890'
    },
    {
      id: '4',
      name: 'Blowout Bar NYC',
      image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400&h=300&fit:crop',
      rating: 4.7,
      reviewCount: 203,
      address: '321 Park Ave, New York, NY',
      distance: '1.2 miles',
      services: ['Blowouts', 'Styling', 'Updos'],
      priceRange: '$',
      openHours: '7:00 AM - 8:00 PM',
      phone: '(555) 234-5678'
    }
  ];

  const defaultStylists: StylistProfile[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 127,
      specialties: ['Color', 'Cuts', 'Styling'],
      location: 'Manhattan',
      price: 150,
      availability: ['Today 2:00 PM', 'Tomorrow 10:00 AM', 'Thu 3:30 PM']
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit:crop',
      rating: 4.8,
      reviewCount: 89,
      specialties: ['Cuts', 'Beard', 'Styling'],
      location: 'Brooklyn',
      price: 120,
      availability: ['Today 4:00 PM', 'Fri 11:00 AM', 'Sat 1:00 PM']
    }
  ];

  const styleSuggestions: StyleSuggestion[] = [
    {
      icon: <Scissors className="w-5 h-5" />,
      label: "Try a shorter cut",
      description: "Based on your face shape, a bob would be perfect",
      category: "cut"
    },
    {
      icon: <Palette className="w-5 h-5" />,
      label: "Add some highlights",
      description: "Caramel highlights would complement your skin tone",
      category: "color"
    },
    {
      icon: <Wand2 className="w-5 h-5" />,
      label: "Curtain bangs",
      description: "Trending style that would frame your face beautifully",
      category: "style"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: "Beach waves",
      description: "Effortless texture that's perfect for your hair type",
      category: "texture"
    }
  ];

  const handleStyleLike = (styleId: string) => {
    setLikedStyles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(styleId)) {
        newSet.delete(styleId);
      } else {
        newSet.add(styleId);
      }
      return newSet;
    });
  };

  const handleAddToFavorites = (style: HairstyleCard) => {
    setFavoriteStyles(prev => {
      const exists = prev.find(s => s.id === style.id);
      if (exists) {
        return prev.filter(s => s.id !== style.id);
      } else {
        return [...prev, style];
      }
    });
  };

  const isStyleFavorited = (styleId: string) => {
    return favoriteStyles.some(style => style.id === styleId);
  };

  const filteredStyles = defaultHairstyles.filter(style =>
    style.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedFilters.length === 0 || selectedFilters.includes(style.category))
  );

  const renderSalonFinderView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* View Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Find Salons</h2>
        <div className="flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSalonViewMode('list')}
            className={cnFallback(
              "flex-1 px-3 py-1 rounded-md text-sm font-medium transition-colors",
              salonViewMode === 'list'
                ? "bg-white text-purple-600 shadow-sm"
                : "text-gray-600"
            )}
          >
            List View
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSalonViewMode('map')}
            className={cnFallback(
              "flex-1 px-3 py-1 rounded-md text-sm font-medium transition-colors",
              salonViewMode === 'map'
                ? "bg-white text-purple-600 shadow-sm"
                : "text-gray-600"
            )}
          >
            Map View
          </motion.button>
        </div>
      </div>

      {/* Map View */}
      {salonViewMode === 'map' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-200 rounded-xl h-64 flex items-center justify-center relative overflow-hidden"
        >
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"></div>
          <div className="relative z-10 text-center space-y-2">
            <MapPin className="w-8 h-8 text-purple-600 mx-auto" />
            <p className="text-gray-600 font-medium">Interactive Map View</p>
            <p className="text-sm text-gray-500">Showing {defaultSalons.length} salons nearby</p>
          </div>

          {/* Simulated Map Pins */}
          <div className="absolute top-16 left-12 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
            1
          </div>
          <div className="absolute top-24 right-16 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce" style={{ animationDelay: '0.2s' }}>
            2
          </div>
          <div className="absolute bottom-20 left-20 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce" style={{ animationDelay: '0.4s' }}>
            3
          </div>
          <div className="absolute bottom-16 right-12 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce" style={{ animationDelay: '0.6s' }}>
            4
          </div>
        </motion.div>
      )}

      {/* Salon List */}
      <div className="space-y-4">
        {defaultSalons.map((salon, index) => (
          <motion.div
            key={salon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={salon.image}
                alt={salon.name}
                className="w-full h-32 sm:w-20 sm:h-20 rounded-lg object-cover"
              />
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{salon.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{salon.distance}</span>
                      <span className="text-gray-400">•</span>
                      <span>{salon.priceRange}</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{salon.rating}</span>
                    </div>
                    <div className="text-sm text-gray-500">{salon.reviewCount} reviews</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {salon.services.slice(0, 3).map((service) => (
                    <span
                      key={service}
                      className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                  {salon.services.length > 3 && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      +{salon.services.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  <div className="text-sm text-gray-600">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {salon.openHours}
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                        setSelectedSalonForDetails(salon);
                        setActiveView('salonDetails');
                      }}
                      className="flex-1 sm:flex-none text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-lg font-medium"
                    >
                      View Services
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedSalon(salon);
                        setSelectedAppointmentStylist(defaultStylists[0]); // Default stylist for this salon
                        setSelectedAppointmentStyle(selectedStyle || defaultHairstyles[0]); // Current AR style or default
                        setActiveView('bookAppointment');
                      }}
                      className="flex-1 sm:flex-none text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg font-medium"
                    >
                      Book
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Filters */}
      <div className="space-y-3">
        <h3 className="font-semibold">Quick Filters</h3>
        <div className="flex flex-wrap gap-2">
          {['Nearby', 'Highly Rated', 'Open Now', 'Budget Friendly', 'Luxury'].map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-sm bg-purple-100 text-purple-700 px-3 py-2 rounded-full font-medium"
              onClick={() => setActiveView('salons')} // Example: Apply filter and refresh list
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>

    
    </motion.div>
  );

  const handleBookStylist = (stylist: StylistProfile) => {
    setStylist(stylist);
    setSelectedAppointmentStylist(stylist);
    setSelectedSalon(defaultSalons[0]); // Default to first salon for booking
    setSelectedAppointmentStyle(selectedStyle || defaultHairstyles[0]); // Use current AR style or default
    setActiveView('bookAppointment');
  };

  const handleConfirmBooking = () => {
    setActiveView('payment');
  };

  const handlePaymentConfirmation = () => {
    setShowBookingConfirmation(true);
    setTimeout(() => {
      setShowBookingConfirmation(false);
      setActiveView('home');
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  // Splash Screen
  const renderSplash = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-500 to-pink-500 text-white"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 200 }}
      >
        <Sparkles className="w-24 h-24 mb-4" />
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-5xl font-bold"
      >
        Hairvana
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-lg mt-2 opacity-80"
      >
        Your Personal Style Coach
      </motion.p>
    </motion.div>
  );

  // Auth Screen
  const renderAuth = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full bg-white p-6 text-foreground"
    >
      <h2 className="text-4xl font-bold mb-8 text-center">
        {authMode === 'login' ? 'Welcome Back!' : 'Join Hairvana'}
      </h2>
      <div className="w-full max-w-sm space-y-6">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-lg bg-input border border-border placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {authMode === 'signup' && (
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-input border border-border placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground"
            />
          </div>
        )}
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setAppState('main')}
        className="w-full max-w-sm mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium shadow-lg"
      >
        {authMode === 'login' ? (
          <>
            <LogIn className="w-5 h-5" /> Log In
          </>
        ) : (
          <>
            <UserPlus className="w-5 h-5" /> Sign Up
          </>
        )}
      </motion.button>
      <button
        onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        className="mt-4 text-sm text-muted-foreground hover:underline"
      >
        {authMode === 'login' ? 'Don\'t have an account? Sign Up' : 'Already have an account? Log In'}
      </button>
    </motion.div>
  );

  // Onboarding Screen
  const renderOnboarding = () => {
    const currentStep = onboardingStepsData[onboardingStep];
    const isLastStep = onboardingStepsData.length - 1 === onboardingStep;

    return (
      <motion.div
        key={onboardingStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-between h-full p-6 text-center bg-white"
      >
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          {currentStep.icon}
          <h2 className="text-3xl font-bold text-gray-900">{currentStep.title}</h2>
          <p className="text-lg text-gray-600 max-w-xs">{currentStep.description}</p>
        </div>

        <div className="w-full space-y-4">
          <div className="flex justify-center gap-2 mb-4">
            {onboardingStepsData.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setOnboardingStep(index)} // Allow clicking circles to navigate
                className={cnFallback(
                  "h-2 rounded-full transition-all duration-300",
                  index === onboardingStep ? "w-8 bg-purple-500" : "w-2 bg-gray-300"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOnboardingNext} // Use existing next handler
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl text-lg font-semibold shadow-lg"
          >
            {isLastStep ? "Start Exploring →" : "Next →"}
          </motion.button>
          {!isLastStep && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setAppState('auth')}
              className="w-full text-purple-600 py-2 rounded-xl text-md font-medium"
            >
              Skip
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  };

  // Render based on app state
  if (appState === 'splash') {
    return (
      <div className="h-screen w-full">
        {renderSplash()}
      </div>
    );
  }

  if (appState === 'onboarding') {
    return (
      <div className="h-screen w-full">
        {renderOnboarding()}
      </div>
    );
  }

  if (appState === 'auth') {
    return (
      <div className="h-screen w-full">
        {renderAuth()}
      </div>
    );
  }

  // Home Screen
  const renderHome = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-20"
    >
            {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Hello, <AnimatedTextCycle words={[userProfile.name, "Beautiful!", "Gorgeous!"]} className="text-purple-600" />
        </h1>
        <p className="text-gray-600">Ready to discover your perfect look?</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveView('salons')}
          className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl text-white text-left"
        >
          <MapPin className="w-8 h-8 mb-3" />
          <h3 className="font-semibold text-lg">Find Salons</h3>
          <p className="text-purple-100 text-sm">Book your next appointment</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveView('gallery')}
          className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 rounded-2xl text-white text-left"
        >
          <ImageIcon className="w-8 h-8 mb-3" />
          <h3 className="font-semibold text-lg">Explore Styles</h3>
          <p className="text-blue-100 text-sm">Discover new looks</p>
        </motion.button>
      </div>

      {/* AI Suggestions (Re-purposed for general suggestions) */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Suggestions for You</h2>
        <div className="space-y-3">
                    {styleSuggestions.slice(0, 3).map((suggestion, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
                            onClick={() => {
                // Navigate to gallery with specific filter based on suggestion
                if (suggestion.category === 'cut') {
                  setSelectedFilters(['Short', 'Bob']); // Filter for shorter cuts
                  setActiveView('gallery');
                } else if (suggestion.category === 'color') {
                  setSelectedFilters(['Color']); // Filter for color styles
                  setActiveView('gallery');
                } else if (suggestion.category === 'style') {
                  setSelectedFilters(['Bangs']); // Filter for bangs/styling
                  setActiveView('gallery');
                } else if (suggestion.category === 'texture') {
                  setSelectedFilters(['Waves']); // Filter for texture styles
                  setActiveView('gallery');
                } else {
                  setActiveView('gallery');
                }
              }}
              className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 text-left"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                {suggestion.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{suggestion.label}</h3>
                <p className="text-sm text-gray-600">{suggestion.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Trending Styles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Trending Now</h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveView('gallery')}
            className="text-purple-600 font-medium"
          >
            See All
          </motion.button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {defaultHairstyles.filter(style => style.trending).map((style) => (
            <motion.div
              key={style.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedStyleForDetails(style);
                setActiveView('styleDetails');
              }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="relative">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium">{style.aiMatch}%</span>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm">{style.name}</h3>
                <p className="text-xs text-gray-600">{style.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Explore/Gallery Screen
  const renderGallery = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-20"
    >
            {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <MorphingPopover>
            <MorphingPopoverTrigger className="p-2 bg-gray-100 rounded-lg">
              <Filter className="w-5 h-5" />
            </MorphingPopoverTrigger>
                        <MorphingPopoverContent className="w-64 top-12 left-0 z-50">
              <div className="space-y-3">
                <h3 className="font-semibold">Filter by Category</h3>
                {['Bangs', 'Bob', 'Waves', 'Short', 'Long'].map((category) => (
                  <label key={category} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFilters([...selectedFilters, category]);
                        } else {
                          setSelectedFilters(selectedFilters.filter(f => f !== category));
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </MorphingPopoverContent>
          </MorphingPopover>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveView('favorites')}
            className="p-2 bg-gray-100 rounded-lg"
          >
            <Heart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search hairstyles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-purple-500 outline-none"
        />
      </div>

      {/* Style Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-4"
      >
        {filteredStyles.map((style, index) => (
          <motion.div
            key={style.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
          >
            <div className="relative">
              <img
                src={style.image}
                alt={style.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span className="text-xs font-medium">{style.aiMatch}%</span>
                </div>
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                {style.trending && (
                  <div className="bg-orange-500 text-white px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToFavorites(style); // Changed to handleAddToFavorites
                  }}
                  className={cnFallback(
                    "p-1 rounded-full",
                    isStyleFavorited(style.id) ? "bg-red-500 text-white" : "bg-white/90 text-gray-600"
                  )}
                >
                  <Heart className="w-3 h-3" />
                </motion.button>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-medium">{style.name}</h3>
              <p className="text-sm text-gray-600">{style.category}</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 gap-2 sm:gap-0">
                <span className={cnFallback(
                  "text-xs px-2 py-1 rounded-full",
                  style.difficulty === 'Easy' ? "bg-green-100 text-green-700" :
                  style.difficulty === 'Medium' ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                )}>
                  {style.difficulty}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedStyleForDetails(style);
                    setActiveView('styleDetails');
                  }}
                  className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full font-medium"
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );

  // Profile Screen
  const renderProfile = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-20"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center">
          <User className="w-12 h-12 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{userProfile.name}</h1>
          <p className="text-gray-600">Face Shape: {userProfile.faceShape}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl text-center shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-purple-600">{favoriteStyles.length}</div>
          <div className="text-sm text-gray-600">Favorites</div>
        </div>
        <div className="bg-white p-4 rounded-xl text-center shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-pink-600">{historyItems.length}</div>
          <div className="text-sm text-gray-600">Tried</div>
        </div>
        <div className="bg-white p-4 rounded-xl text-center shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-blue-600">{bookingHistory.length}</div>
          <div className="text-sm text-gray-600">Bookings</div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-3">
        {[
          { icon: <Heart className="w-5 h-5" />, label: "Favorites", action: () => setActiveView('favorites') },
          { icon: <History className="w-5 h-5" />, label: "History", action: () => setActiveView('history') },
          { icon: <Calendar className="w-5 h-5" />, label: "Bookings", action: () => setActiveView('bookingHistory') },
          { icon: <MapPin className="w-5 h-5" />, label: "Find Salons", action: () => setActiveView('salons') },
          { icon: <Settings className="w-5 h-5" />, label: "Settings", action: () => setActiveView('settings') },
        ].map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={item.action}
            className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              {item.icon}
            </div>
            <span className="flex-1 text-left font-medium">{item.label}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </motion.button>
        ))}
      </div>

      {/* Preferences */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold mb-3">Style Preferences</h3>
        <div className="flex flex-wrap gap-2">
          {userProfile.preferences.map((pref) => (
            <span
              key={pref}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
            >
              {pref}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Favorites Screen
  const renderFavorites = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-20"
    >
      

      {favoriteStyles.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No favorite styles yet. Start exploring!</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveView('gallery')}
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-full"
          >
            Explore Styles
          </motion.button>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-4"
        >
          {favoriteStyles.map((style, index) => (
            <motion.div
              key={style.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="relative">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavorites(style); // Toggle favorite status
                    }}
                    className={cnFallback(
                      "p-1 rounded-full",
                      isStyleFavorited(style.id) ? "bg-red-500 text-white" : "bg-white/90 text-gray-600"
                    )}
                  >
                    <Heart className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium">{style.name}</h3>
                <p className="text-sm text-gray-600">{style.category}</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 gap-2 sm:gap-0">
                  <span className={cnFallback(
                    "text-xs px-2 py-1 rounded-full",
                    style.difficulty === 'Easy' ? "bg-green-100 text-green-700" :
                    style.difficulty === 'Medium' ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  )}>
                    {style.difficulty}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedStyleForDetails(style);
                      setActiveView('styleDetails');
                    }}
                    className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full font-medium"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );

  // History Screen
  const renderHistory = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-20"
    >
      

      {historyItems.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <History className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No history yet. Start your style journey!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {historyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 sm:w-20 sm:h-20 rounded-lg object-cover"
              />
              <div className="flex-1 w-full">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.date}</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 gap-2 sm:gap-0">
                  <span className={cnFallback(
                    "text-xs px-2 py-1 rounded-full",
                    item.status === 'booked' ? "bg-blue-100 text-blue-700" :
                    item.status === 'saved' ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"
                  )}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Find the style in defaultHairstyles to pass to details
                      const style = defaultHairstyles.find(s => s.name === item.name);
                      if (style) {
                        setSelectedStyleForDetails(style);
                        setActiveView('styleDetails');
                      }
                    }}
                    className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full font-medium"
                  >
                    View Style
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );

  // Booking History Screen
  const renderBookingHistory = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-20"
    >
      

      {bookingHistory.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No bookings yet. Book your first appointment!</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveView('salons')}
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-full"
          >
            Find Salons
          </motion.button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookingHistory.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{booking.salon}</h3>
                <span className={cnFallback(
                  "text-xs px-2 py-1 rounded-full",
                  booking.status === 'upcoming' ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                )}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600">Stylist: {booking.stylist}</p>
              <p className="text-sm text-gray-600">Style: {booking.style}</p>
              <p className="text-sm text-gray-600">Date: {booking.date} at {booking.time}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="font-bold text-purple-600">{booking.price}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Example: navigate to salon details or re-book
                    const salon = defaultSalons.find(s => s.name === booking.salon);
                    if (salon) {
                      setSelectedSalonForDetails(salon);
                      setActiveView('salonDetails');
                    }
                  }}
                  className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full font-medium"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );

  // Salon Details Screen
  const renderSalonDetails = () => {
    if (!selectedSalonForDetails) {
      return (
        <div className="text-center text-gray-500 py-10">
          <p>No salon selected.</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveView('salons')}
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-full"
          >
            Back to Salons
          </motion.button>
        </div>
      );
    }

    const salon = selectedSalonForDetails;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 pb-20"
      >


        <img
          src={salon.image}
          alt={salon.name}
          className="w-full h-48 object-cover rounded-xl shadow-md"
        />

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-medium text-lg">{salon.rating}</span>
              <span className="text-sm text-gray-500">({salon.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{salon.distance}</span>
            </div>
          </div>
          <p className="text-gray-700">{salon.address}</p>
          <p className="text-gray-700 flex items-center gap-2">
            <Clock className="w-4 h-4" /> {salon.openHours}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <Phone className="w-4 h-4" /> {salon.phone}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold">Services Offered</h2>
          <div className="flex flex-wrap gap-2">
            {salon.services.map((service) => (
              <span
                key={service}
                className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

                <div className="space-y-3">
          <h2 className="text-xl font-bold">Stylists</h2>
          <div className="grid grid-cols-2 gap-4">
            {defaultStylists.map((stylist) => (
              <motion.div
                key={stylist.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-center"
              >
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-2"
                />
                <h3 className="font-medium">{stylist.name}</h3>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{stylist.rating} ({stylist.reviewCount})</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedSalon(salon);
                    setSelectedAppointmentStylist(stylist);
                    setSelectedAppointmentStyle(selectedStyle || defaultHairstyles[0]);
                    setActiveView('bookAppointment');
                  }}
                  className="mt-3 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium"
                >
                  Book Stylist
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call and Book Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(`tel:${salon.phone}`, '_self')}
            className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-medium"
          >
            <Phone className="w-5 h-5" />
            Call Salon
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedSalon(salon);
              setSelectedAppointmentStylist(defaultStylists[0]);
              setSelectedAppointmentStyle(selectedStyle || defaultHairstyles[0]);
              setActiveView('bookAppointment');
            }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium"
          >
            <Calendar className="w-5 h-5" />
            Book Now
          </motion.button>
        </div>
      </motion.div>
    );
  };

  // Style Details Screen
  const renderStyleDetails = () => {
    if (!selectedStyleForDetails) {
      return (
        <div className="text-center text-gray-500 py-10">
          <p>No style selected.</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveView('gallery')}
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-full"
          >
            Back to Gallery
          </motion.button>
        </div>
      );
    }

    const style = selectedStyleForDetails;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 pb-20"
      >


        <div className="relative">
          <img
            src={style.image}
            alt={style.name}
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">{style.aiMatch}% Match</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleAddToFavorites(style)}
              className={cnFallback(
                "p-2 rounded-full",
                isStyleFavorited(style.id) ? "bg-red-500 text-white" : "bg-white/90 text-gray-600"
              )}
            >
              <Heart className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-3">
          <p className="text-gray-700">Category: <span className="font-medium">{style.category}</span></p>
          <p className="text-gray-700">Difficulty: <span className={cnFallback(
            "font-medium",
            style.difficulty === 'Easy' ? "text-green-600" :
            style.difficulty === 'Medium' ? "text-yellow-600" :
            "text-red-600"
          )}>{style.difficulty}</span></p>
          {style.trending && (
            <p className="text-gray-700 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" /> <span className="font-medium">Currently Trending!</span>
            </p>
          )}
          <p className="text-gray-700">
            This {style.name} is a versatile and popular choice. It's known for its {style.difficulty.toLowerCase()} maintenance and ability to suit various face shapes.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold">Book this Style</h2>
          <p className="text-gray-600">Find salons and stylists who can achieve this look for you.</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedAppointmentStyle(style);
              setActiveView('salons');
            }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" /> Book Appointment
          </motion.button>
        </div>
      </motion.div>
    );
  };

  // Book Appointment Screen
  const renderBookAppointment = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-20"
    >
      

      {selectedSalon && (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-2">
          <h2 className="font-bold text-lg">Salon: {selectedSalon.name}</h2>
          <p className="text-sm text-gray-600">{selectedSalon.address}</p>
        </div>
      )}

      {selectedAppointmentStylist && (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-2">
          <h2 className="font-bold text-lg">Stylist: {selectedAppointmentStylist.name}</h2>
          <p className="text-sm text-gray-600">Specialties: {selectedAppointmentStylist.specialties.join(', ')}</p>
        </div>
      )}

      {selectedAppointmentStyle && (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-2">
          <h2 className="font-bold text-lg">Style: {selectedAppointmentStyle.name}</h2>
          <p className="text-sm text-gray-600">Category: {selectedAppointmentStyle.category}</p>
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-xl font-bold">Select Date & Time</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['Today, Oct 26', 'Tomorrow, Oct 27', 'Mon, Oct 28', 'Tue, Oct 29'].map(date => (
            <motion.button
              key={date}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedDate(date)}
              className={cnFallback(
                "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium",
                selectedDate === date ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"
              )}
            >
              {date}
            </motion.button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'].map(time => (
            <motion.button
              key={time}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTime(time)}
              className={cnFallback(
                "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium",
                selectedTime === time ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"
              )}
            >
              {time}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleConfirmBooking}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium"
      >
        Proceed to Payment
      </motion.button>
    </motion.div>
  );

  // Payment Screen
  const renderPayment = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-20"
    >
      

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-2">
        <h2 className="font-bold text-lg">Booking Summary</h2>
        <p className="text-sm text-gray-600">Salon: {selectedSalon?.name}</p>
        <p className="text-sm text-gray-600">Stylist: {selectedAppointmentStylist?.name}</p>
        <p className="text-sm text-gray-600">Style: {selectedAppointmentStyle?.name}</p>
        <p className="text-sm text-gray-600">Date: {selectedDate} at {selectedTime}</p>
        <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2">
          <span className="font-bold">Total:</span>
          <span className="font-bold text-purple-600">${selectedAppointmentStylist?.price.toFixed(2) || 'N/A'}</span>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold">Payment Method</h2>
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPaymentMethod('online')}
            className={cnFallback(
              "p-4 rounded-xl border-2 flex flex-col items-center gap-2",
              paymentMethod === 'online' ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"
            )}
          >
            <Wallet className="w-6 h-6 text-purple-600" />
            <span className="font-medium text-sm">Pay Online</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPaymentMethod('cash')}
            className={cnFallback(
              "p-4 rounded-xl border-2 flex flex-col items-center gap-2",
              paymentMethod === 'cash' ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"
            )}
          >
            <CheckCircle className="w-6 h-6 text-purple-600" />
            <span className="font-medium text-sm">Pay at Salon</span>
          </motion.button>
        </div>
      </div>

      {paymentMethod === 'online' && (
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Online Payment Type</h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPaymentType('card')}
              className={cnFallback(
                "p-4 rounded-xl border-2 flex flex-col items-center gap-2",
                paymentType === 'card' ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"
              )}
            >
              <CreditCard className="w-6 h-6 text-purple-600" />
              <span className="font-medium text-sm">Credit/Debit Card</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPaymentType('crypto')}
              className={cnFallback(
                "p-4 rounded-xl border-2 flex flex-col items-center gap-2",
                paymentType === 'crypto' ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"
              )}
            >
              <Bitcoin className="w-6 h-6 text-purple-600" />
              <span className="font-medium text-sm">Crypto</span>
            </motion.button>
          </div>

          {paymentType === 'card' && (
            <div className="space-y-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="XXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saveCard"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-900">Save card for future payments</label>
              </div>
            </div>
          )}
          {paymentType === 'crypto' && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center space-y-2">
              <Bitcoin className="w-12 h-12 mx-auto text-purple-600" />
              <p className="font-medium">Crypto Payment Gateway</p>
              <p className="text-sm text-gray-600">You will be redirected to complete your payment.</p>
            </div>
          )}
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePaymentConfirmation}
        disabled={!paymentMethod || (paymentMethod === 'online' && !paymentType)}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirm Booking
      </motion.button>

      {showBookingConfirmation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white p-8 rounded-xl shadow-2xl text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
            <p className="text-gray-600">Your appointment at {selectedSalon?.name} is confirmed for {selectedDate} at {selectedTime}.</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowBookingConfirmation(false)}
              className="bg-purple-500 text-white px-4 py-2 rounded-full"
            >
              Done
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  // Settings Screen
  const renderSettings = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-20"
    >
      

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Notifications</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium">Theme</span>
          <select
            value={settings.theme}
            onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
            className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium">Language</span>
          <select
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm"
          >
                        <option value="English">English</option>
            <option value="Arabic">Arabic</option>
          </select>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setAppState('auth')} // Example: Logout
        className="w-full bg-red-500 text-white py-3 rounded-xl font-medium"
      >
        Log Out
      </motion.button>
    </motion.div>
  );

  // Bottom Navigation
  const renderBottomNav = () => (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 z-40 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {[
          { icon: <Sparkles className="w-5 h-5" />, label: "Home", view: "home" },
                    { icon: <Search className="w-5 h-5" />, label: "Explore", view: "gallery", clearFilters: true },
          { icon: <MapPin className="w-5 h-5" />, label: "Salons", view: "salons" },
          { icon: <User className="w-5 h-5" />, label: "Profile", view: "profile" },
        ].map((tab) => (
          <motion.button
            key={tab.view}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
                        onClick={() => {
              if (tab.clearFilters) {
                setSelectedFilters([]);
                setSearchQuery('');
              }
              setActiveView(tab.view as any);
            }}
            className={cnFallback(
              "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors",
              activeView === tab.view
                ? "text-purple-600 bg-purple-50"
                : "text-gray-600"
            )}
          >
            {tab.icon}
            <span className="text-xs font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );

    // App Bar Component
  const renderAppBar = () => {
    const getTitle = () => {
      switch (activeView) {
        case 'home': return 'Hairvana';
        case 'gallery': return 'Explore Styles';
        case 'salons': return 'Find Salons';
        case 'profile': return 'Profile';
        case 'favorites': return 'My Favorites';
        case 'history': return 'Style History';
        case 'bookingHistory': return 'My Bookings';
        case 'salonDetails': return selectedSalonForDetails?.name || 'Salon Details';
        case 'styleDetails': return selectedStyleForDetails?.name || 'Style Details';
        case 'bookAppointment': return 'Book Appointment';
        case 'payment': return 'Payment';
        case 'settings': return 'Settings';
        default: return 'Hairvana';
      }
    };

    const showBackButton = !['home', 'gallery', 'salons', 'profile'].includes(activeView);

    return (
            <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 flex items-center gap-3 z-40 max-w-md mx-auto">
        {showBackButton && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Navigate back based on current view
              if (activeView === 'favorites' || activeView === 'history' || activeView === 'bookingHistory' || activeView === 'settings') {
                setActiveView('profile');
              } else if (activeView === 'salonDetails') {
                setActiveView('salons');
              } else if (activeView === 'styleDetails') {
                setActiveView('gallery');
              } else if (activeView === 'bookAppointment') {
                setActiveView('salons');
              } else if (activeView === 'payment') {
                setActiveView('bookAppointment');
              } else {
                setActiveView('home');
              }
            }}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
        )}
                <div className="flex items-center gap-2 flex-1">
          <Sparkles className="w-6 h-6" />
          <h1 className="text-xl font-bold truncate">{getTitle()}</h1>
        </div>
        {activeView === 'home' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('profile')}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
          >
            <User className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    );
  };

    // Main app content
  return (
    <div className="h-screen w-full bg-gray-50 overflow-hidden max-w-md mx-auto">
      {renderAppBar()}
      <div className="h-full overflow-y-auto pt-16 pb-20">
        <div className="p-4 sm:p-6">
          {activeView === 'home' && renderHome()}
          {activeView === 'gallery' && renderGallery()}
          {activeView === 'profile' && renderProfile()}
          {activeView === 'salons' && renderSalonFinderView()}
          {activeView === 'favorites' && renderFavorites()}
          {activeView === 'history' && renderHistory()}
          {activeView === 'bookingHistory' && renderBookingHistory()}
          {activeView === 'salonDetails' && renderSalonDetails()}
          {activeView === 'styleDetails' && renderStyleDetails()}
          {activeView === 'bookAppointment' && renderBookAppointment()}
          {activeView === 'payment' && renderPayment()}
          {activeView === 'settings' && renderSettings()}
        </div>
      </div>

      {activeView !== 'bookAppointment' && activeView !== 'payment' && renderBottomNav()}
    </div>
  );
}

export default HairvanaInterface;
