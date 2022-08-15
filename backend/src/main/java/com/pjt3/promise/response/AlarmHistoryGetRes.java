package com.pjt3.promise.response;

import java.util.List;

import lombok.Data;

@Data
public class AlarmHistoryGetRes {
	private List<AlarmGetRes> alarmList;
	private int totalPageCnt;
	
}
