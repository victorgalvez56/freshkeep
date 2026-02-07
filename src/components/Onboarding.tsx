import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
  ImageResizeMode,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from './StyledText';
import { useTheme } from '../hooks/useTheme';

const { width, height } = Dimensions.get('window');

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    id: '1',
    image: require('../../assets/images/onboarding-1.png'),
    title: 'Controla tu despensa',
    resizeMode: 'cover',
    width: width,
    description:
      'Registra tus alimentos, recibe alertas antes de que venzan y reduce el desperdicio.',
  },
  {
    id: '2',
    image: require('../../assets/images/onboarding-2.png'),
    title: 'Recetas con lo que tienes',
    resizeMode: 'contain',
    width: width * 0.75,
    description:
      'Genera recetas con IA usando los ingredientes disponibles en tu inventario.',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      onComplete();
    }
  };

  const renderSlide = ({ item }: { item: (typeof slides)[number] }) => (
    <View style={[styles.slide, { width }]}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={[styles.image, { width: item.width }]} resizeMode={item.resizeMode as ImageResizeMode} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  const isLastSlide = currentIndex === slides.length - 1;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Skip button */}
      {!isLastSlide && (
        <TouchableOpacity
          style={[styles.skipButton, { top: insets.top + 12 }]}
          onPress={onComplete}
          activeOpacity={0.7}
        >
          <Text style={[styles.skipText, { color: colors.textSecondary }]}>Saltar</Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {/* Bottom section: dots + button */}
      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 24 }]}>
        {/* Dots */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentIndex ? colors.primary : colors.border,
                },
              ]}
            />
          ))}
        </View>

        {/* Action button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: colors.primaryText }]}>
            {isLastSlide ? 'Comenzar' : 'Siguiente'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 0.55,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 32,
  },
  image: {
    width: width,
    height: height * 0.4,
  },
  textContainer: {
    flex: 0.25,
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
