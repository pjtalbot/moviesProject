let moviesList = [];

let currentId = 0;

function createMovieDataHTML(inputData) {
	return `
      <tr>
        <td>${inputData.title}</td>
        <td>${inputData.rating}</td>
        <td>
          <button class="btn btn-danger" data-delete-id=${inputData.currentId}>
            Delete
          </button>
        </td>
      <tr>
    `;
}

function updateDataList(data) {
	currentId++;
	moviesList.push(data);
}

$(function() {
	$('#movie-submit-form').on('submit', function(e) {
		e.preventDefault();
		let title = $('#title').val();
		let rating = $('#rating').val();

		let newData = { title, rating, currentId };
		const divToAdd = createMovieDataHTML(newData);

		updateDataList(newData);

		$('#movie-table-body').append(divToAdd);

		// research this ".trigger" method, borrowed from solution, not fully understood
		$('movie-submit-form').trigger('reset');
	});

	$('tbody').on('click', '.btn.btn-danger', function(e) {
		let removeIndex = moviesList.findIndex(function(movie) {
			return movie.currentId === +$(e.target).data('deleteId');
		});

		moviesList.splice(removeIndex, 1);

		$(e.target).parents('tr').remove();
	});

	$('.fas').on('click', function(e) {
		let direction = $(e.target).hasClass('fa-sort-down') ? 'down' : 'up';
		let sortKey = $(e.target).attr('id');
		let sortedMovies = sortBy(moviesList, sortKey, direction);

		$('#movie-table-body').empty();

		for (let m of sortedMovies) {
			const divToAdd = createMovieDataHTML(m);
			$('#movie-table-body').append(divToAdd);
		}

		$(e.target).toggleClass('fa-sort-down');
		$(e.target).toggleClass('fa-sort-up');
	});
});

function sortBy(array, sortKey, direction) {
	return array.sort(function(a, b) {
		if (sortKey === 'rating') {
			a[sortKey] = +a[sortKey];
			b[sortKey] = +b[sortKey];
		}
		if (a[sortKey] > b[sortKey]) {
			return direction === 'up' ? 1 : -1;
		} else if (b[sortKey] > a[sortKey]) {
			return direction === 'up' ? -1 : 1;
		} else {
			return 0;
		}
	});
}
