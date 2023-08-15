package api

import (
	"database/sql"
	"fmt"
	"utils"

	"github.com/gin-gonic/gin"
	"github.com/olahol/melody"
)

func CH_WS_id(db *sql.DB, wsmap *utils.WSMap) gin.HandlerFunc {

	return func(c *gin.Context) {

		var ws utils.WSPack

		pseudo, err := c.Cookie("pseudo")

		if err != nil {
			fmt.Println("\033[31m", "[0]", err, "\033[0m")
			c.AbortWithStatus(401)
			return
		}

		paramId := c.Param("id")
		fmt.Println("[WS]:", paramId)
		// check if pseudo is link to the right room

		res, err := db.Query(`SELECT * FROM party WHERE room_id = ? AND (player_one = ? OR player_two = ?)`, paramId, pseudo, pseudo)

		if err != nil {

			fmt.Println("\033[31m", "[1]", err, "\033[0m")
			c.AbortWithStatus(500)
			return
		}

		if res == nil {
			fmt.Println("[2] room not found")
			c.AbortWithStatus(404)
			return
		}

		if (*wsmap)[paramId] == nil {
			ws = utils.WSPack{
				M:       melody.New(),
				Confirm: false,
				Count:   0,
			}

			(*wsmap)[paramId] = &ws
		} else {
			ws = *(*wsmap)[paramId]
		}

		ws.M.HandleConnect(utils.WsConnect(&ws, paramId))

		ws.M.HandleDisconnect(func(s *melody.Session) {
			ws.Count--
			//go countBeforeClose(60, &ws, wsmap, paramId)
		})

		ws.M.HandleMessage(utils.WsFilter(ws.M))

		ws.M.HandleRequest(c.Writer, c.Request)

	}
}
