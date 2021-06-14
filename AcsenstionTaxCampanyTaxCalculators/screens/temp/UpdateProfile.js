import React, {useContext, useState} from 'react';
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Text,
    View,
    Alert,
    KeyboardAvoidingView, Image
} from 'react-native';
import styles from '../../styles/contact';
import {AuthContext} from '../../src/AuthProvider';
import Loader from '../../components/loader';
import ImagePicker from "react-native-image-picker";
import * as COLOR from "../../styles/constants";

let update_password = () => {
    alert('Passwd');
};
let update_photo = () => {
    alert('Photo');
};

const UpdateProfile = ({navigation, route}) => {

    const {user} = useContext(AuthContext);

    let [imageSourceData, setImageSourceData] = useState(null);
    let [firstName, setFirstName] = useState(user['firstname']);
    let [email, setEmail] = useState(user['email']);
    let [password, setPassword] = useState(user['password']);
    let [loading, setLoading] = useState(false);
    let [fullImage, setFullImage] = useState(null);
    let [errortext, setErrortext] = useState('');




    const selectPhoto = () => {
        ImagePicker.showImagePicker({
            title: 'Select a photo',
            takePhotoButtonTitle: 'Take a photo',
            chooseFromLibraryButtonTitle: 'Choose From Gallery',
            quality: 0.4,
        }, (response) => {
            if (response.didCancel) {
                //cancel
            } else if (response.error) {
                //error
            } else {
                let source = {uri: response.uri};
                setImageSourceData(source);
                setFullImage(response);
            }
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inner}>
                {/*<ImageBackground source={require('../../images/logo.png')} style={styles.logo}/>*/}
                <Text style={styles.heading}>User Profile</Text>
                <Loader loading={loading}/>

                <View style={{}}>
                    <Image
                        source={{uri: user['profilepic']}}
                        style={{
                            width:150,
                            height: 150,
                            marginTop: 10,
                            borderRadius: 10,
                            borderColor: COLOR.primary_color,
                            borderWidth: 2,
                            alignSelf: 'center',
                        }}/>
                    <Text style={{
                        width:'100%',
                        height: 50,
                        borderColor: COLOR.primary_color,
                        marginTop: 15,
                        color: COLOR.primary_color,
                        borderTopWidth: 5,
                        textAlign: 'center',
                        lineHeight: 45,
                        fontSize: 15
                    }}>{user['firstname']} {user['lastname']}</Text>
                </View>

                <TouchableOpacity
                    
                    style={{backgroundColor: COLOR.primary_color,
                        borderRadius:5,marginVertical:20,padding:10}}
                    onPress={() => navigation.navigate('Update User Info')}
                >
                    <Text style={{color:'white',textAlign:'center'}}>Update Info</Text>
                </TouchableOpacity>



                <TouchableOpacity
                    style={{backgroundColor: COLOR.primary_color,
                        borderRadius:5,marginVertical:10,padding:10}}
                    onPress={() => navigation.navigate('Update Password')}
                >
                    <Text style={{color:'white',textAlign:'center'}}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{backgroundColor: COLOR.primary_color,
                        borderRadius:5,marginVertical:10,padding:10}}
                    onPress={() => navigation.navigate('Update Image')}
                >
                    <Text style={{color:'white',textAlign:'center'}}>Update Image</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default UpdateProfile;
