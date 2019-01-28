use lab_04;
#practice tasks
#task 1
select distinct faculty.fname from faculty where faculty.fid not in (select class.fid from class);
select distinct f.fname from faculty f where not exists (select c.fid from class c where f.fid = c.fid);

#task 2
select student.sname from student where snum in(select snum from enrolled, class, faculty where enrolled.cname = class.cname and class.fid = faculty.fid and faculty.fname = 'Ivana Teach');
Select s.sname From student s where s.snum in (Select E.snum From class C, enrolled E, faculty F Where E.cname = C. cname and C.fid = F.fid and f.fname = 'Ivana Teach');

#task 3

select distinct sname from student where student.snum in(select e1.snum from enrolled e1, enrolled e2, class c1, class c2 where e1.snum = e2.snum and e1.cname <> e2.cname
and e1.cname = c1.cname and e2.cname = c2.cname and c1.meets_at = c2.meets_at);

#task 4 

select distinct s.sname
from student s where Exists (select * from enrolled e where s.snum = e.snum);

 