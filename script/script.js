// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '2b93e030a1msh1f83bdaa18b25dcp1d2732jsn60aaf549e241',
// 		'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
// 	}
// };

// fetch('https://amazon24.p.rapidapi.com/api/product?categoryID=aps&keyword=iphone&country=US&page=1', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));






let Spent = document.querySelector('#spent');
let marked_place1 = document.querySelector('.marked_place');
let marked = document.querySelector('.marked');
let marked_lists = document.querySelector('.marked_lists');
let Spent2;
let Spent3 = [];

let place = document.querySelector('.place')
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2b93e030a1msh1f83bdaa18b25dcp1d2732jsn60aaf549e241',
		'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
	}
};

fetch('https://amazon24.p.rapidapi.com/api/product?categoryID=aps&keyword=iphone&country=US&page=1', options)
	.then(response => response.json())
	.then(response => {
		Spent2 = response;
		response.docs.forEach((el,idx) => {
			place.innerHTML +=
				`
			<div>
			<i class="material-icons" id="marked_check" onclick="checked(${idx})">bookmark_border </i>
				<img src=${el.product_main_image_url}  alt="...">
				<div class="part">
				<p style="color: white;">${el.evaluate_rate}</p>
				<p style="color: white;">Sale Price: ${el.app_sale_price} ${el.app_sale_price_currency}</p>
				</div>
				<a href=${el.product_detail_url} target="_blank">Link To Amazon</a>
			
			</div>

			`
		});
	})
	.catch(err => console.error(err));



	// asosiy
	function checked(idx){

		let isTrue = Spent3.some(s=>s.product_id == Spent2.docs[idx].product_id);

		console.log(isTrue);
		if(isTrue == false){
			Spent3 = [...Spent3,{...Spent2.docs[idx],miqdor:1}];
		}else{
			Spent3 = Spent3.map((val)=>{
				console.log(val.miqdor);
				if(val.product_id == Spent2.docs[idx].product_id){
					return{
						...val,
						miqdor:val.miqdor+1
					}
				}else{
					return val
				}
			})
		}
		
	}



	marked.addEventListener('click',()=>{
		marked_lists.style.display = 'block';
		marked_lists.style.display = 'flex';
		if(Spent3.length > 0){
			marked_place1.innerHTML = ''
			Spent3.forEach((el,idx) => {
				marked_place1.innerHTML +=
					`
				<li>
					<img src=${el.product_main_image_url}  alt="...">
					<div class="part">
					<p style="color: white;">Sale Price: ${el.app_sale_price} ${el.app_sale_price_currency}</p>
					</div>
					<b>${el.miqdor}</b>
					<button class="btn btn-danger" onclick="remove(${idx})">
						Remove
					</button>
				</li>
		
				`
			});
		
		}else{
			marked_place1.textContent = 'Basket is Empty'
		}
	})



	function remove(id){
		
		console.log(Spent3[id].product_id);
		Spent3 = Spent3.filter(s=>s.product_id !== Spent3[id].product_id);
		if(Spent3.length > 0){
			marked_place1.innerHTML = ''
			Spent3.forEach((el,idx) => {
				marked_place1.innerHTML +=
					`
				<li>
					<img src=${el.product_main_image_url}  alt="...">
					<div class="part">
					<p style="color: white;">Sale Price: ${el.app_sale_price} ${el.app_sale_price_currency}</p>
					</div>
					<b>${el.miqdor}</b>
					<button class="btn btn-danger" onclick="remove(${idx})">
						Remove
					</button>
				</li>
		
				`
			});
		
		}else{
			marked_place1.textContent = 'Basket is Empty'
		}
	}

	marked_lists.addEventListener('click',()=>{
		marked_lists.style.display = 'none';
	})

	marked_place1.addEventListener('click',(e)=>{
		e.stopPropagation()
	})