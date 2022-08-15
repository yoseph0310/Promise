package com.pjt3.promise.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.pjt3.promise.entity.QMediAlarm;
import com.pjt3.promise.entity.QTag;
import com.pjt3.promise.entity.QTakeHistory;
import com.pjt3.promise.entity.QUserMedicine;
import com.pjt3.promise.entity.User;
import com.pjt3.promise.response.AlarmCalendarGetRes;
import com.pjt3.promise.response.AlarmDetailGetRes;
import com.pjt3.promise.response.AlarmGetRes;
import com.pjt3.promise.response.AlarmHistoryGetRes;
import com.pjt3.promise.response.AlarmMainGetRes;
import com.pjt3.promise.response.AlarmMainListGetRes;
import com.pjt3.promise.response.MediPillGetRes;
import com.pjt3.promise.response.MyAlarmHistory;
import com.pjt3.promise.response.MyPillGetRes;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class MediAlarmRepositorySupport {

    @Autowired
    private JPAQueryFactory query;
    
    QMediAlarm qMediAlarm = QMediAlarm.mediAlarm;
    
    QUserMedicine qUserMedicine = QUserMedicine.userMedicine;
    
    QTakeHistory qTakeHistory = QTakeHistory.takeHistory;
    
    QTag qTag = QTag.tag;
    
    public AlarmDetailGetRes getAlarmInfo(int alarmId) {

    	AlarmDetailGetRes alarmDetailGetRes = query.select(Projections.bean(AlarmDetailGetRes.class,
    			qMediAlarm.alarmId, qMediAlarm.alarmTitle, qMediAlarm.alarmYN,
    			qMediAlarm.alarmTime1,qMediAlarm.alarmTime2,qMediAlarm.alarmTime3,
    			qMediAlarm.alarmDayStart, qMediAlarm.alarmDayEnd))
    			.from(qMediAlarm).where(qMediAlarm.alarmId.eq(alarmId)).fetchOne();
    	if(alarmDetailGetRes != null) {
        	List<String> alarmMediList = query.select(qUserMedicine.umName)
        			.from(qUserMedicine).where(qUserMedicine.mediAlarm.alarmId.eq(alarmId)).fetch();

        	List<String> tagList = query.select(qTag.tagName)
        			.from(qTag).where(qTag.mediAlarm.alarmId.eq(alarmId)).fetch();
        	alarmDetailGetRes.setAlarmMediList(alarmMediList);
        	alarmDetailGetRes.setTagList(tagList);
    	}
    	
    	return alarmDetailGetRes;

    }

	public List<AlarmGetRes> getDateAlarmList(User user, String nowDate) {

		List<AlarmGetRes> alarmList = query.select(Projections.bean(AlarmGetRes.class,
    			qMediAlarm.alarmId, qMediAlarm.alarmTitle,
    			qMediAlarm.alarmDayStart, qMediAlarm.alarmDayEnd))
    			.from(qMediAlarm)
    			.where(qMediAlarm.user.eq(user),
    					qMediAlarm.alarmDayStart.loe(nowDate), qMediAlarm.alarmDayEnd.goe(nowDate))
    			.orderBy(qMediAlarm.alarmId.desc())
    			.fetch();
		return alarmList;
	}

	public List<AlarmGetRes> getPastAlarmList(String today, User user, int limit, int offset) {

		List<AlarmGetRes> alarmList = query.select(Projections.bean(AlarmGetRes.class,
    			qMediAlarm.alarmId, qMediAlarm.alarmTitle,
    			qMediAlarm.alarmDayStart, qMediAlarm.alarmDayEnd))
    			.from(qMediAlarm)
    			.where(qMediAlarm.user.eq(user),
    					qMediAlarm.alarmDayEnd.lt(today))
    			.orderBy(qMediAlarm.alarmDayEnd.desc())
    			.offset(offset)
                .limit(limit)
    			.fetch();
		
		return alarmList;
	}
	
	public int getTotalCountPastAlarmList(String today, User user) {
		long total = query.select(qMediAlarm)
    			.from(qMediAlarm)
    			.where(qMediAlarm.user.eq(user), qMediAlarm.alarmDayEnd.lt(today)).fetchCount();
		return (int) total;
	}

	public List<MyPillGetRes> getMyPillList(User user, String today) {
		List<MyPillGetRes> alarmList = query.select(Projections.bean(MyPillGetRes.class,
    			qMediAlarm.alarmId, qMediAlarm.alarmDayStart, qMediAlarm.alarmDayEnd))
    			.from(qMediAlarm)
    			.where(qMediAlarm.user.eq(user),
    					qMediAlarm.alarmDayStart.loe(today), qMediAlarm.alarmDayEnd.goe(today))
    			.orderBy(qMediAlarm.alarmId.desc())
    			.fetch();
		
		for (MyPillGetRes myPillGetRes : alarmList) {
			int alarmId = myPillGetRes.getAlarmId();
			List<MediPillGetRes> alarmMediList = query.select(Projections.bean(MediPillGetRes.class,
	    			qUserMedicine.medicine.mediSerialNum, qUserMedicine.umName))
	    			.from(qUserMedicine)
	    			.where(qUserMedicine.mediAlarm.alarmId.eq(alarmId)).fetch();
			
			myPillGetRes.setAlarmMediList(alarmMediList);
		}
		return alarmList;
	}

	
	public List<MyAlarmHistory> getMyPillHistoryList(User user, int limit, int offset) {
		List<MyAlarmHistory> alarmHistoryList = query.select(Projections.bean(MyAlarmHistory.class,
    			qTakeHistory.mediAlarm.alarmTitle, qTakeHistory.thTime, qTakeHistory.mediAlarm.alarmId))
    			.from(qTakeHistory)
    			.where(qTakeHistory.user.eq(user),qTakeHistory.thYN.eq(1))
                .orderBy(qTakeHistory.thId.desc())
    			.offset(offset)
                .limit(limit)
                .fetch();
		
		for (MyAlarmHistory myAlarmHistory : alarmHistoryList) {
			int alarmId = myAlarmHistory.getAlarmId();
			List<String> alarmMediList = query.select(qUserMedicine.umName)
	    			.from(qUserMedicine)
	    			.where(qUserMedicine.mediAlarm.alarmId.eq(alarmId)).fetch();
			
			myAlarmHistory.setAlarmMediList(alarmMediList);
			
		}
		
		return alarmHistoryList;
	}

	public int getTotalCountMyPillHistoryList(User user) {
		long total = query.select(qTakeHistory)
    			.from(qTakeHistory)
    			.where(qTakeHistory.user.eq(user),qTakeHistory.thYN.eq(1)).fetchCount();
		return (int) total;
	}

	public List<AlarmCalendarGetRes> getMonthAlarmList(User user, String firstDay, String lastDay) {
		List<AlarmCalendarGetRes> calendarAlarmList = query.select(Projections.bean(AlarmCalendarGetRes.class,
    			qMediAlarm.alarmId, qMediAlarm.alarmDayStart, qMediAlarm.alarmDayEnd))
    			.from(qMediAlarm)
    			.where(qMediAlarm.user.eq(user),
    					(qMediAlarm.alarmDayStart.goe(firstDay).and(qMediAlarm.alarmDayStart.loe(lastDay)))
    					.or(qMediAlarm.alarmDayStart.loe(firstDay)
    							.and((qMediAlarm.alarmDayEnd.goe(lastDay)
    									.or(((qMediAlarm.alarmDayEnd.goe(firstDay).and(qMediAlarm.alarmDayEnd.loe(lastDay)))))))))
    			.orderBy(qMediAlarm.alarmId.desc())
    			.fetch();
		return calendarAlarmList;
	}

	public List<AlarmMainListGetRes> getMainAlarmList(User user, String today) {
		List<AlarmMainListGetRes> alarmList = query.select(Projections.bean(AlarmMainListGetRes.class,
    			qMediAlarm.alarmId, qMediAlarm.alarmTitle,
    			qMediAlarm.alarmTime1, qMediAlarm.alarmTime2, qMediAlarm.alarmTime3))
    			.from(qMediAlarm)
    			.where(qMediAlarm.user.eq(user), qMediAlarm.alarmDayStart.loe(today), qMediAlarm.alarmDayEnd.goe(today))
    			.orderBy(qMediAlarm.alarmId.asc())
    			.fetch();
		
		for(AlarmMainListGetRes item : alarmList) {
			int id = item.getAlarmId();
			List<String> mediList = query.select(qUserMedicine.umName)
					.from(qUserMedicine)
					.where(qUserMedicine.mediAlarm.alarmId.eq(id))
					.fetch();
			item.setMediList(mediList);
		}
		return alarmList;
	}

    
    
}
