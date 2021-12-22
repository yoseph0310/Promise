import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {userAPI} from '../../utils/axios';

const SocialModal = (props) => {
    const [petColor, setPetColor] = useState('#000000');
    const [nickColor, setNickColor] = useState('#000000');

    const [petName, setPetName] = useState('');
    const [nick, setNick] = useState('');

    const checkNick = async ()=>{
        const result = await userAPI.nickCheck(nick);
        if(result===200) {
            setNickColor('#A6DB9E');
        }else if(result===409){
            setNickColor('#FFABAB');
        }
    }

    const handlePet = (data)=>{
        setPetName(data);
        setPetColor('#A6DB9E');
        if(petName.length===0){
            setPetColor('#FFABAB');
        }
    }

    const sendData = ()=>{
        if(nickColor==='#A6DB9E' && petColor==='#A6DB9E'&&petName.length>0){
            props.user({nick:nick, petName:petName});
            props.now(false);
        }else if(nick.length===0){
            alert('닉네임을 입력해주세요.');
        }else if(nickColor==='#000000'){
            alert('닉네임 중복확인을 해주세요.');
        }else if(nickColor==='#FFABAB'){
            alert('중복된 닉네임입니다. 다시 확인해주세요.');
        }else if(petColor==='#FFABAB' || petColor==='#000000'){
            alert('펫 이름을 지어주세요.');
        }
    }

    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex:1, backgroundColor:'rgba(0,0,0,0.5)'}}>
            <View style={{position: 'absolute', width: '80%', height: '45%', backgroundColor: 'white', borderRadius: 20, elevation:2}} >
                <View style={{flexDirection: "row", margin:20, alignItems: 'center', justifyContent:'space-between'}}>
                    <Text style={{fontSize:20, color: 'black', fontWeight: 'bold', marginLeft:10}}>회원가입</Text>
                    <Icon.Button name='close' size={17} color='black' backgroundColor='white' onPress={()=>props.exit(false)}/>
                </View>
                <ScrollView style={{ width:'100%'}} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{flexDirection: "row", width:'100%', justifyContent: 'space-between'}}>
                        <Text style={{fontSize:15, color: 'black', fontWeight: 'bold', marginLeft:40, marginTop:10}}>닉네임</Text>
                        <TouchableOpacity onPress={()=>checkNick()} style={{marginRight:40, marginTop:10}}>
                            <Text>중복 확인</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: "row",alignItems: 'center', justifyContent: 'center', width:'95%', marginTop:5}}>
                        <View style={{width:'80%', height:40, margin: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEEEEE', borderRadius: 20}}>
                            <View style={{ alignItems: 'center', flexDirection: "row", margin:1}}>
                                <TextInput onChangeText={setNick} value={nick} style={{width:'80%', textAlign:'center', backgroundColor: '#EEEEEE', borderRadius: 20}}/>
                                <Icon name='checkcircle' color={nickColor} size={17}/>
                            </View>
                        </View>
                    </View>
                    <View style={{width:'100%', alignItems: 'flex-start'}}>
                        <Text style={{fontSize:15, color: 'black', fontWeight: 'bold', marginLeft:40, marginTop:10}}>펫 이름</Text>
                    </View>
                    <View style={{flexDirection: "row",alignItems: 'center', justifyContent: 'center', width:'95%', marginTop:5}}>
                        <View style={{width:'80%', height:40, margin: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEEEEE', borderRadius: 20}}>
                            <View style={{ alignItems: 'center', flexDirection: "row", margin:1}}>
                                <TextInput onChangeText={handlePet} value={petName} style={{width:'70%', textAlign:'center', backgroundColor: '#EEEEEE', borderRadius: 20, marginRight:5}}/>
                                <Icon name='checkcircle' color={petColor} size={17}/>
                            </View>
                        </View>
                    </View>
                    <View style={{margin:20, alignItems: 'center', width:'100%'}}>
                        <TouchableOpacity style={{backgroundColor:'#A3BED7', color:'black', width:'50%', alignItems: 'center', borderRadius: 5, height:40, justifyContent: 'center'}} onPress={()=>sendData()}>
                            <Text style={{color:'black', fontSize:15, fontWeight:'bold'}} >가입하기</Text >
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );   
}

export default SocialModal;