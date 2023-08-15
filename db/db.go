package dbTools

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func Connect(s string) *sql.DB {
	db, err := sql.Open("mysql", s)
	if err != nil {
		panic(err.Error())
	}
	return db
}

func TestConnection(db *sql.DB) {
	err := db.Ping()
	if err != nil {
		panic(err.Error())
	}
}

func Prepare(db *sql.DB) {

	_, err := db.Query(
		`CREATE TABLE IF NOT EXISTS users (
			username VARCHAR(255) PRIMARY KEY,
			password VARCHAR(255) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);`,
	)

	if err != nil {
		fmt.Println("[QUERY] 1")
		panic(err.Error())
	}

	_, err = db.Query(
		`CREATE TABLE IF NOT EXISTS rooms (
			name VARCHAR(255) PRIMARY KEY,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);`,
	)

	if err != nil {
		fmt.Println("[QUERY] 2")
		panic(err.Error())
	}

	_, err = db.Query(
		`CREATE TABLE IF NOT EXISTS party (
			room_id VARCHAR(255) PRIMARY KEY,
			player_one VARCHAR(255) NOT NULL,
			player_two VARCHAR(255) DEFAULT NULL,
			started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (room_id) REFERENCES rooms(name),
			FOREIGN KEY (player_one) REFERENCES users(username),
			FOREIGN KEY (player_two) REFERENCES users(username)
		);`,
	)

	if err != nil {
		fmt.Println("[QUERY] 3")
		panic(err.Error())
	}

}
