import React, {useState, useEffect} from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

import { getCommunityAPI } from '../../utils/axios';
import { useDispatch } from 'react-redux';
import { getCommunityAction, resetCommunityListAction } from '../../modules/community/actions';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import InputText from '../../components/InputText';
import InputLongText from '../../components/InputLongText';
import InputTitleText from '../../components/InputTitleText';

const PostUpdatePage = ({navigation, route}) => {
    
    const dispatch = useDispatch();

    const postTitle = route.params.post.commuTitle
    const postContents = route.params.post.commuContents
    
    const [title, onChangeTitle] = useState(postTitle);
    const [content, onChangeContent] = useState(postContents);

    const postUpdate = async () => {
        const postId = route.params.postId
        await getCommunityAPI.update(postId, title, content)
        .then(res => {
            Alert.alert(
                '게시물이 성공적으로 수정되었습니다.',
                [{
                    text:'확인',
                    onPress: () =>{}
                }]
            )
            dispatch(resetCommunityListAction())
          }).then(()=>{
            getCommunityAPI.list(1).then(res => {
              dispatch(getCommunityAction(res))
            }).then(()=>{navigation.navigate('community')})
          })
    }

    return (
        <>
            <View  style={styles.titleView}>
                <View style={{width:'90%'}}>
                    <InputTitleText name='제목' text={route.params.post.commuTitle} result={(data)=>onChangeTitle(data)} />
                </View>
            </View>
            <View  style={styles.mainView}>
                <ScrollView style={{ width:'90%' }} contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start'}}>
                    <View style={{width:'100%', margin:10}}>
                        <InputLongText name='내용' text={route.params.post.commuContents} result={(data)=>onChangeContent(data)} />
                    </View>
                </ScrollView>
                <View style={{width:'90%', margin:10, alignItmes:'flex-end'}}>
                    <TouchableOpacity style={{backgroundColor:'#A3BED7', color:'black', alignItems: 'center', borderRadius: 12, height:50, justifyContent: 'center'}} onPress={postUpdate}>
                        <Text style={{color:'black', fontSize:20, fontWeight:'bold'}}>작성</Text >
                    </TouchableOpacity>
                </View>
            </View>
        </>


    );
};

const styles = StyleSheet.create({
    titleView: { 
        flex: 1, 
        alignItems: 'center', 
        backgroundColor:'#F9F9F9', 
        justifyContent:'center' 
    },
    mainView: { 
        flex: 6, 
        alignItems: 'center', 
        backgroundColor:'#F9F9F9', 
        justifyContent:'center' 
    }
})

export default PostUpdatePage;