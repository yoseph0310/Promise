import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { View, ScrollView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import IIcon from 'react-native-vector-icons/Ionicons';
import DetailList from '../../components/atoms/DetailList';
import {getAlarmDetail} from '../../utils/axios';
import Spinner from 'react-native-loading-spinner-overlay';
import DivideLine from '../../components/frames/DivideLine';

const TimelineDetail = (props) => {
    const [title, onChangeTitle] = useState('');
    const [isOn, setIsOn] = useState(false);
    const [pillList, setPillList] = useState([]);
    const [tag, setTag] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectTime1, setSelectTime1] = useState(null);
    const [selectTime2, setSelectTime2] = useState(null);
    const [selectTime3, setSelectTime3] = useState(null);
    const [spinVisible, setSpinvisible] = useState();

    const getDetail = async(id)=>{
        setSpinvisible(true);
        const result = await getAlarmDetail(id);
        onChangeTitle(result.alarmTitle);
        setPillList(result.alarmMediList);
        setStartDate(result.alarmDayStart);
        setEndDate(result.alarmDayEnd);
        setTag(result.tagList);
        setSelectTime1(result.alarmTime1);
        setSelectTime2(result.alarmTime2);
        setSelectTime3(result.alarmTime3);
        if(result.alarmYN===1) setIsOn(true);
        else setIsOn(false);
        setSpinvisible(false);
    }

    useFocusEffect(
        useCallback(() => {
            getDetail(props.route.params.data);
        }, [])
    );

    const getMediList = ()=>{
        let result = [];
        if(pillList.length>0){
            pillList.map(item=>{
                result = result.concat(
                    <DetailList name={item}/>
                )
            })
        }
        return result;
    }

    const getTagList = () =>{
        let result = '';
        if(tag.length > 0){
            tag.map(item=>{
                result = result + `#${item} `;
            })
        }else{
            result = '등록한 태그가 없습니다.'
        }
        return result;
    }

    const getTimeList = ()=>{
        let result = [];
        if(selectTime1){
            result = result.concat(
                <DetailList name={selectTime1[0]+selectTime1[1]+'시 '+selectTime1[2]+selectTime1[3]+'분'}/>
            )
        }
        if(selectTime2){
            result = result.concat(
                <DetailList name={selectTime2[0]+selectTime2[1]+'시 '+selectTime2[2]+selectTime2[3]+'분'}/>
            )
        }
        if(selectTime3){
            result = result.concat(
                <DetailList name={selectTime3[0]+selectTime3[1]+'시 '+selectTime3[2]+selectTime3[3]+'분'}/>
            )
        }
        return result;
    }

    return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
            <Spinner visible={spinVisible} />
            <View style={{width: '90%', alignItems: 'flex-start', marginTop: 10}}>
            <Icon.Button name="left" color="black" backgroundColor="white" size={25} onPress={() => props.navigation.goBack()} />
            </View>
            <ScrollView style={{width: '100%', margin: 10}} contentContainerStyle={{alignItems: 'center', margin: 10}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'flex-start', height: 40, marginBottom:10 }}>
                    <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold'}}>{title}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'flex-start', height: 45 }}>
                    <MCIcon name='calendar-blank' color='#98BBDC' background='white' size={25}/>
                    <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold', marginLeft:20}}>기간</Text>
                </View>
                <View style={{width: '100%', height: 30, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{flexDirection:'row', width:'66%'}}>
                        <Text style={{color: '#363636', borderRadius: 20, textAlign: 'center', marginRight:10}}>{startDate}</Text>
                        <Text style={{color:'#363636', marginRight:10}}>~</Text>
                        <Text style={{color: '#363636', borderRadius: 20, textAlign: 'center'}}>{endDate}</Text>
                    </View>
                </View>
                <DivideLine/>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'flex-start', height: 45 }}>
                    <FAIcon name='pills' color='#E19A9A' background='white' size={25}/>
                    <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold', marginLeft:18 }}>약 정보</Text>
                </View>
                {getMediList()}
                <DivideLine/>
                {isOn ? (
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'flex-start', height: 45 }}>
                            <IIcon name='alarm' color='#F9DA8A' background='white' size={25}/>
                            <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold', marginLeft:20 }}>알람시간</Text>
                        </View>
                        {getTimeList()}
                        <DivideLine/>
                    </>
                ) : null}
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'flex-start', height: 45 }}>
                    <IIcon name='bookmark' color='#A1E7B1' background='white' size={25}/>
                    <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold', marginLeft:20 }}>태그</Text>
                </View>
                <View style={{ width: '78%', height: 30, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ width: '85%', color: '#363636', borderRadius: 20}}>{getTagList()}</Text>
                </View>
            </ScrollView>
        </View>
    );
};
export default TimelineDetail;
