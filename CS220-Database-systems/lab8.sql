use lab_04;

# example code

# example 1
select distinct s.sname
from student s
where Exists (select * from enrolled e where s.snum = e.snum);

# example 2
select distinct s.sname
from student s
where s.snum in (select e.snum
from enrolled e);

# task 2
select fname as FacultyName from faculty f where not exists (select * from class c where c.fid = f.fid);

# task 3
select fname as FacultyName from faculty f where exists(select * from class c where c.fid = f.fid and c.room = 'R128');

# task 4
select s.snum, s.sname from student s where exists(select * from enrolled e where e.snum = s.snum 
and exists(select * from class c where e.cname = c.cname and exists(select * from faculty f where c.fid = f.fid and (f.fname = 'Ivana Teach' or f.fname = 'Linda Davis')
)));

# task 5

select s.snum, s.sname, (s.age) from student s where exists(select * from enrolled e where e.snum = s.snum and exists(select * from class c where e.cname = c.cname 
and exists(select * from faculty f where c.fid = f.fid and (f.fname = 'Ivana Teach'))));

# task 6

select fname as FacultyName from faculty f where not exists (select * from class c where c.fid = f.fid and c.cname = 'Database Systems');

# task 7??

select fname as FacultyName, f.deptid as Department from faculty f where exists(select * from class c where  c.fid = f.fid)
;








