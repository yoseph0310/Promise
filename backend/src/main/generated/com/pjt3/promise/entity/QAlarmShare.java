package com.pjt3.promise.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAlarmShare is a Querydsl query type for AlarmShare
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAlarmShare extends EntityPathBase<AlarmShare> {

    private static final long serialVersionUID = 914673438L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAlarmShare alarmShare = new QAlarmShare("alarmShare");

    public final StringPath alarmDayEnd = createString("alarmDayEnd");

    public final StringPath alarmDayStart = createString("alarmDayStart");

    public final ListPath<AlarmShareUserMedicine, QAlarmShareUserMedicine> alarmShareUserMedicine = this.<AlarmShareUserMedicine, QAlarmShareUserMedicine>createList("alarmShareUserMedicine", AlarmShareUserMedicine.class, QAlarmShareUserMedicine.class, PathInits.DIRECT2);

    public final StringPath alarmTime1 = createString("alarmTime1");

    public final StringPath alarmTime2 = createString("alarmTime2");

    public final StringPath alarmTime3 = createString("alarmTime3");

    public final StringPath alarmTitle = createString("alarmTitle");

    public final NumberPath<Integer> alarmYN = createNumber("alarmYN", Integer.class);

    public final NumberPath<Integer> asId = createNumber("asId", Integer.class);

    public final QUser sendUser;

    public final QUser user;

    public QAlarmShare(String variable) {
        this(AlarmShare.class, forVariable(variable), INITS);
    }

    public QAlarmShare(Path<? extends AlarmShare> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAlarmShare(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAlarmShare(PathMetadata metadata, PathInits inits) {
        this(AlarmShare.class, metadata, inits);
    }

    public QAlarmShare(Class<? extends AlarmShare> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.sendUser = inits.isInitialized("sendUser") ? new QUser(forProperty("sendUser"), inits.get("sendUser")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

