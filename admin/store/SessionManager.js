import AsyncStorage from '@react-native-async-storage/async-storage';

const SessionManager = {
  async login(userData) {
    // Store user data in AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  },

  async logout() {
    // Clear user data from AsyncStorage
    await AsyncStorage.removeItem('user');
  },

  async getSession() {
    // Get user data from AsyncStorage
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default SessionManager;
