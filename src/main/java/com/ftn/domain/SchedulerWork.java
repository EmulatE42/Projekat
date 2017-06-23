package com.ftn.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.List;

/**
 * Created by Momir on 6/23/2017.
 */
@Entity
@Table(name = "scheduler_work")
public class SchedulerWork {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id" , unique = true, nullable = false)
    private Integer id;

    @Column(name = "userID" , unique = false, nullable = false)
    private Integer userID;

    @Column(name = "start" , unique = false, nullable = false)
    private String start;

    @Column(name = "end" , unique = false, nullable = false)
    private String end;

    @Column(name = "tables" , unique = false, nullable = false)
    @ElementCollection
    private List<Integer> tables;

    public SchedulerWork()
    {

    }

    public SchedulerWork(Integer userID, String start, String end, List<Integer> tables) {
        this.userID = userID;
        this.start = start;
        this.end = end;
        this.tables = tables;
    }

    public Integer getId() {
        return id;
    }

    public Integer getUserID() {
        return userID;
    }

    public List<Integer> getTables() {
        return tables;
    }

    public void ListId(Integer id) {
        this.id = id;
    }

    public void ListUserID(Integer userID) {
        this.userID = userID;
    }

    public void ListTables(List<Integer> tables) {
        this.tables = tables;
    }

    public String getStart() {
        return start;
    }

    public String getEnd() {
        return end;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public void setEnd(String end) {
        this.end = end;
    }
}
