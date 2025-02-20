import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const Session = ({ navigation }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleCamera = () => {
    setIsCameraOff(!isCameraOff);
  };

  const endCall = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.orbContainer}>
        <View style={[styles.orb, styles.orb1]} />
        <View style={[styles.orb, styles.orb2]} />
        <View style={[styles.orb, styles.orb3]} />
      </View>

      <View style={styles.videoContainer}>
        <View style={styles.localVideo} />
        <View style={styles.remoteVideo} />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, isMuted && styles.controlButtonActive]} 
          onPress={toggleMute}
        >
          <Icon name={isMuted ? "microphone-slash" : "microphone"} size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.controlButton, styles.endCallButton]} 
          onPress={endCall}
        >
          <Icon name="phone" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.controlButton, isCameraOff && styles.controlButtonActive]} 
          onPress={toggleCamera}
        >
          <Icon name={isCameraOff ? "video-slash" : "video-camera"} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1121',
  },
  orbContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    filter: 'blur(30px)',
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.4,
  },
  orb1: {
    width: 300,
    height: 300,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    top: -100,
    left: -100,
  },
  orb2: {
    width: 250,
    height: 250,
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    top: height * 0.3,
    right: -50,
  },
  orb3: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    bottom: -50,
    left: -50,
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  localVideo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 100,
    height: 150,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    zIndex: 2,
  },
  remoteVideo: {
    flex: 1,
    backgroundColor: '#1E2832',
    borderRadius: 20,
    margin: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(11, 17, 33, 0.9)',
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E2832',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  controlButtonActive: {
    backgroundColor: '#DC3545',
  },
  endCallButton: {
    backgroundColor: '#DC3545',
    transform: [{ rotate: '135deg' }],
  },
});

export default Session;
