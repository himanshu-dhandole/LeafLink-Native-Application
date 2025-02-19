import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList
} from 'react-native';

const { width } = Dimensions.get('window');

const StarRating = ({ rating }) => (
  <View style={styles.ratingContainer}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Text key={star} style={[
        styles.star,
        { color: star <= Math.round(rating) ? '#facc15' : '#4b5563' }
      ]}>
        ★
      </Text>
    ))}
    <Text style={styles.ratingText}>{rating.toFixed(1)} / 5</Text>
  </View>
);

const MentorCard = ({ mentor, navigation }) => (
  <TouchableOpacity 
    style={styles.card}
    onPress={() => navigation.navigate('MentorProfile', { mentorId: mentor.id })}
  >
    <Text style={styles.mentorName}>{mentor.name}</Text>
    <Text style={styles.mentorBio} numberOfLines={3}>{mentor.bio}</Text>

    <View style={styles.skillsContainer}>
      {mentor.expertise.map((skill, index) => (
        <View key={index} style={styles.skillBadge}>
          <Text style={styles.skillText}>{skill}</Text>
        </View>
      ))}
    </View>

    <StarRating rating={mentor.avgRating} />

    <TouchableOpacity 
      style={styles.scheduleButton}
      onPress={() => navigation.navigate('MentorProfile', { mentorId: mentor.id })}
    >
      <Text style={styles.scheduleButtonText}>Schedule Session</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const LoadingState = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#10b981" />
    <Text style={styles.loadingText}>Loading mentors...</Text>
  </View>
);

const ErrorState = ({ error, onRetry }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorTitle}>Failed to load mentors</Text>
    <Text style={styles.errorMessage}>{error}</Text>
    <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
      <Text style={styles.retryButtonText}>Try Again</Text>
    </TouchableOpacity>
  </View>
);

const Mentor = ({ navigation }) => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dummyData = [
    {
      id: 1,
      name: "John Doe",
      avgRating: 4.8,
      bio: "Experienced software engineer specializing in frontend development.",
      expertise: ["React", "JavaScript", "CSS"],
    },
    {
      id: 2,
      name: "Jane Smith",
      avgRating: 4.5,
      bio: "Data scientist with expertise in machine learning and AI.",
      expertise: ["Python", "Machine Learning", "AI"],
    },
    {
      id: 3,
      name: "Emily Johnson",
      avgRating: 4.7,
      bio: "Digital marketer with a knack for SEO and content strategy.",
      expertise: ["SEO", "Content Marketing", "Google Ads"],
    },
    {
      id: 4,
      name: "Michael Brown",
      avgRating: 4.2,
      bio: "Full-stack developer with a focus on backend technologies.",
      expertise: ["Node.js", "MongoDB", "AWS"],
    },
  ];

  useEffect(() => {
    const fetchMentors = async () => {
      setIsLoading(true);
      try {
        // Simulating API call with dummy data
        setTimeout(() => {
          setMentors(dummyData);
          setFilteredMentors(dummyData);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch mentors. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchMentors();
  }, []);

  useEffect(() => {
    const filtered = mentors.filter(
      (mentor) =>
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setFilteredMentors(filtered);
  }, [searchQuery, mentors]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Connect with Expert Mentors</Text>
        <Text style={styles.subtitle}>
          Find the right mentor to guide you on your journey
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or expertise..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Content */}
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} onRetry={() => window.location.reload()} />
      ) : filteredMentors.length > 0 ? (
        <FlatList
          data={filteredMentors}
          renderItem={({ item }) => <MentorCard mentor={item} navigation={navigation} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.mentorList}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No mentors found</Text>
          <Text style={styles.noResultsSubtext}>Try adjusting your search terms</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
  },
  mentorList: {
    padding: 8,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  mentorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  mentorBio: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  skillBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  skillText: {
    color: '#6ee7b7',
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  star: {
    fontSize: 20,
    marginRight: 2,
  },
  ratingText: {
    color: '#9ca3af',
    fontSize: 14,
    marginLeft: 8,
  },
  scheduleButton: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  errorMessage: {
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#ffffff',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  noResultsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  noResultsSubtext: {
    color: '#9ca3af',
  },
});

export default Mentor;