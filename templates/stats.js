document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
        window.location.href = '/index.html';
        return;
    }

    // Initialize charts
    const stationCtx = document.getElementById('stationChart').getContext('2d');
    const timeCtx = document.getElementById('timeChart').getContext('2d');
    
    let stationChart = new Chart(stationCtx, {
        type: 'bar',
        data: { labels: [], datasets: [{ label: 'Votos por Mesa', data: [] }] },
        options: { responsive: true }
    });

    let timeChart = new Chart(timeCtx, {
        type: 'pie',
        data: { labels: ['10:00', '13:00', '16:00', '19:00'], datasets: [{ data: [0, 0, 0, 0] }] },
        options: { responsive: true }
    });

    // Fetch and display statistics
    async function loadStatistics() {
        try {
            const response = await fetch('/api/stats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) throw new Error('Failed to fetch statistics');
            
            const stats = await response.json();
            
            // Update summary cards
            document.getElementById('totalVotes').textContent = stats.total_votes;
            document.getElementById('activeStations').textContent = stats.stations.length;
            document.getElementById('avgPerStation').textContent = 
                stats.stations.length > 0 ? Math.round(stats.total_votes / stats.stations.length) : 0;
            
            // Update station chart
            stationChart.data.labels = stats.stations.map(s => s.name);
            stationChart.data.datasets[0].data = stats.stations.map(s => s.votes);
            stationChart.update();
            
            // Update time chart data (example - would need actual time-based stats from API)
            const timeStats = [10, 13, 16, 19].map(hour => 
                stats.stations.reduce((sum, station) => sum + (station.time === hour ? station.votes : 0), 0)
            );
            timeChart.data.datasets[0].data = timeStats;
            timeChart.update();
            
            // Update station details table
            const tableBody = document.getElementById('stationDetails');
            tableBody.innerHTML = stats.stations.map(station => `
                <tr>
                    <td class="py-2 px-4 border">${station.name}</td>
                    <td class="py-2 px-4 border">${station.votes}</td>
                    <td class="py-2 px-4 border">${new Date(station.updated_at).toLocaleString()}</td>
                </tr>
            `).join('');
            
        } catch (error) {
            console.error('Error loading statistics:', error);
            alert('Error loading statistics');
        }
    }

    // Initial load
    loadStatistics();
});