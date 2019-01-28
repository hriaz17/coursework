create user Haris;
create user Tesla identified by 'root';
grant select, update on student to Tesla;
grant insert(snum,sname), delete on student to Haris;
use company;
grant select on dept to ''@'localhost' IDENTIFIED BY 'PASSWORD' WITH GRANT OPTION;
create user Manager identified by 'root';
create user Director identified by 'root';
grant select,update(sal) on emp to Manager, Director;
grant all privileges on emp to Director with grant option;
show databases;
select user from mysql.user;
use mysql;
show tables;
use university;
revoke update on student from Tesla;
create user u1 identified by 'abc';
select user from mysql.user;
use company;
create  view myView as select empno from emp;
grant select on myView to u1;
grant select,update(ename) on emp to u1;
show grants for u1;
create user u3 identified by 'root';
show grants for u3;
grant select on emp to u3;
GRANT ALL PRIVILEGES ON * . * TO u3; # GLOBAL PRIVILIGE
grant select on dept TO ''@'localhost'; # V.V. IMP
SHOW GRANTS for ''@'localhost'; 
grant all on company.* to Tesla;
show grants for Tesla;

#task 2
create table customer(customer_id INT(7) primary key,
fname varchar(30), lname varchar (30), email varchar(50), 
address varchar(200), create_date DATE, last_update time);

create table orders(order_id INT(5) primary key,
customer_id INT(7), order_details varchar(200), date_order_placed DATE, 
date_order_paid DATE, total_price INT(5));

alter table orders add constraint fk1 foreign key(customer_id) references customer(customer_id); 

create user asad identified by 'root';
create user sofia identified by 'root';
grant select, update(address), delete on customer to asad;
grant select, update(address), delete on customer to sofia with grant option;
grant select, insert, update on orders to asad;
show grants for asad;
show grants for sofia;

# task3
create user John identified by 'root';
create user Smith identified by 'root';
# assigning global & database level privileges to all John and Smith
grant all on  * . * to John;
grant all on  * . * to Smith;
show grants for John;
show grants for Smith;
# assigning select privilege to both users for all tables of a database
grant select on company.* to John;
grant select on company.* to Smith;
show grants for John;
show grants for Smith;
# revoking a few privileges
revoke select on company.* from John;
revoke all on * . * from Smith;
show grants for John;
show grants for Smith;
 