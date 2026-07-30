package usecase

import (
	"context"

	"github.com/durianpay/fullstack-boilerplate/internal/entity"
	"github.com/durianpay/fullstack-boilerplate/internal/module/payments/repository"
)

type PaymentsUsecase interface {
	FetchPayments(ctx context.Context, id, status, sort string) ([]entity.Payment, error)
}

type paymentsUC struct {
	repo repository.PaymentsRepository
}

func NewPaymentsUsecase(repo repository.PaymentsRepository) PaymentsUsecase {
	return &paymentsUC{repo: repo}
}

func (u *paymentsUC) FetchPayments(ctx context.Context, id, status, sort string) ([]entity.Payment, error) {
	return u.repo.GetPayments(ctx, id, status, sort)
}
