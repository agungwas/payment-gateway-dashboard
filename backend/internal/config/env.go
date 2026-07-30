package config

import (
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	_ "github.com/mattn/go-sqlite3"
)

var (
	JwtSecret           []byte
	JwtExpired          string
	HttpAddress         string
	OpenapiYamlLocation string
	FrontendURL         string
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found or error reading it. Relying on system environment variables.")
	}

	JwtSecret = []byte(getEnv("JWT_SECRET", "dev-secret-replace-me"))
	JwtExpired = getEnv("JWT_EXPIRED", "24h")
	HttpAddress = getEnv("HTTP_ADDR", ":8080")
	OpenapiYamlLocation = getEnv("OPENAPIYAML_LOCATION", "../openapi.yaml")
	FrontendURL = getEnv("FRONTEND_URL", "http://localhost:5173")
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
