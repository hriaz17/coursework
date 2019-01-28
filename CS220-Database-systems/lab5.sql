select deptno, SUM(sal) as TotalSalary from emp group by deptno;
select deptno, COUNT(*) as NumEmployees from emp where sal > 1000 group by deptno;
select deptno, MAX(sal) as HighestSalary from emp group by deptno;
select deptno, SUM(sal) as TotalSales from emp group by deptno having sum(sal) > 9000;
select dname, COUNT(*) from dept, emp where dept.deptno = emp.deptno and emp.sal > 2000 group by dname;

