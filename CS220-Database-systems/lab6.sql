use sakila;
create table users(
id int(5) primary key,
name varchar(30),
course_id int(3));

create table courses(
course_id int(3) primary key,
cname varchar(20));

#practice task1
alter table users add constraint fk1 foreign key(course_id) references courses(course_id);
select u.id, u.name, u.course_id from users u natural join courses c;

#practice task2
select * from users left join courses using(course_id);

#practice task3
select * from users u left outer join courses c using(course_id)
union 
select * from users right join courses using(course_id);


#practice task4
select r.rental_date, return_date
from rental r join inventory i 
using (inventory_id) join film f
on (f.film_id=i.film_id)
where f.title like 'BREAKING HOME' ;

#practice task5
select f.title 
from film f left join inventory i 
using (film_id) left join rental r 
using (inventory_id) 
where (i.inventory_id is null or r.rental_id is null);

#task1
select film.title, category.name as Category from film join film_category using(film_id) join category using(category_id) where film.title = 'Chocolate Duck';

#task2

select staff.first_name as Name, city.city as City, country.country as Country from staff join address using(address_id) join city using(city_id) join country using(country_id) where staff.first_name = 'Jon';
 
#task3

select actor.first_name, actor.last_name from actor join film_actor using(actor_id) join film using(film_id) where film.title = 'Alone Trip';

#task4

select title as MovieName from film join film_category using(film_id) join category using(category_id) where category.name = 'Games' and film.rental_rate > 4
order by title asc;

#task5

#select customer.email from customer join rental using(customer_id) join inventory using(inventory_id) 
# store using(store_id) join inventory using(store_id) join film using(film_id) join
# rental using(customer_id) join payment using(rental_id) where payment.payment_id = NULL;
 
#task6




 