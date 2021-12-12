package com.pjt3.promise.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pjt3.promise.entity.AlarmShare;
import com.pjt3.promise.entity.AlarmShareUserMedicine;

@Repository
public interface AlarmShareUserMedicineRepository extends JpaRepository<AlarmShareUserMedicine, Integer>{
	List<AlarmShareUserMedicine> findByAlarmShare(AlarmShare alarmShare);

}
