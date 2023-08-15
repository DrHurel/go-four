package utils

import (
	"fmt"

	"github.com/olahol/melody"
)

func WsFilter(m *melody.Melody) func(s *melody.Session, msg []byte) {
	return (func(s *melody.Session, msg []byte) {
		m.BroadcastFilter(msg, func(q *melody.Session) bool {
			return q != s
		})
	})
}

func WsConnect(ws *WSPack, id string) func(s *melody.Session) {
	return (func(s *melody.Session) {
		ws.Count++
		fmt.Println("[total connection", id, "]", ws.Count)
		if ws.Count > 2 {
			ws.M.CloseWithMsg([]byte("too many connections"))
		}

	})
}

/*
func CountBeforeClose(cooldown int, ws *WSPack, wsMap *WSMap, id string) {

	time.Sleep(time.Duration(cooldown) * time.Second)

	if ws.count < 2 {
		fmt.Println("closing room", id)
		(*ws).m.CloseWithMsg([]byte("game closed due to inactivity"))

		delete((*wsMap), id)
	}

}
*/
