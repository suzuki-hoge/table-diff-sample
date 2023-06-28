use serde::{Deserialize, Serialize};

use crate::user;

#[derive(Serialize, Deserialize)]
pub struct UserJson {
    id: usize,
    name: String,
    role: String,
    created: String,
    updated: String,
}

#[tauri::command]
pub fn user_all() -> Vec<UserJson> {
    let users = user::db::all();

    users
        .iter()
        .map(|user| UserJson {
            id: user.id,
            name: user.name.clone(),
            role: user.role.clone().unwrap_or(String::new()),
            created: user.created.clone(),
            updated: user.updated.clone(),
        })
        .collect()
}

#[tauri::command]
pub fn user_create(name: String, role: String) {
    user::db::create(name, if role.is_empty() { None } else { Some(role) });
}

#[tauri::command]
pub fn user_update(id: usize, name: String, role: String) {
    user::db::update(id, name, if role.is_empty() { None } else { Some(role) });
}

#[tauri::command]
pub fn user_delete(id: usize) {
    user::db::delete(id);
}
