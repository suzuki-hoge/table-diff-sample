use serde::{Deserialize, Serialize};

use crate::group;
use crate::group::types::Group;

#[derive(Serialize, Deserialize)]
pub struct GroupJson {
    pub id: usize,
    pub name: String,
}

#[tauri::command]
pub fn group_all() -> Vec<GroupJson> {
    let groups = group::db::all();

    groups
        .iter()
        .map(|group| GroupJson {
            id: group.id,
            name: group.name.clone(),
        })
        .collect()
}

#[tauri::command]
pub fn group_create(name: String) {
    group::db::create(name);
}

#[tauri::command]
pub fn group_update(id: usize, name: String) {
    let group = Group { id, name };

    group::db::update(group);
}

#[tauri::command]
pub fn group_delete(id: usize) {
    group::db::delete(id);
}
