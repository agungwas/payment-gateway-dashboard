package migrations

import "database/sql"

func migrateUsers(db *sql.DB) error {
	query := `CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email TEXT NOT NULL UNIQUE,
		password_hash TEXT NOT NULL,
		role TEXT NOT NULL
	);`
	_, err := db.Exec(query)
	return err
}
