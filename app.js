let moviesList = [];

let currentId = 0;

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
		let rating = $('#rating').val();

		let newData = { title, rating, currentId };
		const divToAdd = createMovieDataHTML(newData);

		currentId++;
		moviesList.push(newData);

		$('#movie-table-body').append(divToAdd);

		// research this ".trigger" method, borrowed from solution, not fully understood
		$('movie-submit-form').trigger('reset');
	});

	$('tbody').on('click', '.btn.btn-danger', function(e) {
		let removeIndex = moviesList.findIndex(function(movie) {
			return movie.currentId === +$(e.target).data('deleteId');
		});

		moviesList.splice(removeIndex, 1);

		$(e.target).parent.remove();
	});
});
