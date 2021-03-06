import axios from 'axios';
import HandleResponse from './utils/HandleServerResponse';

$(document).ready(async function () {

	try {

		const crawnews = await axios({
			method: 'get',
			url: '/api/news'
		});
		console.log(crawnews);

		if (crawnews.status === 200) {
			$('#list_news').empty();
			console.log(crawnews);
			crawnews.data.forEach(item => {

				console.log(item);
				const output = '<div class="col-lg-4 col-md-4 col-sm-4"><div class="card" style="width: 18rem;"><img class="card-img-top" src=' + item.src + 'alt=' + item.alt + ' > <div class="card-body"> <h4>' + item.title + '</h4><a href=' + item.href + ' class="btn btn-primary">Xem bài viết</a></div></div></div><br>';
				$('#list_news').append(output);
			});

			
		}
		if (crawnews.status === 404) {
			HandleResponse('.news-response', crawnews.data.msg, crawnews.status);
		}

	} catch (error) {
		console.log(error.response);
		if (error.response.data.msg) {
			HandleResponse('.news-response', error.response.data.msg, error.response.status);
		} else {
			const errorsData = error.response.data.map(data => data.msg);
			HandleResponse('.news-response', errorsData, error.response.status);
		}
	}
});