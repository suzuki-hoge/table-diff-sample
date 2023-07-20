create table `groups`
(
    id      int auto_increment,
    name    char(32) not null,
    created datetime default current_timestamp,
    updated datetime default current_timestamp,
    deleted datetime default null,
    primary key (id)
);

create table users
(
    id      int auto_increment,
    name    char(32) not null,
    role    char(32) default null,
    created datetime default current_timestamp,
    updated datetime default current_timestamp,
    deleted datetime default null,
    primary key (id)
);

create table relations
(
    group_id int,
    user_id  int,
    primary key (group_id, user_id)
);

create table logs
(
    action char(32),
    created  datetime default current_timestamp
);

-- test data

insert into `groups` (id, name)
values (1, 'Developers');
insert into `groups` (id, name)
values (2, 'Designers');

insert into users (id, name, role)
values (1, 'John', 'Leader');
insert into users (id, name, role)
values (2, 'Isabella', null);
insert into users (id, name, role)
values (3, 'Emma', 'Leader');
insert into users (id, name, role)
values (4, 'Olivia', null);
insert into users (id, name, role)
values (5, 'Logan', 'Observer');

insert into relations (group_id, user_id)
values (1, 1); -- Developers - John
insert into relations (group_id, user_id)
values (1, 2); -- Developers - Isabella
insert into relations (group_id, user_id)
values (2, 3); -- Designers - Emma
insert into relations (group_id, user_id)
values (2, 4); -- Designers - Olivia
insert into relations (group_id, user_id)
values (2, 5); -- Designers - Logan
