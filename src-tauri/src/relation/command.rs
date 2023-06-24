use itertools::Itertools;
use serde::{Deserialize, Serialize};

use crate::group::command::GroupJson;
use crate::relation;
use crate::user::command::UserJson;

#[derive(Serialize, Deserialize)]
pub struct RelationJson {
    group: GroupJson,
    users: Vec<UserJson2>,
}

#[derive(Serialize, Deserialize)]
pub struct UserJson2 {
    user: UserJson,
    joined: bool,
}

#[tauri::command]
pub fn relation_find(id: usize) -> RelationJson {
    let (group, users) = relation::db::find(id);
    RelationJson {
        group: GroupJson {
            id: group.id,
            name: group.name,
        },
        users: users
            .into_iter()
            .map(|(user, joined)| UserJson2 {
                user: UserJson {
                    id: user.id,
                    name: user.name,
                    option_code: String::new(),
                },
                joined,
            })
            .collect_vec(),
    }
}

#[tauri::command]
pub fn relation_update(id: usize, users: Vec<usize>) {
    relation::db::update(id, users);
}
