import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { View, Text, FlatList } from 'react-native';
import TimelineInfo from '../../components/TimelineInfo';
import { getPeriod } from '../../utils/axios';
import Spinner from 'react-native-loading-spinner-overlay';

const Timeline = (props) => {
    const [spinVisible, setSpinvisible] = useState();
    const [alarmList, setAlarmList] = useState([]);
    const [totalPageCnt, setTotalPageCnt] = useState();
    const [pageNum, setPageNum] = useState(1);
    const [loading, setloading] = useState(false);

    const gettingList = async() => {
        setloading(true);
        setSpinvisible(true);
        const result = await getPeriod(pageNum);
        setAlarmList(alarmList.concat(result.alarmList));
        setPageNum(pageNum + 1);
        setTotalPageCnt(result.totalPageCnt);
        setloading(false);
        setSpinvisible(false);
    }

    useFocusEffect(
        useCallback(()=>{
            if(props.navigation.isFocused()){
                setAlarmList([]);
                setPageNum(1);
            }
            gettingList();
        }, [])
    );

    const renderItem = ({ item }) => {
        return(
          <TimelineInfo item={item} func = {(id)=>props.navigation.navigate('TimelineDetail',{data:id})}/>
        )
    };

    return (
        <View  style={{ flex: 1, alignItems: 'center', backgroundColor:'#F9F9F9' }}>
            <Spinner visible={spinVisible} />
            {alarmList.length>0?(
                <View style={{ paddingHorizontal: 20, width:'100%', margin:10}}>
                    <FlatList 
                        data={alarmList}
                        renderItem={renderItem}
                        onEndReached={() => {if(loading===false && pageNum<=totalPageCnt) gettingList()}}
                        onEndReachedThreshold={0.1}
                        keyExtractor={item => item.id}
                    />
                </View>
            ):(
                <View style={{ flex: 1, alignItems: 'center', justifyContent:'center' }}>
                    <Text style={{fontSize:25, color:'gray'}}>지난 알람이 없습니다.</Text>
                </View>
            )}
        </View>
    );
};

export default Timeline;