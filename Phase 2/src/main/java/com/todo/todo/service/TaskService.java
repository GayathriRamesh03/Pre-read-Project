package com.todo.todo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.todo.model.Task;
import com.todo.todo.repository.TaskRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Create a new task
    public Task createTask(Task task) {
        return taskRepository.save(task);  // Save the task in MongoDB
    }

    // Get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();  // Fetch all tasks from MongoDB
    }

    // Get a task by ID
    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);  // Find task by ID
    }

    // Update an existing task
    public Task updateTask(String id, Task taskDetails) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setTitle(taskDetails.getTitle());
            task.setCompleted(taskDetails.isCompleted());
            return taskRepository.save(task);  // Save the updated task
        } else {
            return null;  // Return null if task not found
        }
    }

    // Delete a task by ID
    public boolean deleteTask(String id) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()) {
            taskRepository.deleteById(id);  // Delete the task from MongoDB
            return true;
        } else {
            return false;  // Return false if task not found
        }
    }
}
