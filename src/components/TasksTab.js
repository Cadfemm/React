import React, { useState } from 'react';

const TasksTab = () => {
  const [tasks, setTasks] = useState([
    { id: 1, task: '5 mins walk', goal: '10 mins walk without help', date: '2025-10-22', progress: 0 },
    { id: 2, task: 'Stretching exercises', goal: 'Hold for 10 seconds', date: '2025-10-24', progress: 0 },
    { id: 3, task: 'Breathing exercises', goal: '5 mins of breathing', date: '2025-10-25', progress: 0 },
    { id: 4, task: 'Walk 200m', goal: 'Without stopping', date: '2025-10-26', progress: 0 },
  ]);

  const todayDate = new Date().toISOString().split('T')[0];

  const handleProgressChange = (id, value) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, progress: parseInt(value) } : task
    ));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '15px', fontSize: '2rem', color: 'rgb(42, 101, 146)' }}>Task List</h2>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyles}>Date</th>
            <th style={tableHeaderStyles}>Task</th>
            <th style={tableHeaderStyles}>Goal</th>
            <th style={tableHeaderStyles}>Progress</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} style={{ textAlign: 'center' }}>
              <td style={tableCellStyles}>{task.date}</td>
              <td style={tableCellStyles}>{task.task}</td>
              <td style={tableCellStyles}>{task.goal}</td>
              <td style={tableCellStyles}>
                {task.date === todayDate ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={task.progress}
                      onChange={(e) => handleProgressChange(task.id, e.target.value)}
                      style={{
                        width: '200px',
                        accentColor: '#3A3FAD',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ 
                      fontWeight: 'bold', 
                      color: '#3A3FAD',
                      minWidth: '45px'
                    }}>
                      {task.progress}%
                    </span>
                  </div>
                ) : (
                  <span style={{ color: '#999' }}>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyles = {
  backgroundColor: '#F1F1F1',
  border: '1px solid #000',
  color: '#3A3FAD',
  padding: '12px',
  fontWeight: 'bold',
};

const tableCellStyles = {
  padding: '12px',
  border: '1px solid #353333ff',
};

export default TasksTab;