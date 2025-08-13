create table users (
	user_id serial primary key,
	username varchar(50) unique not null,
	forename varchar(100) not null,
	surname varchar(100) not null,
	email varchar(100) unique not null
);

create table series (
	series_id serial primary key,
	title varchar(100) not null,
	description varchar(200)
);

create table books (
	book_id serial primary key,
	title varchar(100) not null,
	description varchar(200)
);

create table films (
	film_id serial primary key,
	title varchar(100) not null,
	description varchar(200)
);

create table games (
	game_id serial primary key,
	title varchar(100) not null,
	description varchar(200),
	platform varchar(50) not null
);

create table media_library (
	lib_id serial primary key,
	user_id int references users(user_id),
	media_type char(1) not null check(media_type in('s','b','f','g')),
	item_id int
);