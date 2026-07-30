FROM golang:latest AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y gcc libc-dev

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/ .
COPY openapi.yaml .

RUN CGO_ENABLED=1 GOOS=linux go build -o server main.go

FROM debian:bookworm-slim
WORKDIR /app

RUN apt-get update && apt-get install -y ca-certificates sqlite3 && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/server .
COPY --from=builder /app/openapi.yaml .

EXPOSE 8080

CMD ["./server"]
