import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  Animated 
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [scrollY] = useState(new Animated.Value(0));

  // Animation values for the floating orbs
  const floatAnim1 = new Animated.Value(0);
  const floatAnim2 = new Animated.Value(0);
  const floatAnim3 = new Animated.Value(0);

  useEffect(() => {
    // Create floating animations
    const startFloatingAnimation = () => {
      Animated.parallel([
        Animated.loop(
          Animated.sequence([
            Animated.timing(floatAnim1, {
              toValue: 1,
              duration: 4000,
              useNativeDriver: true,
            }),
            Animated.timing(floatAnim1, {
              toValue: 0,
              duration: 4000,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(floatAnim2, {
              toValue: 1,
              duration: 5000,
              useNativeDriver: true,
            }),
            Animated.timing(floatAnim2, {
              toValue: 0,
              duration: 5000,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(floatAnim3, {
              toValue: 1,
              duration: 6000,
              useNativeDriver: true,
            }),
            Animated.timing(floatAnim3, {
              toValue: 0,
              duration: 6000,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    };

    startFloatingAnimation();
  }, []);

  const features = [
    {
      title: "AI Resume Tailoring",
      description: "Get personalized resume optimization using advanced AI to match your profile with dream opportunities",
      backgroundColor: '#059669'
    },
    {
      title: "Mentor Connect",
      description: "Connect with industry experts who can guide your career journey and provide valuable insights",
      backgroundColor: '#10b981'
    },
    {
      title: "1:1 Mentoring Sessions",
      description: "Schedule private mentoring sessions to discuss your career goals and challenges",
      backgroundColor: '#34d399'
    },
    {
      title: "Anonymous Forums",
      description: "Engage in open discussions about career challenges and opportunities with privacy",
      backgroundColor: '#059669'
    },
    {
      title: "Smart Dashboards",
      description: "Specialized dashboards for mentors, employers, admins, and investors to manage their experience",
      backgroundColor: '#10b981'
    },
    {
      title: "Mentor Chat",
      description: "Real-time messaging system to stay connected with your mentors",
      backgroundColor: '#34d399'
    },
    {
      title: "Startup Showcase",
      description: "Platform for startups to present their ideas and connect with potential investors",
      backgroundColor: '#059669'
    },
    {
      title: "Startup Investment",
      description: "Investment opportunities for backing promising startups and innovations",
      backgroundColor: '#10b981'
    },
    {
      title: "Team Building",
      description: "Find the perfect teammates for your startup through our matching system",
      backgroundColor: '#34d399'
    }
  ];

  const FeatureCard = ({ title, description, backgroundColor }) => (
    <TouchableOpacity 
      style={[styles.card, { transform: [{ scale: 1 }] }]}
      onPress={() => navigation.navigate('Feature', { title })}
      activeOpacity={0.9}
    >
      <View style={[styles.iconContainer, { backgroundColor }]}>
        <Text style={styles.iconText}>{title[0]}</Text>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Animated Background Orbs */}
      <Animated.View style={[styles.orb1, {
        transform: [{
          translateY: floatAnim1.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 20]
          })
        }]
      }]} />
      <Animated.View style={[styles.orb2, {
        transform: [{
          translateY: floatAnim2.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -20]
          })
        }]
      }]} />
      <Animated.View style={[styles.orb3, {
        transform: [{
          translateY: floatAnim3.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 15]
          })
        }]
      }]} />

      <ScrollView 
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Elevate Your Career Path</Text>
          <Text style={styles.heroSubtitle}>
            Connect with mentors, find opportunities, and build your future with AI-powered career guidance
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Jobs')}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Mentor')}
            >
              <Text style={styles.secondaryButtonText}>Find a Mentor</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Our Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Transform Your Career?</Text>
          <Text style={styles.ctaSubtitle}>
            Join our community of mentors, startups, and professionals shaping the future
          </Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.buttonText}>Join Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  orb1: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 100,
    top: -40,
    left: -40,
    opacity: 0.6,
    filter : 'blur(50px)'
  },
  orb2: {
    position: 'absolute',
    width: 250,
    height: 250,
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    borderRadius: 125,
    top: height / 4,
    right: -50,
    opacity: 0.6,
    filter : 'blur(50px)'
  },
  orb3: {
    position: 'absolute',
    width: 180,
    height: 180,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 90,
    bottom: 40,
    left: width / 3,
    opacity: 0.6,
    filter : 'blur(50px)'
  },
  hero: {
    padding: 20,
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#059669',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresGrid: {
    gap: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#9ca3af',
    lineHeight: 24,
  },
  ctaSection: {
    margin: 20,
    padding: 24,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 16,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  ctaButton: {
    backgroundColor: '#059669',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
});

export default Home;