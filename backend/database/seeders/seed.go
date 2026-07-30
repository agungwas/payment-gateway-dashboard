package seeders

import "database/sql"

func Run(db *sql.DB) error {
	if err := seedUsers(db); err != nil {
		return err
	}
	if err := seedPayments(db); err != nil {
		return err
	}
	return nil
}
