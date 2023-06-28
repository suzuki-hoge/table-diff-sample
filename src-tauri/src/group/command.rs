use serde::{Deserialize, Serialize};

use crate::group;

#[derive(Serialize, Deserialize)]
pub struct GroupJson {
    id: usize,
    name: String,
    created: String,
    updated: String,
}

#[tauri::command]
pub fn group_all() -> Vec<GroupJson> {
    let groups = group::db::all();

    groups
        .iter()
        .map(|group| GroupJson {
            id: group.id,
            name: group.name.clone(),
            created: group.created.clone(),
            updated: group.updated.clone(),
        })
        .collect()
}

#[tauri::command]
pub fn group_create(name: String) {
    group::db::create(name);
}

#[tauri::command]
pub fn group_update(id: usize, name: String) {
    group::db::update(id, name);
}

#[tauri::command]
pub fn group_delete(id: usize) {
    group::db::delete(id);
}
