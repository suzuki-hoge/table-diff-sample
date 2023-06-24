use itertools::Itertools;
use mysql::{from_row, Conn, Opts, OptsBuilder};
use r2d2::ManageConnection;
use r2d2_mysql::MysqlConnectionManager;

use crate::group::types::Group;
use crate::user::types::User;
use crate::{group, user};

pub fn find(group_id: usize) -> (Group, Vec<(User, bool)>) {
    let mut conn = create_connection();

    let groups = group::db::all();
    let group = groups
        .iter()
        .filter(|group| group.id == group_id)
        .collect_vec()[0];

    let all_users = user::db::all();

    let joined_user_ids: Vec<usize> = conn
        .query(format!(
            "select user_id from relations where group_id = {group_id} order by user_id"
        ))
        .map(|result| {
            result
                .map(|x| x.unwrap())
                .map(|row| {
                    
                    from_row::<usize>(row)
                })
                .collect_vec()
        })
        .unwrap();

    (
        group.clone(),
        all_users
            .iter()
            .map(|user| (user.clone(), joined_user_ids.contains(&user.id)))
            .collect_vec(),
    )
}

pub fn update(group_id: usize, user_ids: Vec<usize>) {
    let mut conn = create_connection();

    conn.prep_exec("delete from relations where group_id = ?", vec![&group_id])
        .unwrap();

    for user_id in user_ids {
        conn.prep_exec(
            "insert into relations (group_id, user_id) values (?, ?)",
            (&group_id, &user_id),
        )
        .unwrap();
    }
}

fn create_connection() -> Conn {
    let url = "mysql://user:password@127.0.0.1:19000/table-diff-sample";
    let opt = Opts::from_url(url).unwrap();
    let builder = OptsBuilder::from_opts(opt);
    let manager = MysqlConnectionManager::new(builder);
    manager.connect().unwrap()
}
