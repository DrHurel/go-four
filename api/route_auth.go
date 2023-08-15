package api

import (
	"database/sql"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

func CH_GETRegister(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		pseudo := c.Request.Header.Get("pseudo")
		password := c.Request.Header.Get("password")

		hash, e := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

		if e != nil {
			c.AbortWithStatus(500)
		}

		_, err := db.Query(`INSERT INTO users (username, password) VALUES (?, ?)`, pseudo, hash)

		if err != nil {
			c.AbortWithStatus(500)
		}

		c.IndentedJSON(200, gin.H{
			"message": "register success",
		})
	}
}

func CH_GETLogin(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		pseudo := c.Request.Header.Get("pseudo")
		password := c.Request.Header.Get("password")

		res, err := db.Query(`SELECT password FROM users WHERE username = ?`, pseudo)

		if err != nil {
			c.AbortWithStatus(500)
		}

		if res == nil {
			c.AbortWithStatus(404)
		}

		var hash string
		for res.Next() {

			err = res.Scan(&hash)
			if err != nil {
				fmt.Println(err)
				c.AbortWithStatus(500)
			}
		}

		if bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) != nil {
			c.AbortWithStatus(401)
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"pseudo": pseudo,
		})

		tokenString, err := token.SignedString([]byte("secret"))

		if err != nil {
			fmt.Println(err)
			c.AbortWithStatus(500)
		}

		c.SetCookie("token", tokenString, 3600, "/", "localhost", false, true)
		c.SetCookie("pseudo", pseudo, 3600, "/", "localhost", false, true)

		c.IndentedJSON(200, gin.H{
			"message": "login success",
			"token":   tokenString,
		})

	}
}

func CH_POSTLogout(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		c.IndentedJSON(200, gin.H{
			"message": "Hello, World!",
		})
	}
}
