package middleware

import (
	"fmt"
	"utils"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func Auth(c *gin.Context) {

	token, e := c.Cookie("token")
	if e != nil {
		fmt.Println(e)
		c.AbortWithStatus(401)
		return
	}

	claims := &utils.Claims{}

	tkn, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})

	if err != nil {
		fmt.Println(err)
		c.AbortWithStatus(401)
		return
	}

	if !tkn.Valid {
		fmt.Println(err)
		c.AbortWithStatus(401)
		return
	}

	c.Next()

}
