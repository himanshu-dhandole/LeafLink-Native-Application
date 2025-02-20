import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Animated,
  Platform,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Home';

// Dummy Data
const CONTACTS = [
  {
    id: '1',
    name: 'Sarah Miller',
    role: 'Senior Product Manager at Google',
    lastMessage: 'I can review your portfolio tomorrow afternoon',
    timestamp: '10:30 AM',
    unread: 2,
    status: 'online',
  },
  {
    id: '2',
    name: 'James Chen',
    role: 'Tech Lead at Microsoft',
    lastMessage: 'Your experience with React Native is impressive',
    timestamp: '9:45 AM',
    unread: 0,
    status: 'offline',
  },
  {
    id: '3',
    name: 'Emma Thompson',
    role: 'UX Designer at Apple',
    lastMessage: 'The new design looks great!',
    timestamp: 'Yesterday',
    unread: 1,
    status: 'online',
  },
  {
    id: '4',
    name: 'Michael Rodriguez',
    role: 'Software Engineer at Amazon',
    lastMessage: 'Lets discuss the architecture tomorrow',
    timestamp: 'Yesterday',
    unread: 0,
    status: 'offline',
  },
];

const MESSAGES = {
  '1': [
    {
      id: 'm1',
      text: 'Hello Sarah, thank you for connecting!',
      timestamp: '10:00 AM',
      sent: true,
      status: 'read',
    },
    {
      id: 'm2',
      text: 'Hi! Id love to help with your career development.',
      timestamp: '10:15 AM',
      sent: false,
      status: 'delivered',
    },
    {
      id: 'm3',
      text: 'That would be great! When would be a good time to discuss?',
      timestamp: '10:20 AM',
      sent: true,
      status: 'read',
    },
    {
      id: 'm4',
      text: 'I can review your portfolio tomorrow afternoon',
      timestamp: '10:30 AM',
      sent: false,
      status: 'delivered',
    },
  ],
};

// Gradient Orb Component
const GradientOrb = ({ style }) => {
  const animation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 15000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 15000,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    
    animate();
  }, []);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <Animated.View
      style={[
        styles.gradientOrb,
        style,
        {
            filter : 'blur(30px)'  ,
          transform: [{ translateY }],
        },
      ]}
    />
  );
};

// Background Component with Gradient Orbs
const Background = () => (
  <View style={styles.backgroundContainer}>
    <GradientOrb
      style={{
        top: '10%',
        left: '70%',
        backgroundColor: 'rgba(76, 175, 80, 0.15)',
      }}
    />
    <GradientOrb
      style={{
        top: '40%',
        right: '55%',
        backgroundColor: 'rgba(33, 150, 243, 0.15)',
      }}
    />
    <GradientOrb
      style={{
        bottom: '10%',
        left: '30%',
        backgroundColor: 'rgba(76, 175, 80, 0.12)',
      }}
    />
  </View>
);

const MessageStatus = ({ status }) => {
  const iconName = {
    sent: 'check',
    delivered: 'check-all',
    read: 'check-all',
  }[status];

  const iconColor = status === 'read' ? '#4CAF50' : '#888';

  return (
    <Icon 
      name={iconName} 
      size={16} 
      color={iconColor} 
      style={styles.messageStatus} 
    />
  );
};

