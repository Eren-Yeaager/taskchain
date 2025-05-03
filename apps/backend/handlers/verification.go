package handlers

import (
	"apps/backend/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)
func VerifyCompletion(c *gin.Context){

	var request models.TaskCompletionRequest
	if err := c.ShouldBindJSON(&request); err != nil{
		c.JSON(http.StatusBadRequest,gin.H{
			"error":"Error parsing JSON",
		})
		return
	}

	fmt.Printf("Received verification request for task ID %d from address %s\n" ,request.TaskID,request.Address)

	response := gin.H{
		"success": true,
        "message": "Verification request received",
        "taskId": request.TaskID,
	}
	c.JSON(http.StatusOK, response)

}

