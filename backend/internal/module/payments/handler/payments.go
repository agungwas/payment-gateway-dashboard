package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/durianpay/fullstack-boilerplate/internal/entity"
	"github.com/durianpay/fullstack-boilerplate/internal/module/payments/usecase"
	"github.com/durianpay/fullstack-boilerplate/internal/openapigen"
	"github.com/durianpay/fullstack-boilerplate/internal/transport"
)

type PaymentsHandler struct {
	uc usecase.PaymentsUsecase
}

func NewPaymentsHandler(uc usecase.PaymentsUsecase) *PaymentsHandler {
	return &PaymentsHandler{
		uc: uc,
	}
}

func (h *PaymentsHandler) GetDashboardV1Payments(w http.ResponseWriter, r *http.Request, params openapigen.GetDashboardV1PaymentsParams) {
	ctx := r.Context()

	var id, status, sort string
	if params.Id != nil {
		id = *params.Id
	}
	if params.Status != nil {
		status = *params.Status
	}
	if params.Sort != nil {
		sort = *params.Sort
	}

	payments, err := h.uc.FetchPayments(ctx, id, status, sort)
	if err != nil {
		transport.WriteError(w, err)
		return
	}

	var res []openapigen.Payment
	for _, p := range payments {
		pCopy := p
		amountStr := fmt.Sprintf("%.2f", pCopy.Amount)
		idStr := fmt.Sprintf("%d", pCopy.ID)

		res = append(res, openapigen.Payment{
			Id:        &idStr,
			Merchant:  &pCopy.Merchant,
			Amount:    &amountStr,
			Status:    &pCopy.Status,
			CreatedAt: &pCopy.CreatedAt,
		})
	}

	if res == nil {
		res = []openapigen.Payment{}
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(openapigen.PaymentListResponse{
		Payments: &res,
	})
	if err != nil {
		transport.WriteAppError(w, entity.ErrorInternal("internal server error"))
		return
	}
}
