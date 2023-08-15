package main

import (
	"api"
	"dbTools"
	"utils"

	mw "middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	//------- global variable -------
	router := gin.Default()
	wsmap := make(utils.WSMap)
	availableRoom := make([]string, 0)

	//------- CORS -------
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}       // Allow requests from this origin
	config.AllowCredentials = true                                // Allow cookies to be sent along with the request
	config.AllowHeaders = append(config.AllowHeaders, "pseudo")   // Add custom headers to the allowed list
	config.AllowHeaders = append(config.AllowHeaders, "password") // Add custom headers to the allowed list

	router.Use(cors.New(config))

	// db connection

	db := dbTools.Connect("root:azerty34@tcp(localhost:3306)/connectfour")

	dbTools.TestConnection(db)

	dbTools.Prepare(db)

	defer db.Close()

	//------- groupe -------

	apiUnAuth := router.Group("/api")
	apiAuthed := router.Group("/api")
	ws := router.Group("/ws")

	// middleware

	//apiUnAuth.Use(mw.UnAuth) not needed during dev
	apiAuthed.Use(mw.Auth)
	ws.Use(mw.AuthWS)

	//------- Route -------

	//router.POST("/save-form", lib.SaveFormRoute)

	apiUnAuth.GET("/register", api.CH_GETRegister(db))
	apiUnAuth.GET("/login", api.CH_GETLogin(db))

	apiAuthed.GET("/room", api.CH_GETRoom(db, &availableRoom))
	apiAuthed.POST("/logout", api.CH_POSTLogout(db))
	apiAuthed.POST("/leave-room", api.CH_POSTLeaveRoom(db, &wsmap))

	ws.GET("/:id", api.CH_WS_id(db, &wsmap))

	router.Run(":8080")
}
