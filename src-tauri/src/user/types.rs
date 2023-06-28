#[derive(Clone)]
pub struct User {
    pub id: usize,
    pub name: String,
    pub role: Option<String>,
    pub created: String,
    pub updated: String,
}
