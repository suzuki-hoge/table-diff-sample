mod group;
mod relation;
mod user;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            group::command::group_all,
            group::command::group_create,
            group::command::group_update,
            group::command::group_delete,
            user::command::user_all,
            user::command::user_create,
            user::command::user_update,
            user::command::user_delete,
            relation::command::relation_find,
            relation::command::relation_update,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
