package migrations

import "database/sql"

func Run(db *sql.DB) error {
	if err := migrateUsers(db); err != nil {
		return err
	}
	if err := migratePayments(db); err != nil {
		return err
	}
	return nil
}