const Chat = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const sendButtonScale = useRef(new Animated.Value(1)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const animateSendButton = () => {
    Animated.sequence([
      Animated.timing(sendButtonScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(sendButtonScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSend = () => {
    if (!messageText.trim()) return;
    
    animateSendButton();
    
    const newMessage = {
      id: `m${Date.now()}`,
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit'
      }),
      sent: true,
      status: 'sent',
    };

    MESSAGES[selectedContact.id] = [
      ...(MESSAGES[selectedContact.id] || []),
      newMessage,
    ];

    setMessageText('');
    
    // Scroll to bottom after sending message
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const ContactList = () => (
    <FlatList
      data={CONTACTS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.contactItem}
          onPress={() => setSelectedContact(item)}
          activeOpacity={0.7}
        >
          <View style={styles.contactContent}>
            <View style={styles.contactHeader}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
            <Text style={styles.role}>{item.role}</Text>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {item.lastMessage}
            </Text>
            {item.status === 'online' && (
              <View style={styles.onlineIndicator} />
            )}
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
      style={styles.contactsList}
    />
  );

  const ChatView = () => (
    <KeyboardAvoidingView 
      style={styles.chatContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <TouchableOpacity 
            onPress={() => setSelectedContact(null)}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={24} color="#4CAF50" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{selectedContact.name}</Text>
            <Text style={styles.headerRole}>{selectedContact.role}</Text>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={MESSAGES[selectedContact.id] || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[
              styles.messageContainer,
              item.sent ? styles.sentMessage : styles.receivedMessage
            ]}>
              <Text style={styles.messageText}>{item.text}</Text>
              <View style={styles.messageFooter}>
                <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
                {item.sent && <MessageStatus status={item.status} />}
              </View>
            </View>
          )}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          onLayout={() => flatListRef.current?.scrollToEnd()}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        />

        <View style={[
          styles.inputContainer,
          keyboardVisible && styles.inputContainerWithKeyboard
        ]}>
          <TouchableOpacity style={styles.attachButton}>
            <Icon name="paperclip" size={24} color="#4CAF50" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#888"
            value={messageText}
            onChangeText={setMessageText}
            multiline
            returnKeyType="default"
            blurOnSubmit={false}
            autoCorrect={true}
          />
          <Animated.View style={{ transform: [{ scale: sendButtonScale }] }}>
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={handleSend}
              disabled={!messageText.trim()}
            >
              <Icon 
                name="send" 
                size={24} 
                color={messageText.trim() ? '#4CAF50' : '#666'} 
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Background />
      {!selectedContact ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Contacts </Text>
            <TouchableOpacity style={styles.headerButton}>
              <Icon name="home" size={24} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          <ContactList />
        </>
      ) : (
        <ChatView />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  
  gradientOrb: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.6,
    transform: [{ scale: 2 }],
    filter : 'blur(30px)'  ,
    filter: Platform.select({
      ios: 'blur(30px)',
      android: undefined,
    }),
  },

  container: {
    flex: 1,
    backgroundColor: '#0B1121',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },

  headerButton: {
    padding: 8,
  },

  contactsList: {
    flex: 1,
  },

  contactItem: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },

  contactContent: {
    flex: 1,
  },

  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },

  role: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },

  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  timestamp: {
    fontSize: 12,
    color: '#666',
  },

  unreadBadge: {
    position: 'absolute',
    right: 0,
    top: 37,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  

  chatContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  chatContent: {
    flex: 1,
    backgroundColor: 'rgba(18, 18, 18, 0.85)',
  },

  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
  },

  backButton: {
    marginRight: 16,
  },

  headerInfo: {
    flex: 1,
  },

  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },

  headerRole: {
    fontSize: 12,
    color: '#888',
  },

  messagesList: {
    flex: 1,
  },

  messagesContent: {
    padding: 16,
    paddingBottom: 32,
  },

  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
  },

  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(76, 175, 80, 0.25)',
  },

  receivedMessage: {
    alignSelf: 'flex-start',
  },

  messageText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
  },

  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },

  messageTimestamp: {
    fontSize: 12,
    color: '#888',
    marginRight: 4,
  },

  messageStatus: {
    marginLeft: 4,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },

  inputContainerWithKeyboard: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },

  attachButton: {
    padding: 8,
    opacity: 0.8,
  },

  input: {
    flex: 1,
    marginHorizontal: 8,
    padding: 12,
    paddingTop: 12,
    maxHeight: 120,
    minHeight: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    color: '#fff',
    fontSize: 16,
    lineHeight: 20,
  },

  sendButton: {
    padding: 8,
    opacity: 0.8,
  },
});

export default Chat;