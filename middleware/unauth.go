package middleware

import (
	"utils"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func UnAuth(c *gin.Context) {

	token, err := c.Cookie("token")

	if err != nil {

		c.Next()

	}

	if token == "" {

		c.Next()

	}

	claims := &utils.Claims{}

	tkn, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})

	if err != nil {

		c.Next()

	}

	if !tkn.Valid {

		c.Next()

	}

	c.AbortWithStatus(402)

}
