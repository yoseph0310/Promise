package com.pjt3.promise.response;

import java.util.List;

import lombok.Data;

@Data
public class AlarmMainListGetRes {
	private int alarmId;
	private String alarmTitle;
	private String alarmTime1;
	private String alarmTime2;
	private String alarmTime3;
	private List<String> mediList;

}
