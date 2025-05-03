package models
type TaskCompletionRequest struct{
	TaskID uint64 `json:taskId`
	Address string `json:address`
	Signature string `json:signature`
}