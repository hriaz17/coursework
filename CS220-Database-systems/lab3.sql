#task 1

create schema university;
use university;

create table Student(snum integer,sname char(30),major char(25),level char(2),
constraint pkconstraint PRIMARY KEY(snum));

create table Faculty(fid integer PRIMARY KEY, fname char(30), deptid integer);

create table Class(cname char(40) PRIMARY KEY, meets_at char(20), room char(10), fid integer, 
constraint fkconstraint FOREIGN KEY(fid) references Faculty(fid) on delete cascade on update cascade);


create table Enrolled(snum integer, cname char(40), PRIMARY KEY(snum,cname), 
constraint fk1 foreign key(snum) references Student(snum) on delete cascade on update cascade,
constraint fk2 foreign key(cname) references Class(cname) on delete cascade on update cascade);

#task2
alter table Student add age integer;

#task3
alter table Student modify column sname varchar(30);

alter table Faculty modify column fname varchar(30);

alter table Enrolled drop foreign key fk2;

alter table Enrolled modify column cname varchar(40);

alter table Class modify column cname varchar(40);

alter table Enrolled add constraint fk2 foreign key(cname) references Class(cname) on delete cascade on update cascade;

#task4
alter table Faculty modify deptid integer NOT NULL;

