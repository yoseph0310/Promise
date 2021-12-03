package com.pjt3.promise.service;

import java.util.List;

import com.pjt3.promise.entity.User;
import com.pjt3.promise.request.AlarmShareAcceptReq;
import com.pjt3.promise.response.AlarmShareGetRes;

public interface AlarmShareService {

	List<AlarmShareGetRes> getAlarmShareList(User user);

	int acceptAlarmShare(User user, AlarmShareAcceptReq alarmShareAcceptReq);

	int rejectAlarmShare(int asId);

}
