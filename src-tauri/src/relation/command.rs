use itertools::Itertools;
use serde::{Deserialize, Serialize};

use crate::relation;

#[derive(Serialize, Deserialize)]
pub struct RelationJson {
    group: RelationGroupJson,
    users: Vec<RelationUserJson>,
}

#[derive(Serialize, Deserialize)]
struct RelationGroupJson {
    id: usize,
    name: String,
}

#[derive(Serialize, Deserialize)]
struct RelationUserJson {
    id: usize,
    name: String,
    role: String,
    joined: bool,
}

#[tauri::command]
pub fn relation_find(id: usize) -> RelationJson {
    let (group, users) = relation::db::find(id);
    RelationJson {
        group: RelationGroupJson {
            id: group.id,
            name: group.name,
        },
        users: users
            .into_iter()
            .map(|(user, joined)| RelationUserJson {
                id: user.id,
                name: user.name,
                role: user.role.unwrap_or(String::new()),
                joined,
            })
            .collect_vec(),
    }
}

#[tauri::command]
pub fn relation_update(id: usize, users: Vec<usize>) {
    relation::db::update(id, users);
}
