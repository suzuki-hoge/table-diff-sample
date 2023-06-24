create table `groups`
(
    id        int auto_increment,
    name      char(32) not null,
    create_at datetime default current_timestamp,
    update_at datetime default current_timestamp,
    delete_at datetime default null,
    primary key (id)
);

create table users
(
    id          int auto_increment,
    name        char(32) not null,
    option_code char(32) default null,
    create_at   datetime    default current_timestamp,
    update_at   datetime    default current_timestamp,
    delete_at   datetime    default null,
    primary key (id)
);

create table relations
(
    group_id  int,
    user_id   int,
    create_at datetime default current_timestamp,
    primary key (group_id, user_id)
);
