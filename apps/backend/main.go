package main

import (
	"apps/backend/handlers"
	"fmt"

	"github.com/gin-gonic/gin"
)


func main() {
  
    fmt.Println("Starting BlockTasks verification service...")
    
   
    router := gin.Default()
    
    
    router.GET("/health", func(c *gin.Context) {
       
        c.JSON(200, gin.H{
            "status": "healthy",
            "message": "Service is running",
        })
    })
    
  
    router.POST("/verify",handlers.VerifyCompletion)
    
    
    fmt.Println("Server listening on port 8080")
    
 
    if err := router.Run(":8080"); err != nil {
        fmt.Printf("Error starting server: %s\n", err)
    }
}