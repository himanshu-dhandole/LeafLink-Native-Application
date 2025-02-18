import { StyleSheet, Button, Text, View } from 'react-native'


const Profile = ({navigation}) => {
    return (
        <View>
          <Text>Profile</Text>
          <Button title="Search" onPress={()=> navigation.navigate("Search")}/>
        </View>
      )
}

export default Profile

const styles = StyleSheet.create({})