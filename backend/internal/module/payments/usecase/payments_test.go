package usecase

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/durianpay/fullstack-boilerplate/internal/entity"
)

type mockPaymentsRepository struct {
	payments []entity.Payment
	err      error
}

func (m *mockPaymentsRepository) GetPayments(ctx context.Context, id, status, sort string) ([]entity.Payment, error) {
	return m.payments, m.err
}

func TestPaymentsUsecase_FetchPayments(t *testing.T) {
	now := time.Now()
	mockPaymentsList := []entity.Payment{
		{
			ID:        1,
			Merchant:  "Test Merchant",
			CreatedAt: now,
			Amount:    100.50,
			Status:    "completed",
		},
		{
			ID:        2,
			Merchant:  "Test Merchant 2",
			CreatedAt: now,
			Amount:    200.75,
			Status:    "processing",
		},
	}

	tests := []struct {
		name           string
		id             string
		status         string
		sort           string
		mockPayments   []entity.Payment
		mockErr        error
		expectErr      bool
		expectedLength int
	}{
		{
			name:           "success fetch all",
			id:             "",
			status:         "",
			sort:           "",
			mockPayments:   mockPaymentsList,
			mockErr:        nil,
			expectErr:      false,
			expectedLength: 2,
		},
		{
			name:           "repository error",
			id:             "",
			status:         "",
			sort:           "",
			mockPayments:   nil,
			mockErr:        errors.New("db connection failed"),
			expectErr:      true,
			expectedLength: 0,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			repo := &mockPaymentsRepository{payments: tt.mockPayments, err: tt.mockErr}
			uc := NewPaymentsUsecase(repo)

			result, err := uc.FetchPayments(context.Background(), tt.id, tt.status, tt.sort)

			if tt.expectErr {
				if err == nil {
					t.Fatalf("expected error, got nil")
				}
				if err.Error() != tt.mockErr.Error() {
					t.Errorf("expected error %v, got %v", tt.mockErr, err)
				}
			} else {
				if err != nil {
					t.Fatalf("expected no error, got %v", err)
				}
				if len(result) != tt.expectedLength {
					t.Errorf("expected %d payments, got %d", tt.expectedLength, len(result))
				}
			}
		})
	}
}
