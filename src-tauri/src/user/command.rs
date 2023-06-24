use serde::{Deserialize, Serialize};

use crate::user;
use crate::user::types::User;

#[derive(Serialize, Deserialize)]
pub struct UserJson {
    pub id: usize,
    pub name: String,
    pub option_code: String,
}

#[tauri::command]
pub fn user_all() -> Vec<UserJson> {
    let users = user::db::all();

    users
        .iter()
        .map(|user| UserJson {
            id: user.id,
            name: user.name.clone(),
            option_code: user.option_code.clone().unwrap_or_default(),
        })
        .collect()
}

#[tauri::command]
pub fn user_create(name: String, option: String) {
    user::db::create(
        name,
        if option.is_empty() {
            None
        } else {
            Some(option)
        },
    );
}

#[tauri::command]
pub fn user_update(id: usize, name: String, option: String) {
    let user = User {
        id,
        name,
        option_code: if option.is_empty() {
            None
        } else {
            Some(option)
        },
    };

    user::db::update(user);
}

#[tauri::command]
pub fn user_delete(id: usize) {
    user::db::delete(id);
}
