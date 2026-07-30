.PHONY: help fe-install fe fe-build be-install be docker-up docker-down docker-build-be docker-build-fe

help: ## Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'

# --- Frontend Commands ---
fe-install: ## Install frontend dependencies
	cd frontend && npm install

fe: ## Run frontend dev server
	cd frontend && npm run dev

fe-build: ## Build frontend for production
	cd frontend && npm run build

# --- Backend Commands (Placeholder) ---
be-install: ## Install backend dependencies
	cd backend && go mod tidy

be: ## Run backend server
	cd backend && go run main.go

# --- Docker Commands ---
docker-up: ## Start all services via docker-compose
	docker-compose up --build

docker-down: ## Stop all services
	docker-compose down

docker-build-be: ## Build backend docker image independently
	docker build -t payment-dashboard-be -f backend/Dockerfile .

docker-build-fe: ## Build frontend docker image independently
	docker build -t payment-dashboard-fe -f frontend/Dockerfile ./frontend
