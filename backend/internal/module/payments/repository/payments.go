package repository

import (
	"context"
	"database/sql"
	"strings"

	"github.com/durianpay/fullstack-boilerplate/internal/entity"
)

type PaymentsRepository interface {
	GetPayments(ctx context.Context, id, status, sort string) ([]entity.Payment, error)
}

type paymentsRepo struct {
	db *sql.DB
}

func NewPaymentsRepo(db *sql.DB) PaymentsRepository {
	return &paymentsRepo{db: db}
}

func (r *paymentsRepo) GetPayments(ctx context.Context, id, status, sort string) ([]entity.Payment, error) {
	query := "SELECT id, merchant, amount, status, created_at FROM payments WHERE 1=1"
	var args []interface{}

	if id != "" {
		query += " AND id = ?"
		args = append(args, id)
	}

	if status != "" {
		query += " AND status = ?"
		args = append(args, status)
	}

	if sort != "" {
		sorts := strings.Split(sort, ",")
		var orderBys []string
		for _, s := range sorts {
			s = strings.TrimSpace(s)
			if s == "" {
				continue
			}
			desc := false
			if strings.HasPrefix(s, "-") {
				desc = true
				s = s[1:]
			}

			if s == "amount" || s == "created_at" {
				if desc {
					orderBys = append(orderBys, s+" DESC")
				} else {
					orderBys = append(orderBys, s+" ASC")
				}
			}
		}
		if len(orderBys) > 0 {
			query += " ORDER BY " + strings.Join(orderBys, ", ")
		} else {
			query += " ORDER BY created_at DESC"
		}
	} else {
		query += " ORDER BY created_at DESC"
	}

	rows, err := r.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, entity.WrapError(err, entity.ErrorCodeInternal, "db error")
	}
	defer rows.Close()

	var payments []entity.Payment
	for rows.Next() {
		var p entity.Payment
		if err := rows.Scan(&p.ID, &p.Merchant, &p.Amount, &p.Status, &p.CreatedAt); err != nil {
			return nil, entity.WrapError(err, entity.ErrorCodeInternal, "db scan error")
		}
		payments = append(payments, p)
	}

	if err := rows.Err(); err != nil {
		return nil, entity.WrapError(err, entity.ErrorCodeInternal, "db rows error")
	}

	if payments == nil {
		payments = []entity.Payment{}
	}

	return payments, nil
}
