document.addEventListener('DOMContentLoaded', async () => {
    // Load Pyodide
    let pyodide = await loadPyodide();
    await pyodide.loadPackage('micropip');
    const micropip = pyodide.pyimport('micropip');
    await micropip.install('numpy');

    // Get project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');

    // Project data
    const projects = {
        drowsiness: {
            title: 'Drowsiness Detection System',
            description: 'A machine learning-based system to detect driver drowsiness using eye aspect ratio analysis. Built with Python, OpenCV, and DLib. This demo simulates eye state detection with mock data.'
        },
        uiux: {
            title: 'UI/UX Projects',
            description: 'Designed user interfaces for Cafe Shop Mobile App, Pet Shelters App, and File Management Dashboard using Figma and Adobe XD.'
        },
        iot: {
            title: 'IoT Systems',
            description: 'Developed IoT solutions including a Car Accident Detection and Alert System and a Garbage Detection and Monitoring System using embedded systems and sensor networks.'
        }
    };

    // Update project details
    const project = projects[projectId] || projects.drowsiness;
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-description').textContent = project.description;

    // Handle live demo for Drowsiness Detection
    if (projectId === 'drowsiness') {
        document.getElementById('run-demo').addEventListener('click', async (e) => {
            e.preventDefault();
            const outputDiv = document.getElementById('demo-output');
            const resultPre = document.getElementById('demo-result');
            outputDiv.style.display = 'block';
            resultPre.textContent = 'Running demo...';

            // Simulated Drowsiness Detection Python code
            const pythonCode = `
import numpy as np

def calculate_eye_aspect_ratio(eye_points):
    # Simulate eye aspect ratio calculation with mock data
    return np.random.uniform(0.1, 0.3)

def detect_drowsiness(ear, threshold=0.2):
    return "Eyes Closed (Drowsy)" if ear < threshold else "Eyes Open (Alert)"

# Simulate processing a frame
eye_points = [1, 2, 3, 4, 5, 6]  # Mock eye landmarks
ear = calculate_eye_aspect_ratio(eye_points)
result = detect_drowsiness(ear)
result
            `;
            try {
                const output = await pyodide.runPythonAsync(pythonCode);
                resultPre.textContent = output;
            } catch (error) {
                resultPre.textContent = `Error: ${error.message}`;
            }
        });
    } else {
        document.getElementById('run-demo').style.display = 'none';
    }
});