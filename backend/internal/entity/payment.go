package entity

import "time"

type Payment struct {
	ID        int       `json:"id"`
	Merchant  string    `json:"merchant"`
	Amount    float64   `json:"amount"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}
