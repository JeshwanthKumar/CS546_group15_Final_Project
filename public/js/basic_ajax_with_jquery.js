(function($){
	const username = $("#username");
	const password = $("#passowrd");
	let html = "You have entered wrong credentials";

	let requestConfig = {
		method : "POST",
		url : "/shop/login",
		data : {
			username : username,
			password : password,
		}
	}
	$.ajax(requestConfig).append((responseMessage)=>{
		window.location.href = "/shopId/"+responseMessage.shopId
	}),
	(responseMessage)=>{
		$('.login-heading').append(html);
	}
})

// (function($) {
// 	// Let's start writing AJAX calls!

// 	const mySearchForm = $('#search-form'),
// 	const searchInput = $('#search-bar');
//  	const newContent = $('#new-content');
// 	 const submitButton = $('#submitbutton');
// 	const Showlist = $("#Showlist");
// 	const nullList = (elem)=>{
// 		elem.html(null);
// 	}

// 	const bindEventsShows = (e)=>{
// 		e.children().each((i, child)=>{
// 			console.log(child);
// 			$(child).click((event)=>{
// 				event.preventDefault();
// 				console.log(event.target.href);
// 				let requestConfig = {
// 					method : "GET",
// 					url : event.target.href,
// 				}
// 				$.ajax(requestConfig).then((responseMessage)=>{
// 					console.log(responseMessage);

// 				})
// 			})
// 		})
// 	}
// 	const loadPage = (event)=>{
// 		let requestConfig = {
// 			method : "GET",
// 			url : "http://localhost:3000/shop/allProduct",
// 		};
// 		$.ajax(requestConfig).then((responseMessage)=>{
// 			console.log(responseMessage);
// 			let list = listProd(responseMessage);
// 			Showlist.attr("hidden", false);
// 		})
// 	}
// 	const searchProd = (event)=>{
// 		for(let i= 0;i<event.length;i++){
// 			$('#Showlist').append(`<a href='/users//shop/${this.shopId}' class="u-btn u-button-style u-palette-3-base u-btn-1 shopNameForProductList">${this.shopName}</a>`)
// 		}
// 	}
// 	submitButton.on('click', function(event){
// 		event.preventDefault();
// 		let searchtext = searchInput.val();
// 		let requestConfig = {
// 			method = "GET",
// 			url : "http://localhost:3000/shop/allProduct?q=" +searchtext,
// 		};
// 		$.ajax(requestConfig).then((responseMessage)=>{
// 			console.log(responseMessage);
// 			nullList(Showlist);
// 			let list = searchProd(responseMessage);
// 			Showlist.attr("hidden", false);

// 		})
// 	})
// 	$("#Showlist").on('click', function(event){
//         event.preventDefault();

//     })
// 	$(document).ready(()=>{
// 		loadPage();
// 	})
// 	// mySearchForm.submit(function(event) {
// 	// 	event.preventDefault();

// 	// 	console.log('start ajax request');
// 	// 	var search = searchInput.val();

// 	// 	if (search) {
// 	// 		var useJson = false;
// 	// 		if (useJson) {
// 	// 			var requestConfig = {
// 	// 				method: 'POST',
// 	// 				url: '/shop/search',
// 	// 				contentType: 'application/json',
// 	// 				data: JSON.stringify({
// 	// 					search: search
// 	// 				})
// 	// 			};

// 	// 			$.ajax(requestConfig).then(function(responseMessage) {
// 	// 				console.log(responseMessage);
// 	// 				newContent.html(responseMessage);
// 	// 			});
// 	// 		} else {
// 	// 			var requestConfig = {
// 	// 				method: 'POST',
// 	// 				url: '/shop/search.html',
// 	// 				contentType: 'application/json',
// 	// 				data: JSON.stringify({
// 	// 					search: search
// 	// 				})
// 	// 			};

// 	// 			$.ajax(requestConfig).then(function(responseMessage) {
// 	// 				console.log(responseMessage);
// 	// 				newContent.html(responseMessage);
// 	// 			});
// 	// 		}
// 	// 	}
// 	// });
// })(window.jQuery);



// // router.post("/search.html", async (req, res) => {
// //     const body = req.body;
// //     try {
// //       let productList = await product.getProductsViaSearch(body.search);
// //       var user = req.session.user;
// //       let newProductList = [];
// //         for (product of productList) {
// //           if (product.reviews&&product.reviews.length > 0) {
// //               product.rated = true;
// //           } else {
// //               product.rated = false;
// //           }
// //           newProductList.push(product);
// //         }
      
// //       if (productList.length > 0) {
// //         res.status(200).render("productList", { allProducts: productList,
// //             userId: user});
// //       } else {
// //         res.status(200).render("productList", { allProducts: [],
// //             userId: user});
// //       }
// //     } catch (e) {
// //       console.log(e);
// //       res.status(500).send();
// //     }
// //   })