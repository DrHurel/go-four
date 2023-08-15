package api

import (
	"database/sql"
	"fmt"
	"utils"

	"github.com/gin-gonic/gin"
)

func CH_GETRoom(db *sql.DB, availableRoom *[]string) gin.HandlerFunc {
	return func(c *gin.Context) {

		var isPlayerOne bool
		pseudo, err := c.Cookie("pseudo")

		if err != nil {
			fmt.Println("[0]", err)
			c.AbortWithStatus(401)
			return
		}

		if len(*availableRoom) > 0 {
			isPlayerOne = false
			fmt.Println("available room")
			temp := (*availableRoom)[0]
			_, err := db.Query(`UPDATE party SET player_two = ? WHERE room_id = ?`, pseudo, temp)
			if err != nil {
				fmt.Println("[Q3]", err)
				c.AbortWithStatus(500)
			}

			(*availableRoom) = (*availableRoom)[1:]

			c.IndentedJSON(200, gin.H{
				"room": temp,
			})

		} else {
			isPlayerOne = true
			fmt.Println("no room available")
			token := utils.RandomString(10)

			_, err := db.Query(`INSERT INTO rooms (name) VALUES (?)`, token)
			if err != nil {
				fmt.Println("[Q1]", err)
				token = utils.RandomString(10)
				_, err = db.Query(`INSERT INTO rooms (name) VALUES (?)`, token)
				if err != nil {

					fmt.Println("[Q1.BIS]", err)
					c.AbortWithStatus(500)
				}
			}

			_, err = db.Query(`INSERT INTO party (room_id, player_one) VALUES (?, ?)`, token, pseudo)

			if err != nil {
				fmt.Println("[Q2]", err)
				c.AbortWithStatus(500)
			}

			(*availableRoom) = append((*availableRoom), token)

			c.IndentedJSON(200, gin.H{
				"room":        token,
				"isPlayerOne": isPlayerOne,
			})

		}

	}
}

func CH_POSTLeaveRoom(db *sql.DB, wsmap *utils.WSMap) gin.HandlerFunc {

	return func(c *gin.Context) {

		room := c.Request.URL

		_, err := db.Query(`DELETE FROM party WHERE room_id = ?`, room)

		if err != nil {
			c.AbortWithStatus(500)
		}

		(*wsmap)[room.String()].M.CloseWithMsg([]byte("leave room"))

		delete((*wsmap), room.String())

		c.IndentedJSON(200, gin.H{
			"message": "party deleted",
		})

	}

}
