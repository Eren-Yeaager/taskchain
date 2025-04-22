// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.9;

contract TaskBoard{
    enum TaskStatus{Created ,InProgress, Completed , Cancelled}

    
    struct Task{
        uint256 id ;
        address creator;
        string title;
        string description;
        uint256 createdAt;
        uint256 completedAt;
        TaskStatus status;
    }
    uint256 nextTaskId=0;
    mapping(uint256 => Task) private tasks;
    mapping(address => uint256[]) private userTasks;

    event TaskCreated(uint256 indexed taskId , address indexed creator ,string title);

    event TaskStatusChanged(uint256 indexed taskId, TaskStatus newStatus);
    

    function createTask(string memory title , string memory description) public returns(uint256){
        uint256 taskId= nextTaskId;
        nextTaskId++;

        Task memory newTask = Task({
            id:taskId,
            creator:msg.sender,
            title: title,
            description:description,
            createdAt: block.timestamp,
            completedAt:0,
            status:TaskStatus.Created
        });
        tasks[taskId]=newTask;
        userTasks[msg.sender].push(taskId);
        emit TaskCreated(taskId, msg.sender,title);
        return taskId;
    }


  function changeTaskStatus(uint256 taskId , TaskStatus newStatus) public{
    require (tasks[taskId].creator == msg.sender,"Only task creator can change status of the task");
    require(tasks[taskId].status != TaskStatus.Completed ,"Completed tasks cannot be changed");

    tasks[taskId].status =newStatus;
    if(newStatus== TaskStatus.Completed){
        tasks[taskId].completedAt= block.timestamp;
    }
    emit TaskStatusChanged(taskId,newStatus);
  }

  function getTask(uint256 taskId) public view returns(Task memory){
    return tasks[taskId];
  }

  function getUserTasks(address user) public view returns(uint256[]memory){
    return userTasks[user];
  }

  function getTotalTasks() public view returns(uint256){
    return nextTaskId;
  }
}