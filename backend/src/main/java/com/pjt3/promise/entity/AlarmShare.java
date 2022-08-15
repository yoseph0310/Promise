package com.pjt3.promise.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@Table(name="Alarm_Share")
public class AlarmShare {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="as_id")
    int asId;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="user_email")
    User user;
    
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="send_user_email")
    User sendUser;
    
    @Column(name="alarm_title")
    String alarmTitle;

    @Column(name="alarm_YN")
    int alarmYN;

    @Column(name="alarm_time1")
    String alarmTime1;
    
    @Column(name="alarm_time2")
    String alarmTime2;
    
    @Column(name="alarm_time3")
    String alarmTime3;

    @Column(name="alarm_day_start")
    String alarmDayStart;

    @Column(name="alarm_day_end")
    String alarmDayEnd;
    
    @JsonManagedReference
    @OneToMany(mappedBy="alarmShare")
    List<AlarmShareUserMedicine> alarmShareUserMedicine = new ArrayList<AlarmShareUserMedicine>();
    
}
