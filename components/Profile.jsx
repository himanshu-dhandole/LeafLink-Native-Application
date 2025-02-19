import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  Image,
  Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const GlassMorphicCard = ({ children, style }) => (
  <View style={[styles.glassCard, style]}>
    <View style={styles.glassContent}>
      {children}
    </View>
  </View>
);

const RoleModal = ({ visible, onClose, role }) => {
  const [formData, setFormData] = useState({
    expertise: '',
    yearsOfExperience: '',
    companyName: '',
    website: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <GlassMorphicCard style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {role === 'mentor' ? 'Become a Mentor' : 'Register as Employer'}
          </Text>
          
          {role === 'mentor' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Expertise"
                placeholderTextColor="#9ca3af"
                value={formData.expertise}
                onChangeText={(text) => setFormData({...formData, expertise: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Years of Experience"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                value={formData.yearsOfExperience}
                onChangeText={(text) => setFormData({...formData, yearsOfExperience: text})}
              />
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Company Name"
                placeholderTextColor="#9ca3af"
                value={formData.companyName}
                onChangeText={(text) => setFormData({...formData, companyName: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Website"
                placeholderTextColor="#9ca3af"
                value={formData.website}
                onChangeText={(text) => setFormData({...formData, website: text})}
              />
            </>
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </GlassMorphicCard>
      </View>
    </Modal>
  );
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    // Simulated API call
    const fetchProfile = async () => {
      try {
        // Replace with actual API call
        const dummyProfile = {
          name: 'Himanshu Dhandole',
          email: 'himanshudhandole@example.com',
          phone: '+1 (555) 123-4567',
          location: 'New York, NY',
          skills: ['React Native', 'JavaScript', 'Node.js', 'Python', 'AWS', 'Docker'],
          education: [
            {
              degree: 'Master of Computer Science',
              school: 'Stanford University',
              year: '2020-2022'
            },
            {
              degree: 'Bachelor of Engineering',
              school: 'MIT',
              year: '2016-2020'
            }
          ],
          experience: [
            {
              role: 'Senior Software Engineer',
              company: 'Google',
              duration: '2022-Present',
              description: 'Leading frontend development team for Google Cloud Platform'
            },
            {
              role: 'Software Engineer',
              company: 'Amazon',
              duration: '2020-2022',
              description: 'Worked on AWS Lambda and serverless architecture'
            }
          ],
          certifications: [
            'AWS Certified Solutions Architect',
            'Google Cloud Professional Developer',
            'MongoDB Certified Developer'
          ],
          socialLinks: {
            linkedin: 'https://linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe',
            twitter: 'https://twitter.com/johndoe',
            portfolio: 'https://johndoe.dev'
          },
          preferredLocations: ['Remote', 'New York'],
          roles: ['Senior Developer', 'Tech Lead'],
          bio: 'Passionate developer with 5+ years of experience in full-stack development',
          joinDate: '2023-01-15',
          connections: 245,
          projectsCompleted: 12
        };

        const dummyWallet = {
          balance: 2500.00,
          transactions: [
            { id: 1, type: 'Mentorship Session', amount: 50, date: '2024-02-15', status: 'completed' },
            { id: 2, type: 'Course Purchase', amount: 99, date: '2024-02-10', status: 'completed' },
            { id: 3, type: 'Workshop', amount: 150, date: '2024-02-01', status: 'completed' },
            { id: 4, type: 'Deposit', amount: 1000, date: '2024-01-28', status: 'completed' },
            { id: 5, type: 'Withdrawal', amount: -500, date: '2024-01-15', status: 'completed' }
          ],
          paymentMethods: [
            { id: 1, type: 'Credit Card', last4: '4242', default: true },
            { id: 2, type: 'PayPal', email: 'john@example.com', default: false }
          ]
        };

        setProfile(dummyProfile);
        setWallet(dummyWallet);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSocialLink = (url) => {
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    
    <ScrollView style={styles.container}>
      <View style={styles.orb1} />
      <View style={styles.orb2} />
      <View style={styles.orb3} />

      <GlassMorphicCard style={styles.profileHeader}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileEmail}>{profile.email}</Text>
        <Text style={styles.profileLocation}>{profile.location}</Text>
        <Text style={styles.profileBio}>{profile.bio}</Text>
        
        <View style={styles.socialLinks}>
          {Object.entries(profile.socialLinks).map(([platform, url]) => (
            <TouchableOpacity
              key={platform}
              style={styles.socialButton}
              onPress={() => handleSocialLink(url)}
            >
              <Text style={styles.socialButtonText}>{platform}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{profile.connections}</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{profile.projectsCompleted}</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
        </View>
      </GlassMorphicCard>

      <GlassMorphicCard style={styles.section}>
        <Text style={styles.sectionTitle}>Wallet</Text>
        <View style={styles.walletHeader}>
          <Text style={styles.walletBalance}>Balance: ${wallet.balance.toFixed(2)}</Text>
        </View>
        <View style={styles.walletTransactions}>
          {wallet.transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionType}>{transaction.type}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={[
                styles.transactionAmount,
                transaction.amount < 0 ? styles.negativeAmount : styles.positiveAmount
              ]}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </GlassMorphicCard>

      <GlassMorphicCard style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {profile.experience.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.expRole}>{exp.role}</Text>
            <Text style={styles.expCompany}>{exp.company}</Text>
            <Text style={styles.expDuration}>{exp.duration}</Text>
            <Text style={styles.expDescription}>{exp.description}</Text>
          </View>
        ))}
      </GlassMorphicCard>

      <GlassMorphicCard style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {profile.education.map((edu, index) => (
          <View key={index} style={styles.educationItem}>
            <Text style={styles.eduDegree}>{edu.degree}</Text>
            <Text style={styles.eduSchool}>{edu.school}</Text>
            <Text style={styles.eduYear}>{edu.year}</Text>
          </View>
        ))}
      </GlassMorphicCard>

      <GlassMorphicCard style={styles.section}>
        <Text style={styles.sectionTitle}>Certifications</Text>
        {profile.certifications.map((cert, index) => (
          <Text key={index} style={styles.certificationItem}>{cert}</Text>
        ))}
      </GlassMorphicCard>

      <GlassMorphicCard style={styles.section}>
        <Text style={styles.sectionTitle}>Skills & Expertise</Text>
        <View style={styles.skillsContainer}>
          {profile.skills.map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </GlassMorphicCard>

      <RoleModal
        visible={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        role={selectedRole}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  }, 
  orb1: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderRadius: 100,
    top: -40,
    left: -40,
    opacity: 0.6,
    filter: 'blur(50px)',
  },
  orb2: {
    position: 'absolute',
    width: 250,
    height: 250,
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    borderRadius: 125,
    top: height / 4,
    right: -50,
    opacity: 0.6,
    filter: 'blur(50px)',
  },
  orb3: {
    position: 'absolute',
    width: 180,
    height: 180,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderRadius: 90,
    bottom: 40,
    left: width / 3,
    opacity: 0.6,
    filter: 'blur(50px)',
  },
  profileHeader: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    marginBottom: 20,
  },
  profileName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'center',
  },
  profileEmail: {
    color: '#9ca3af',
    marginBottom: 8,
    alignSelf: 'center',
  },
  profileLocation: {
    color: '#9ca3af',
    marginBottom: 16,
    alignSelf: 'center',
  },
  profileBio: {
    color: '#d1d5db',
    textAlign: 'center',
    marginBottom: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 16,
  },
  socialButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 14,
  },
  section: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  walletHeader: {
    marginBottom: 20,
  },
  walletBalance: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  walletTransactions: {
    marginTop: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transactionType: {
    color: '#fff',
    fontSize: 16,
  },
  transactionDate: {
    color: '#9ca3af',
    fontSize: 14,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  negativeAmount: {
    color: '#ef4444',
  },
  positiveAmount: {
    color: '#10b981',
  },
  experienceItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
  borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  expRole: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  expCompany: {
    color: '#10b981',
    fontSize: 16,
    marginBottom: 4,
  },
  expDuration: {
    color: '#9ca3af',
    marginBottom: 8,
  },
  expDescription: {
    color: '#d1d5db',
    lineHeight: 20,
  },
  educationItem: {
    marginBottom: 16,
  },
  eduDegree: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eduSchool: {
    color: '#10b981',
    marginBottom: 2,
  },
  eduYear: {
    color: '#9ca3af',
  },
  certificationItem: {
    color: '#fff',
    marginBottom: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    padding: 8,
    borderRadius: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skillText: {
    color: '#fff',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#10b981',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#ef4444',
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default Profile;