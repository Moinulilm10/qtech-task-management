<?php

use App\Models\Task;
use Illuminate\Support\Str;
use function Pest\Laravel\{getJson, postJson, putJson, deleteJson, assertDatabaseHas, assertDatabaseMissing};

test('can list all tasks', function () {
    Task::factory()->count(3)->create();

    getJson('/api/tasks')
        ->assertStatus(200)
        ->assertJsonCount(3);
});

test('tasks are returned in latest order', function () {
    $oldTask = Task::factory()->create(['created_at' => now()->subDay()]);
    $newTask = Task::factory()->create(['created_at' => now()]);

    $response = getJson('/api/tasks');
    
    expect($response->json()[0]['id'])->toBe($newTask->id)
        ->and($response->json()[1]['id'])->toBe($oldTask->id);
});

test('can search tasks by title', function () {
    Task::factory()->create(['title' => 'Important Task']);
    Task::factory()->create(['title' => 'Other Task']);

    getJson('/api/tasks?search=Important')
        ->assertStatus(200)
        ->assertJsonCount(1)
        ->assertJsonPath('0.title', 'Important Task');
});

test('cannot search with query longer than 100 characters', function () {
    $longQuery = Str::random(101);

    getJson("/api/tasks?search={$longQuery}")
        ->assertStatus(422)
        ->assertJson(['error' => 'Search query too long']);
});

test('can create a task', function () {
    $data = [
        'title' => 'New Task',
        'description' => 'Description here',
        'status' => 'pending'
    ];

    postJson('/api/tasks', $data)
        ->assertStatus(201)
        ->assertJsonFragment(['title' => 'New Task']);

    assertDatabaseHas('tasks', ['title' => 'New Task']);
});

test('cannot create a task without a title', function () {
    postJson('/api/tasks', [])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['title']);
});

test('can show a specific task', function () {
    $task = Task::factory()->create();

    getJson("/api/tasks/{$task->id}")
        ->assertStatus(200)
        ->assertJsonPath('id', $task->id);
});

test('can update a task', function () {
    $task = Task::factory()->create(['title' => 'Old Title']);

    putJson("/api/tasks/{$task->id}", ['title' => 'New Title'])
        ->assertStatus(200)
        ->assertJsonPath('title', 'New Title');

    assertDatabaseHas('tasks', ['id' => $task->id, 'title' => 'New Title']);
});

test('cannot update a task with invalid status', function () {
    $task = Task::factory()->create();

    putJson("/api/tasks/{$task->id}", ['status' => 'invalid-status'])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['status']);
});

test('can delete a task', function () {
    $task = Task::factory()->create();

    deleteJson("/api/tasks/{$task->id}")
        ->assertStatus(204);

    assertDatabaseMissing('tasks', ['id' => $task->id]);
});
