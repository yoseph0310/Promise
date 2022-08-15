import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PROFILE_URL} from '../../utils/oauth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PetIcon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import {myinfo, withdraw} from '../../utils/axios';

const Mypage = ({navigation}) => {
    const [userNickname, setUserNickname] = useState('');
    const [petName, setPetName] = useState('');
    const [petLevel, setPetLevel] = useState(1);
    const [userProfile, setUserProfile] = useState('');
    const [spinVisible, setSpinvisible] = useState();

    const logout = () =>{
        Alert.alert(
            '로그아웃',
            '로그아웃 하시겠습니까?',
            [{
                text:'예',
                onPress : ()=>{
                    AsyncStorage.removeItem('token');
                    AsyncStorage.removeItem('refresh');
                    navigation.replace('LoginScreen');
                }
            },{
                text:'아니요',
                onPress: ()=>{}
            }]
        )
        
    }

    const getMyInfo = async ()=>{
        setSpinvisible(true);
        const result = await myinfo();
        setUserNickname(result.userNickname);
        setPetName(result.petName);
        setPetLevel(result.petLevel);
        if(result.userProfileUrl){
            setUserProfile(result.userProfileUrl+ '?' + new Date());
        }
        setSpinvisible(false);
    }

    useFocusEffect(
        useCallback(()=>{
            getMyInfo();
            return ()=> clearTimeout(3000);
        }, [])
    );

    const withdrawCheck = ()=>{
        Alert.alert(
            '회원 탈퇴',
            '약속을 탈퇴하시겠습니까?',
            [{
                text:'예',
                onPress : ()=> withdrawAccount()
            },{
                text:'아니요',
                onPress : ()=> {}
            }],
            {cancleable:false}
        )
    }

    const withdrawAccount = async()=>{
        const result = await withdraw();
        if(result === 200){
            Alert.alert(
                '회원 탈퇴',
                '성공적으로 탈퇴되셨습니다.',
                [{
                    text:'확인',
                    onPress: ()=>{
                        AsyncStorage.removeItem('token');
                        AsyncStorage.removeItem('refresh');
                        navigation.replace('LoginScreen');
                    }
                }]
            );
            
        }
    }
    return (
        <View  style={{ flex: 1, alignItems: 'center', backgroundColor:'#F9F9F9' }}>
            <Spinner visible={spinVisible} />
            <View style={{width: '100%', height: '50%'}}>
                <View style={{width: '100%', height:'40%', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', margin:30}}>
                    <View style={{width:130, height:130, borderRadius:100, backgroundColor:'#C4C4C4'}}>
                        {userProfile.length>0 ? 
                            <Image resizeMode='cover' source={{uri:userProfile}} style={{width: 130, height: 130, borderRadius:100}}/>
                        :null}
                    </View>
                    <View style={{width:'60%', height:'70%', justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: 'bold', fontSize:20}}>{userNickname}</Text>
                        <Text style={{fontWeight: 'bold', fontSize:15}}>Lv{petLevel}. {petName}</Text>
                        <View style={{flexDirection: "row", width:'50%', alignItems: 'center', justifyContent: 'space-between'}}>
                            <TouchableOpacity onPress={()=>logout()}>
                                <Text style={{color:'#5A88B1', fontWeight:'bold'}}>로그아웃</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>withdrawCheck()}>
                                <Text style={{color:'#999999', fontWeight:'bold'}}>회원탈퇴</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{width: '100%', alignItems: 'center'}}>
                    <TouchableOpacity style={styles.mypageContainer} onPress={()=>navigation.navigate('modifyInfo')}>
                        <View style={styles.mypageWrapper}>
                            <View style={styles.mypageContent}>
                                <Icon name='pencil' color='black' size={30}/>
                                <Text style={{fontSize:18, marginLeft:'10%'}}>정보수정</Text>
                            </View>
                            <Icon name='chevron-right' color='black' size={30} style={{marginRight:'5%'}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mypageContainer} onPress={()=>navigation.navigate('mypill')}>
                        <View style={styles.mypageWrapper}>
                            <View style={styles.mypageContent}>
                                <Icon name='pill' color='black' size={30}/>
                                <Text style={{fontSize:18, marginLeft:'10%'}}>복용중인 약</Text>
                            </View>
                            <Icon name='chevron-right' color='black' size={30} style={{marginRight:'5%'}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mypageContainer} onPress={()=>navigation.navigate('mypet')}>
                        <View style={styles.mypageWrapper}>
                            <View style={styles.mypageContent}>
                                <PetIcon name='pets' color='black' size={27}/>
                                <Text style={{fontSize:18, marginLeft:'10%'}}>마이펫</Text>
                            </View>
                            <Icon name='chevron-right' color='black' size={30} style={{marginRight:'5%'}}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mypageContainer: {
        width: '85%',
        backgroundColor: '#FFFFFF',
        height: '25%', 
        margin: 10,
        borderRadius: 10,
        borderColor: '#BDBDBD',
        borderWidth: 0.3
    },
    mypageWrapper: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%'
    },
    mypageContent: {
        flexDirection: "row",
        alignItems: 'center',
        marginLeft: '5%',
    }
})
export default Mypage;