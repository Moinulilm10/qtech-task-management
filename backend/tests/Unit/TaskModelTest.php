<?php

namespace Tests\Unit;

use App\Models\Task;

test('task model has correct fillable attributes', function () {
    $task = new Task();
    
    $fillable = [
        'title',
        'description',
        'status',
    ];

    expect($task->getFillable())->toEqual($fillable);
});

test('task model status constants are correctly defined', function () {
    expect(Task::STATUS_PENDING)->toBe('pending')
        ->and(Task::STATUS_IN_PROGRESS)->toBe('in_progress')
        ->and(Task::STATUS_COMPLETED)->toBe('completed');
});
