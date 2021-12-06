package com.pjt3.promise.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pjt3.promise.entity.AlarmShare;
import com.pjt3.promise.entity.MediAlarm;
import com.pjt3.promise.entity.User;
import com.pjt3.promise.repository.AlarmShareRepository;
import com.pjt3.promise.repository.AlarmShareRepositorySupport;
import com.pjt3.promise.repository.MediAlarmRepository;
import com.pjt3.promise.request.AlarmShareAcceptReq;
import com.pjt3.promise.response.AlarmShareGetRes;

@Service
public class AlarmShareServiceImpl implements AlarmShareService {

	private static final int SUCCESS = 1;
	private static final int FAIL = -1;

	@Autowired
	AlarmShareRepository alarmShareRepository;

	@Autowired
	MediAlarmRepository mediAlarmRepository;

	@Autowired
	AlarmShareRepositorySupport alarmShareRepositorySupport;

	@Override
	public List<AlarmShareGetRes> getAlarmShareList(User user) {
		return alarmShareRepositorySupport.getAlarmInfo(user);
	}

	@Transactional
	@Override
	public int acceptAlarmShare(User user, AlarmShareAcceptReq alarmShareAcceptReq) {
		try {

			AlarmShare alarmShare = alarmShareRepository.findByAsId(alarmShareAcceptReq.getAsId());
			
			MediAlarm mediAlarm = new MediAlarm();
			mediAlarm.setUser(user);
			mediAlarm.setAlarmTitle(alarmShare.getAlarmTitle());
			mediAlarm.setAlarmYN(alarmShare.getAlarmYN());
			mediAlarm.setAlarmTime1(alarmShare.getAlarmTime1());
			mediAlarm.setAlarmTime2(alarmShare.getAlarmTime2());
			mediAlarm.setAlarmTime3(alarmShare.getAlarmTime3());
			mediAlarm.setAlarmDayStart(alarmShare.getAlarmDayStart());
			mediAlarm.setAlarmDayEnd(alarmShare.getAlarmDayEnd());
			
			mediAlarmRepository.save(mediAlarm);
			
			alarmShareRepository.delete(alarmShare);
			
			return SUCCESS;

		} catch (Exception e) {
			e.printStackTrace();
			return FAIL;
		}
	}
	
	@Transactional
	@Override
	public int rejectAlarmShare(int asId) {
		try {

			alarmShareRepository.deleteById(asId);
			return SUCCESS;

		} catch (Exception e) {
			return FAIL;
		}
	}

}
