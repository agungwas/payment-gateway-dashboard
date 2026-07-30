package seeders

import (
	"database/sql"
	"fmt"
	"math"
	"time"

	"github.com/brianvoe/gofakeit/v7"
)

func seedPayments(db *sql.DB) error {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM payments").Scan(&count)
	if err != nil {
		return err
	}

	if count > 0 {
		return nil
	}

	stmt, err := db.Prepare("INSERT INTO payments (id, merchant, amount, status, created_at) VALUES (?, ?, ?, ?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	statuses := []string{"completed", "processing", "failed"}

	for i := 1; i <= 50; i++ {
		id := i
		merchant := gofakeit.Company()
		amount := math.Round(gofakeit.Float64Range(10000.0, 1000000.0)*100) / 100
		status := statuses[gofakeit.Number(0, 2)]
		createdAt := gofakeit.DateRange(time.Now().AddDate(-1, 0, 0), time.Now()).Format(time.RFC3339)

		_, err := stmt.Exec(id, merchant, amount, status, createdAt)
		if err != nil {
			return fmt.Errorf("failed to seed payment %s: %v", id, err)
		}
	}

	return nil
}
