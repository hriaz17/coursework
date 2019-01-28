#task1
select first_name,last_name from actor where (actor_id >= 50 AND actor_id <=150) 
or (last_name like 'A%');

#task2
select (concat_ws(', ',customer.last_name,substring(customer.first_name,1,1))) as CustomerName from customer;
#task3
select (concat(title,' was released in the year 2006')) as FilmDetails from film
where release_year = 2006;

#task4
select staff.username,staff.address_id from staff,customer where staff.staff_id = customer.customer_id;

#task5
select amount from payment where payment_date like '2005-08-%' order by amount desc;

#task6
select first_name,last_name from actor where (first_name like 'A%' and last_name like '%A');

#task7
select * from language where (name != 'English' AND name != 'French');

#task8
select count(film_id) as NumberOfFilms from film;

#task9
#query 1:
select substring(title, 5) as BrokenFilmTitles from film where film.rental_duration = 6;

#query 2:
select substring(country FROM 3 FOR 3) as BrokenCountryName from country where country_id > 50;

#query 3:
select substring_index(payment_date,'-',2) as BrokenPaymentDate from payment;

#query 4:
select substring(city,-2,2) as LastTwoCityCharacters from city;

