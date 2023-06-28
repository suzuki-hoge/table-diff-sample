use itertools::Itertools;
use mysql::{from_row, Conn, Opts, OptsBuilder};
use r2d2::ManageConnection;
use r2d2_mysql::MysqlConnectionManager;

use crate::user::types::User;

pub fn all() -> Vec<User> {
    let mut conn = create_connection();

    conn.query(
        "select id, name, role, created, updated from users where deleted is null order by id",
    )
    .map(|result| {
        result
            .map(|x| x.unwrap())
            .map(|row| {
                let (id, name, role, created, updated) =
                    from_row::<(usize, String, Option<String>, String, String)>(row);
                User {
                    id,
                    name,
                    role,
                    created,
                    updated,
                }
            })
            .collect_vec()
    })
    .unwrap()
}

pub fn create(name: String, role: Option<String>) {
    let mut conn = create_connection();

    conn.prep_exec(
        "insert into users (name, role) values (?, ?)",
        (&name, &role),
    )
    .unwrap();
}

pub fn update(id: usize, name: String, role: Option<String>) {
    let mut conn = create_connection();

    conn.prep_exec(
        "update users set name = ?, role = ?, updated = now() where id = ?",
        (&name, &role, &id),
    )
    .unwrap();
}

pub fn delete(id: usize) {
    let mut conn = create_connection();

    conn.prep_exec("update users set deleted = now() where id = ?", vec![&id])
        .unwrap();

    conn.prep_exec("delete from relations where user_id = ?", vec![&id])
        .unwrap();
}

fn create_connection() -> Conn {
    let url = "mysql://user:password@127.0.0.1:20000/table-diff-sample";
    let opt = Opts::from_url(url).unwrap();
    let builder = OptsBuilder::from_opts(opt);
    let manager = MysqlConnectionManager::new(builder);
    manager.connect().unwrap()
}
