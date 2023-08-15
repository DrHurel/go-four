package middleware

import (
	"fmt"
	"utils"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/olahol/melody"
)

func AuthWS(c *gin.Context) {

	cCp := c.Copy()
	var m *melody.Melody

	token, e := c.Cookie("token")
	if e != nil {
		fmt.Println("[1]", e)
		m = melody.New()

		m.HandleConnect(func(s *melody.Session) {

			m.CloseWithMsg([]byte("token not found"))

		})
		m.HandleRequest(cCp.Writer, cCp.Request)

		return
	}

	claims := &utils.Claims{}

	tkn, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})

	if err != nil {
		fmt.Println("[2]", err)

		m.HandleConnect(func(s *melody.Session) {

			m.CloseWithMsg([]byte("error parsing token"))

		})

		m.HandleRequest(cCp.Writer, cCp.Request)
		return
	}

	if !tkn.Valid {
		fmt.Println("[3]", err)
		m.HandleConnect(func(s *melody.Session) {

			m.CloseWithMsg([]byte("invalid token"))

		})

		m.HandleRequest(cCp.Writer, cCp.Request)
		return
	}

	c.Next()

}
