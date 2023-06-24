use itertools::Itertools;
use mysql::{from_row, Conn, Opts, OptsBuilder};
use r2d2::ManageConnection;
use r2d2_mysql::MysqlConnectionManager;

use crate::user::types::User;

pub fn all() -> Vec<User> {
    let mut conn = create_connection();

    conn.query("select id, name, option_code from users where delete_at is null order by id")
        .map(|result| {
            result
                .map(|x| x.unwrap())
                .map(|row| {
                    let (id, name, option_code) = from_row::<(usize, String, Option<String>)>(row);
                    User {
                        id,
                        name,
                        option_code,
                    }
                })
                .collect_vec()
        })
        .unwrap()
}

pub fn create(name: String, option_code: Option<String>) {
    let mut conn = create_connection();

    conn.prep_exec(
        "insert into users (name, option_code) values (?, ?)",
        (&name, &option_code),
    )
    .unwrap();
}

pub fn update(user: User) {
    let mut conn = create_connection();

    conn.prep_exec(
        "update users set name = ?, option_code = ?, update_at = now() where id = ?",
        (&user.name, &user.option_code, &user.id),
    )
    .unwrap();
}

pub fn delete(id: usize) {
    let mut conn = create_connection();

    conn.prep_exec("update users set delete_at = now() where id = ?", vec![&id])
        .unwrap();

    conn.prep_exec(
        "delete from relations where user_id = ?",
        vec![&id],
    )
        .unwrap();
}

fn create_connection() -> Conn {
    let url = "mysql://user:password@127.0.0.1:19000/table-diff-sample";
    let opt = Opts::from_url(url).unwrap();
    let builder = OptsBuilder::from_opts(opt);
    let manager = MysqlConnectionManager::new(builder);
    manager.connect().unwrap()
}
