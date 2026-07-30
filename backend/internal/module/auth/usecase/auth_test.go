package usecase

import (
	"testing"
	"time"

	"github.com/durianpay/fullstack-boilerplate/internal/entity"
	"golang.org/x/crypto/bcrypt"
)

type mockUserRepository struct {
	user *entity.User
	err  error
}

func (m *mockUserRepository) GetUserByEmail(email string) (*entity.User, error) {
	return m.user, m.err
}

func TestAuthUsecase_Login(t *testing.T) {
	jwtSecret := []byte("secret")
	ttl := 1 * time.Hour

	// Create a valid bcrypt hash for testing
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("password123"), bcrypt.DefaultCost)
	
	validUser := &entity.User{
		ID:           "user-1",
		Email:        "test@example.com",
		PasswordHash: string(hashedPassword),
		Role:         "cs",
	}

	tests := []struct {
		name          string
		email         string
		password      string
		mockUser      *entity.User
		mockErr       error
		expectToken   bool
		expectErr     bool
		expectedErrCode entity.Code
	}{
		{
			name:          "success",
			email:         "test@example.com",
			password:      "password123",
			mockUser:      validUser,
			mockErr:       nil,
			expectToken:   true,
			expectErr:     false,
		},
		{
			name:          "user not found",
			email:         "notfound@example.com",
			password:      "password123",
			mockUser:      nil,
			mockErr:       entity.ErrorNotFound("user not found"),
			expectToken:   false,
			expectErr:     true,
			expectedErrCode: entity.ErrorCodeNotFound,
		},
		{
			name:          "invalid credentials",
			email:         "test@example.com",
			password:      "wrongpassword",
			mockUser:      validUser,
			mockErr:       nil,
			expectToken:   false,
			expectErr:     true,
			expectedErrCode: entity.ErrorCodeUnauthorized,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			repo := &mockUserRepository{user: tt.mockUser, err: tt.mockErr}
			uc := NewAuthUsecase(repo, jwtSecret, ttl)

			token, user, err := uc.Login(tt.email, tt.password)

			if tt.expectErr {
				if err == nil {
					t.Fatalf("expected error, got nil")
				}
				appErr, ok := err.(*entity.AppError)
				if !ok {
					t.Fatalf("expected entity.AppError, got %T", err)
				}
				if appErr.Code != tt.expectedErrCode {
					t.Errorf("expected error code %s, got %s", tt.expectedErrCode, appErr.Code)
				}
			} else {
				if err != nil {
					t.Fatalf("expected no error, got %v", err)
				}
				if !tt.expectToken || token == "" {
					t.Errorf("expected a valid token")
				}
				if user == nil || user.ID != validUser.ID {
					t.Errorf("expected returned user to match mock")
				}
			}
		})
	}
}
