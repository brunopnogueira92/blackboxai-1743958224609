document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
        window.location.href = '/index.html';
        return;
    }

    // Fetch and display voting history
    async function loadVotingHistory() {
        try {
            const response = await fetch('/api/history', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) throw new Error('Failed to fetch voting history');
            
            const history = await response.json();
            const historyList = document.getElementById('voteHistory');
            
            historyList.innerHTML = history.map(vote => `
                <li class="border-b pb-2">
                    <p><strong>Mesa:</strong> ${vote.station}</p>
                    <p><strong>Votos:</strong> ${vote.count}</p>
                    <p><strong>Horário:</strong> ${vote.time}:00</p>
                    <p><strong>Data:</strong> ${new Date(vote.created_at).toLocaleString()}</p>
                </li>
            `).join('');
        } catch (error) {
            console.error('Error loading voting history:', error);
            alert('Error loading voting history');
        }
    }

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
            document.getElementById('stats').innerHTML = `
                <p><strong>Total de Votos:</strong> ${stats.total_votes}</p>
                <p><strong>Mesas Ativas:</strong> ${stats.stations.length}</p>
            `;
        } catch (error) {
            console.error('Error loading statistics:', error);
            alert('Error loading statistics');
        }
    }

    // Handle logout
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        localStorage.removeItem('access_token');
        window.location.href = '/index.html';
    });

    // Initial load
    loadVotingHistory();
    loadStatistics();
});