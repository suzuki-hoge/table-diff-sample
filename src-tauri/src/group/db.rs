use itertools::Itertools;
use mysql::{from_row, Conn, Opts, OptsBuilder};
use r2d2::ManageConnection;
use r2d2_mysql::MysqlConnectionManager;

use crate::group::types::Group;

pub fn all() -> Vec<Group> {
    let mut conn = create_connection();

    conn.query("select id, name from `groups` where delete_at is null order by id")
        .map(|result| {
            result
                .map(|x| x.unwrap())
                .map(|row| {
                    let (id, name) = from_row::<(usize, String)>(row);
                    Group { id, name }
                })
                .collect_vec()
        })
        .unwrap()
}

pub fn create(name: String) {
    let mut conn = create_connection();

    conn.prep_exec("insert into `groups` (name) values (?)", vec![&name])
        .unwrap();
}

pub fn update(group: Group) {
    let mut conn = create_connection();

    conn.prep_exec(
        "update `groups` set name = ?, update_at = now() where id = ?",
        (&group.name, &group.id),
    )
    .unwrap();
}

pub fn delete(id: usize) {
    let mut conn = create_connection();

    conn.prep_exec(
        "update `groups` set delete_at = now() where id = ?",
        vec![&id],
    )
    .unwrap();

    conn.prep_exec(
        "delete from relations where group_id = ?",
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
