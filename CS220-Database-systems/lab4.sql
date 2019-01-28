#task 1
create database BANK;

use BANK;

create table branch(
branch_name varchar(100) unique,
branch_city varchar(50) not null,
assets varchar(100),
primary key(branch_name));

create table customer(
customer_name varchar(100),
customer_street varchar(100),
customer_city varchar(50),
primary key(customer_name));

create table loan(
loan_number integer(10),
branch_name varchar(100) unique,
amount integer(9),
primary key(loan_number));

create table borrower(
customer_name varchar(100),
loan_number integer(10),
primary key(customer_name, loan_number)
);

create table account(
account_number integer(10),
branch_name varchar(100) unique,
balance integer(9),
primary key(account_number));

create table depositor(
customer_name varchar(100),
account_number integer(10),
primary key(customer_name, account_number));

#task 2a
insert into branch values('HBL','Islamabad','50 Billion PKR'), ('HBL','Lahore','97 Billion PKR');

insert into customer values('John Smith','Kashmir Highway','Islamabad'),('M Yasin','University Blvd','Islamabad');

insert into loan values(1888934590,'HBL',40000),(1000453211,'HBL',85000);

insert into borrower values('John Smith', 1888934590),('M Yasin',1000453211);

insert into account values(1198734562,'HBL', 876000), (1085432110,'HBL',125000);

insert into depositor values('Raja Hasnain',1198734562),('Kamran Janjua',0009854332);

#task 2b
insert into branch values(null,null,188000);

insert into borrower values('John Smith', 'ABCDXYZ');

insert into depositor values(null,null);


#task 2c
update branch
set branch_name = 'HBL NUST' where branch_name = 'HBL';

update customer set customer_city = 'Lahore' where customer_name = 'M Yasin';

update account set balance = 50000 where account_number = 1198734562;

#task 2d

#??

#task 3a
alter table loan add constraint loan_branch_fk foreign key(branch_name) references branch(branch_name);

#lter table borrower drop primary key;
#alter table borrower  modify column customer_name varchar(100), modify column loan_number integer(10);
 
alter table borrower add constraint borrow_customer_fk foreign key(customer_name) references customer(customer_name), 
add constraint borrow_loan_fk foreign key(loan_number) references loan(loan_number);

alter table account add constraint account_branch_fk foreign key(branch_name) references branch(branch_name);

alter table depositor add constraint depositor_customer_fk foreign key(customer_name) references customer(customer_name),
add constraint depositor_account_fk foreign key(account_number) references account(account_number);


#task 3b


#task4
alter table depositor add column deposit_date DATE;




