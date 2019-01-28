use lab_04;

#task 1
create or replace view v1 as select fname from faculty where faculty.fid not in (select fid from class) with check option;
select * from v1;

#task 2 
create or replace view v2 as select student.sname as StudentName from student where student.snum in(select enrolled.snum from enrolled where enrolled.cname 
in(select class.cname from class where class.fid in(select faculty.fid from faculty where faculty.fname = 'Alen Bob'))) with check option;
select * from v2;
 
#task 3
create or replace view stdVu as select * from student with check option;

# task 4
alter table student add column course varchar(30);
#task 5
select * FROM stdVu;

# Even though base table has been updated, but since the view was created on the base table before the update, the attribute change is not reflected
# in the view 'stdVu'. The view continues to display only the old attributes, the new attribute/column course is not visible in the view.

# task 6
alter view v2 as select student.sname as StudentName from student where student.level = 'JR' and student.snum in(select enrolled.snum from enrolled where enrolled.cname 
in(select class.cname from class where class.fid in(select faculty.fid from faculty where faculty.fname = 'Ivana Teach'))) with check option;
select * from v2;

# task 7a
create or replace view CSstudents as select student.sname from student where student.major = 'Computer Science' with check option;
select * from CSstudents;

# task 7b
create or replace view JWClasses as select cname from class where 
class.fid in(select faculty.fid from faculty where faculty.fname = 'John Williams' and faculty.deptid = 68) with check option; 
select * from JWClasses;

#task 7c
create or replace view DBSAges as select distinct age from student where student.snum in(select enrolled.snum from enrolled where enrolled.cname = 'Database Systems')
order by(age) desc;
select * from DBSAges;

#task 7d
create or replace view CGteachers as select fname Christophers_teachers from faculty where fid in
(select class.fid from class where class.cname in(select enrolled.cname from enrolled
where enrolled.snum in(select student.snum from student where student.sname = 'Christopher Garcia'))) with check option;
select * from CGteachers;

#task 7e
create or replace view Davis_Students as select sname, snum from student where snum in(select enrolled.snum from enrolled where 
enrolled.cname in(select class.cname from class where class.fid in(select faculty.fid from faculty 
where (faculty.fname = 'Christopher Davis' or faculty.fname = 'Linda Davis')))) with check option;
select * from Davis_Students;

# task 8
drop view v1;
drop view v2;

# task 9a
update CSStudents set sname = 'Haris Riaz' where sname = 'Joseph Thompson';

# task 9b
delete from dbsages where age = 17;

# task 9c

insert into v2 values('Haris Riaz');


