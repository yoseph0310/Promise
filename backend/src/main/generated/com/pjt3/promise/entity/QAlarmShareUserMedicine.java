package com.pjt3.promise.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAlarmShareUserMedicine is a Querydsl query type for AlarmShareUserMedicine
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAlarmShareUserMedicine extends EntityPathBase<AlarmShareUserMedicine> {

    private static final long serialVersionUID = 477565283L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAlarmShareUserMedicine alarmShareUserMedicine = new QAlarmShareUserMedicine("alarmShareUserMedicine");

    public final QAlarmShare alarmShare;

    public final StringPath asumName = createString("asumName");

    public final NumberPath<Integer> asunId = createNumber("asunId", Integer.class);

    public final QMedicine medicine;

    public QAlarmShareUserMedicine(String variable) {
        this(AlarmShareUserMedicine.class, forVariable(variable), INITS);
    }

    public QAlarmShareUserMedicine(Path<? extends AlarmShareUserMedicine> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAlarmShareUserMedicine(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAlarmShareUserMedicine(PathMetadata metadata, PathInits inits) {
        this(AlarmShareUserMedicine.class, metadata, inits);
    }

    public QAlarmShareUserMedicine(Class<? extends AlarmShareUserMedicine> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.alarmShare = inits.isInitialized("alarmShare") ? new QAlarmShare(forProperty("alarmShare"), inits.get("alarmShare")) : null;
        this.medicine = inits.isInitialized("medicine") ? new QMedicine(forProperty("medicine")) : null;
    }

}

