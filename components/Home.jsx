import { Button, Text, View } from 'react-native'

const Home = ({navigation}) => {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Profile" onPress={()=> navigation.navigate("Profile")}/>
    </View>
  )
}

export default Home;

// const styles = StyleSheet.create({})