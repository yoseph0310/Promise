package com.pjt3.promise.response;

import java.util.List;

import lombok.Data;

@Data
public class AlarmMainGetRes {
	private List<AlarmMainListGetRes> alarmList;
	private boolean isPreAlarm;
}
