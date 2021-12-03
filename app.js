let moviesList = [];

function createMovieDataHTML(data) {
	return `
      <tr>
        <td>${data.title}</td>
        <td>${data.rating}</td>
        <td>
          <button class="btn btn-danger" data-delete-id=${data.currentId}>
            Delete
          </button>
        </td>
      <tr>
    `;
}

$(function() {
	$('#movie-submit-form').on('submit', function(e) {
		e.preventDefault();
		let title = $('#title').val();
		let rating = $('#rating').val;

		let newData = { title, rating, currentId };
		const divToAdd = createMovieDataHTML(newData);

		$('movie-table-body').append(divToAdd);

		// research this ".trigger" method, borrowed from solution, not fully understood
		$('new-movie-form').trigger('reset');
	});
});
