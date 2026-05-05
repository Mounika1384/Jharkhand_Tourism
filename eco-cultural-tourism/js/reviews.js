const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : 'https://jharkhand-tourism-backend.onrender.com/api'; // Replace with your actual backend URL after deployment

async function fetchReviews(destinationId) {
    try {
        const response = await fetch(`${API_URL}/reviews/${destinationId}`);
        const reviews = await response.json();
        renderReviews(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

function renderReviews(reviews) {
    const list = document.getElementById('reviewsList');
    if (!list) return;

    if (reviews.length === 0) {
        list.innerHTML = '<p>No reviews yet. Be the first to share your experience!</p>';
        return;
    }

    list.innerHTML = reviews.map(r => `
        <div class="review-card">
            <div class="review-header">
                <span class="review-name">${r.userName}</span>
                <span class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span>
            </div>
            <p class="review-comment">${r.comment}</p>
            <small class="review-date">${new Date(r.createdAt).toLocaleDateString()}</small>
        </div>
    `).join('');
}

async function submitReview(event, destinationId) {
    event.preventDefault();
    const userName = document.getElementById('reviewName').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value || 5;
    const comment = document.getElementById('reviewComment').value;

    const reviewData = { destinationId, userName, rating: parseInt(rating), comment };

    try {
        const response = await fetch(`${API_URL}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
        });

        const data = await response.json();
        if (data.success) {
            alert('Review submitted successfully!');
            document.getElementById('reviewForm').reset();
            fetchReviews(destinationId);
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('Failed to submit review. Is the backend running?');
    }
}

function getReviewFormHTML(destinationId) {
    return `
        <div class="review-section">
            <h3>Reviews & Ratings</h3>
            <form class="review-form" id="reviewForm" onsubmit="submitReview(event, '${destinationId}')">
                <div class="form-group">
                    <input type="text" id="reviewName" class="form-control" placeholder="Your Name" required>
                </div>
                <div class="rating-input">
                    <label>Rating: </label>
                    <input type="radio" name="rating" value="1"> 1
                    <input type="radio" name="rating" value="2"> 2
                    <input type="radio" name="rating" value="3"> 3
                    <input type="radio" name="rating" value="4"> 4
                    <input type="radio" name="rating" value="5" checked> 5
                </div>
                <div class="form-group">
                    <textarea id="reviewComment" class="form-control" placeholder="Share your experience..." required></textarea>
                </div>
                <button type="submit" class="btn">Submit Review</button>
            </form>
            <div class="reviews-list" id="reviewsList">
                Loading reviews...
            </div>
        </div>
    `;
}
