package migrations

import (
	"database/sql"
)

func migratePayments(db *sql.DB) error {
	query := `
	CREATE TABLE IF NOT EXISTS payments (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		merchant TEXT NOT NULL,
		amount REAL NOT NULL,
		status TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);
	`
	_, err := db.Exec(query)
	if err != nil {
		return err
	}
	return nil
}
