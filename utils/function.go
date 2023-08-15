package utils

import (
	"database/sql"
	"math/rand"
)

func RandomString(n int) string {
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

	s := make([]rune, n)
	for i := range s {
		s[i] = letters[rand.Intn(len(letters))]
	}

	return string(s)
}

func RemovePartyEnded(db *sql.DB) {

	_, err := db.Query(`DELETE FROM party WHERE started_at < NOW() - INTERVAL 1 HOUR`)

	if err != nil {
		panic(err.Error())
	}

	_, err = db.Query(`DELETE FROM rooms WHERE id NOT IN (SELECT room_id FROM party)`)

	if err != nil {
		panic(err.Error())
	}

}

func RemoveRoomEnded(db *sql.DB, party string) {

	_, err := db.Query(`DELETE FROM party WHERE room_id = ?`, party)

	if err != nil {
		panic(err.Error())
	}

	_, err = db.Query(`DELETE FROM rooms WHERE id = ?`, party)

	if err != nil {
		panic(err.Error())
	}

}
