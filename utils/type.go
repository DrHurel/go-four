package utils

import (
	"github.com/golang-jwt/jwt"
	"github.com/olahol/melody"
)

type Claims struct {
	Pseudo string `json:"pseudo"`
	Id     string `json:"id"`
	jwt.StandardClaims
}

type CreatePartyBody struct {
	Player_one string `json:"player_one"`
	Player_two string `json:"player_two"`
}

type WSPack struct {
	M       *melody.Melody
	Confirm bool
	Count   int
}

type WSMap map[string]*WSPack
