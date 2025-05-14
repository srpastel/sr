$(window).on('load', function(){
	initialize();
});

$(document).ready(function(){
	init();
	filePersonalizado();
	banners();
	scrollPage();
	animaBolhas();
	filtros();
	selectLocal();
	selectCardapio();
	animaFotos();
	validaForm();
	modalTelentrega();
	sliderBolas();
	$('.scroll').jScrollPane({autoReinitialise: true});
});



/* =========
   BANNERS
   ========= */
function banners(){
	$('#banners').cycle({
		slideResize: true,
		containerResize: true,
		fit: 1,
		fx: 'fade',
		speed: 370,
		timeout: 6000,
		after: function(currSlideElement, nextSlideElement){
			var $slide = $(nextSlideElement),
				id = $slide.attr('id'),
				index = $slide.index();
			animaSlide(id,index,'entrada');
		},
		before: function(currSlideElement, nextSlideElement){
			var $slide = $(currSlideElement),
				id = $slide.attr('id'),
				index = $slide.index();
			animaSlide(id,index,'saida');
		},
		cleartypeNoBg: true,
		cleartype: !$.support.opacity
	});

	/*$('#bannersMobile').cycle({
		fx:     'fade',
		speed:   370,
		timeout: 8000,
		cleartypeNoBg: true,
		cleartype: !$.support.opacity
	});*/
}

function animaSlide(id,index,tipo){
	switch(id){
		case 'slide1': sliderUm(tipo); break;
		case 'slide2': sliderDois(tipo); break;
	}
	$('#bannersMobile').children().eq(index).fadeIn(400).siblings().hide();
}

function sliderUm(tipo){
	var slider = $('.sliderUm');
	switch(tipo){
		case 'entrada':
			$("body,.logo a").animate({ backgroundColor: "#faf1cf" }, 400 );
			slider.find('.blocoCoracao').animate({
				top: 0,
				opacity: 1
			}, 350, 'easeOutBack');
			slider.find('.blocoSorvete').delay(50).animate({
				bottom: 0,
				opacity: 1
			}, 350, 'easeOutBack');
			slider.find('.txtslider').delay(200).animate({
				left: 200,
				opacity: 1
			}, 400, 'easeOutBack');
			break;

		case 'saida':
			slider.find('.blocoCoracao').animate({
				top: -100,
				opacity: 0
			}, 400, 'linear');
			slider.find('.blocoSorvete').animate({
				bottom: -100,
				opacity: 0
			}, 400, 'linear');
			slider.find('.txtslider').animate({
				left: -130,
				opacity: 0
			}, 400, 'linear');
			break;
	}
}

function sliderDois(tipo){
	var slider = $('.sliderDois');
	switch(tipo){
		case 'entrada':
			$("body, .logo a").animate({ backgroundColor: "#e3facf" }, 400 );
			slider.find('.blocoTaca').animate({
				top: 80,
				left: 0,
				opacity: 1
			}, 500, 'easeOutBack');
			slider.find('.blocoTaca2').animate({
				bottom: 0,
				left: 81,
				opacity: 1
			}, 500, 'easeOutBack');
			slider.find('.blocoCoracao').delay(250).animate({
				top: 0,
				left: 40,
				opacity: 1
			}, 350, 'easeOutBack');
			slider.find('.txtslider').delay(300).animate({
				left: 200,
				opacity: 1
			}, 400, 'easeOutBack');
			break;

		case 'saida':
			slider.find('.blocoTaca').animate({
				top: 200,
				left: -59,
				opacity: 0
			}, 400, 'linear');
			slider.find('.blocoTaca2').animate({
				bottom: -110,
				left: 120,
				opacity: 0
			}, 400, 'linear');
			slider.find('.blocoCoracao').animate({
				top: 80,
				left: 100,
				opacity: 0
			}, 400, 'linear');
			slider.find('.txtslider').animate({
				left: -130,
				opacity: 0
			}, 400, 'linear');
			break;
	}
}


/* =========
   SCROLL
   ========= */
function scrollPage(){
	$(".menuUl, .menuFixo").localScroll({
		duration: 800,
		easing: 'easeInOutExpo',
		offset: {
			top: -150
		}
	});
}


/* =========
   ANIMA BOLHAS
   ========= */
function animaBolhas(){
	var sectionsTop = [];
	$('#sessaoTeleEntrega').each(function(i){
		var $ele = $(this);
		sectionsTop.push($ele.offset().top-windowHeight);
	});

	if (!isiPad && !isiPhone && !isiAndroid){
		$(window).on('scroll load', function(){
			eleTop = $(this).scrollTop();
			for (var i = 0; i < sectionsTop.length; i++) {
				if(eleTop>=(sectionsTop[i]-100)){
					$('#sessaoTeleEntrega:eq('+i+')').find('.bolha').each(function(index){
						var ele = $(this);
						setTimeout(function(){
							ele.find('span').addClass('animabolha');
						}, 50 * index);
					});
				}
			}
		});
	} else {
		$('#sessaoTeleEntrega').find('.bolha span').addClass('animabolha');
	}
}


/* =========
   FILTROS
   ========= */
function filtros(){
	$("input:checkbox").styleRadioCheckbox({
		classChecked:"inputCheckboxChecked",
		classFocus:"inputFocus"
	});

	if(windowWidth < 1024){
		$('.produtosUl').removeClass('scroll')
	}
}


/* =========
   SELECT LOCAL
   ========= */
function selectLocal(){
	var tempo,
		btSelect = $('#btSelectLocal'),
		listaSelect = $('#listaSelectLocal');

	btSelect.on('click', function() {
		listaSelect.slideToggle('fast');
		var ele = $(this);
		ele.find('.icone').toggleClass('iconeCima');
		ele.parent('.blocoSelect').toggleClass('selectAberto');
	});

	// listaSelect.on('mouseleave', function() {
	// 	tempo = setInterval(function() {
	// 		listaSelect.slideUp('fast');
	// 		btSelect.parent('.blocoSelect').removeClass('selectAberto');
	// 		clearInterval(tempo);
	// 	}, 1000);
	// }).on('mouseover', function(){
	// 	clearInterval(tempo);
	// });

	$('#listaSelectLocal .selectLink').on('click', function() {
		var $ele = $(this),
			local = $ele.html();

		btSelect.parent('.blocoSelect').removeClass('selectAberto');
		btSelect.find('.txtSelect').html(local);
		$('input#local').val(local);

		listaSelect.slideUp('fast');
		//clearInterval(tempo);
	});

	$('.encontrarLink, #listaSelectLocal .selectLink').on('click', function(event) {
		var filial = $(this).attr('data-filial');
		$('.contentProdutos').hide().filter('[data-filial$="'+filial+'"]').show();
		$('.encontrarLinkAtivo').removeClass('encontrarLinkAtivo');
		$(this).addClass('encontrarLinkAtivo');
	});
}


/* =========
   SELECT CARDAPIO
   ========= */
function selectCardapio(){
	var tempo,
		btSelect = $('.btSelectCardapio'),
		listaSelect = $('.listaSelectCardapio');

	btSelect.on('click', function() {
		listaSelect.slideToggle('fast');
		$(this).find('.icone').toggleClass('iconeCima');
		$(this).parent('.blocoSelect').toggleClass('selectAberto');
	});

	$('input[name$="categoria"]').on('change', function(event) {
		var $content = $(this).parents('.contentProdutos'),
			cat = $(this).attr('data-categoria'),
			filtroCat = [],
			$receitas = $content.find('.produtosLi');

		if ($(this).is(':checked')){
			$content.find('input[data-categoria$="'+cat+'"]').prop('checked', true).parent().addClass('inputCheckboxChecked');
		} else {
			$content.find('input[data-categoria$="'+cat+'"]').prop('checked', false).parent().removeClass('inputCheckboxChecked');
		}

		$content.find('input[name$="categoria"]:checked').each(function(index, el) {
			filtroCat.push($(this).attr('data-categoria'));
		});
		$.unique(filtroCat);

		$receitas.removeClass('produtoAtivo').removeClass('produtoInativo');
		if (filtroCat.length>0){
			$receitas.each(function(index, el) {
				for (var i = 0; i < filtroCat.length; i++) {
					if($(this).attr('data-categoria').indexOf(filtroCat[i])>0){
						$(this).addClass('produtoAtivo');
					} else {
						$(this).addClass('produtoInativo');
					}
				}
			});
		}
	});
}


/* =========
   VALIDACAO DO FORMULARIO DE CONTATO
   ========= */
function validaForm(){
	$('#trabalhe').on('click', function(event) {
		event.preventDefault();
		$('#contatoForm .relativeFile').show().find('input').removeAttr('tabindex');
	});

	var $form = $('#contatoForm');
	$form.validate({
		ignore: "",
		errorLabelContainer: "#errorContainer",
		errorElement: "div",
		rules: {
			nome:     { required: true },
			email:    { required: true, email: true },
			telefone: { required: true },
			mensagem: { required: true },
		},
		messages: {
			nome: "",
			email: "",
			telefone: "",
			mensagem: ""
		},
		submitHandler: function(form) {
			$('#btEnviarContato').hide();
			$('#btEnviandoContato').show();
			var formData = new FormData(form);
			$.ajax({
				url: 'https://cdn.rawgit.com/srpastel/sr/master/post.contato.php',
				type: 'POST',
				data:  formData,
				mimeType: 'multipart/form-data',
				contentType: false,
				cache: false,
				processData: false,
				success: function(data, textStatus, jqXHR){
					$('#btEnviarContato').show();
					$('#btEnviandoContato').hide();
					if(data==1){
						$('#sucessoContato').fadeTo(1000, 1);
						setTimeout(function() {
							$('#sucessoContato').fadeTo(500, 0);
						}, 4000);
					} else if (data==-1) {
						alert('Seu contato foi considerado como SPAM e não foi enviado.');
					} else {
						$('#erroContato').fadeTo(1000, 1);
					}
				}
			});

			/*$.post($BASE_DIR+'ajax/post.contato.php', $form.serialize(), function(data, textStatus, xhr) {
				$('#btEnviarContato').show();
				$('#btEnviandoContato').hide();
				if(data==1){
					$('#sucessoContato').fadeTo(1000, 1);
					setTimeout(function() {
						$('#sucessoContato').fadeTo(500, 0);
					}, 4000);
				} else if (data==-1) {
					alert('Seu contato foi considerado como SPAM e não foi enviado.');
				} else {
					$('#erroContato').fadeTo(1000, 1);
				}
			});*/
		},

		errorContainer: $('#invalidoContato')
	});
}


/* =========
   ANIMA FOTOS
   ========= */
function animaFotos(){
	var sectionsTop = [],
		sessao = $('#sessaoFotos');

	sessao.each(function(i){
		var $ele = $(this);
		sectionsTop.push($ele.offset().top-windowHeight);
	});

	if (!isiPad && !isiPhone && !isiAndroid){
		$(window).on('scroll load', function(){
			eleTop = $(this).scrollTop();
			for (var i = 0; i < sectionsTop.length; i++) {
				if(eleTop>=(sectionsTop[i]+500)){
					$('#sessaoFotos:eq('+i+')').find('.foto').each(function(index){
						var ele = $(this);
						setTimeout(function(){
							ele.find('.maskFoto').addClass('animaFoto');
						}, 250 * index);
					});

					$('#sessaoFotos:eq('+i+')').find('.boxCirculo').each(function(index){
						var ele = $(this);
						setTimeout(function(){
							ele.find('.circulo').addClass('animaCirculo');
						}, 300 * index);
					});
				}
			}
		});
	} else {
		sessao.find('.maskFoto').addClass('animaFoto');
		sessao.find('.circulo').addClass('animaCirculo');
	}
}



/* =========
   MODAL TELENTREGA
   ========= */
function modalTelentrega(){
	$('.fancybox').fancybox({
		padding: 0,
		margin: 0,
		width: '100%',
		// fitToView : false,
		autoSize: false,
		autoScale: false,
		autoDimensions: false,
		helpers: {
			overlay: {
				css: { 'overflow' : 'auto' }
			}
		}
	});

	$("#btVerCardapio").bind("click", $.fancybox.close);
}

/* =========
   MAPA
   ========= */

var ib, map, geocoder;

function initialize() {
	var mapOptions = {
		zoom: 19,
		center: new google.maps.LatLng(-23.5057449, -47.6150007),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		panControl: false,
		streetViewControl: true,
		disableDefaultUI: true,
		zoomControl: true,
		zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
		draggable: true
	};

	map = new google.maps.Map(document.getElementById('mapa'),mapOptions);
	// geocoder = new google.maps.Geocoder();

	// google.maps.event.addListener(map, "click", function() { ib.close(); });

	
	infowindow = new google.maps.InfoWindow({
		content: "Carregando..."
	});
}

var locais = [
	
	['Sr. Pastel Pastelaria', -23.5057449, -47.6150007, 100, 250, -200,  '<span class="tituloLocal"><span>Sr. Pastel</span><span>Pastelaria</span></span><p class="enderecoLocal">Rua 7 de Setembro, 27 - Centro - Araçoiaba da Serra - São Paulo /SP</p><span class="foneLocal">(15) 3281-1102</span><p class="atendimentoLocal"><span>Atendimento</span><span>Seg. a Sáb. das 8h às 19h00</span></p>'],
];

function createMarker(locais, map){
	var locaisLatLng = new google.maps.LatLng(locais[1], locais[2]);
	var icon = new google.maps.MarkerImage('https://lh3.googleusercontent.com/-uNLBUxdA9bE/VfYDoqRkL8I/AAAAAAAAI7U/mO15QgHBqBc/s300-Ic42/srpastel-map.png', null, null, null, new google.maps.Size(300,190));
	var marker = new google.maps.Marker({
		position: locaisLatLng,
		map: map,
		title: locais[0],
		zIndex: locais[1],
		html: locais[6],
		icon: icon
	});

	var boxText = document.createElement("div");
	boxText.style.cssText = "";
	boxText.innerHTML = marker.html;

	var myOptions = {
		content: boxText,
		disableAutoPan: false,
		maxWidth: 0,
		pixelOffset: new google.maps.Size(locais[4], locais[5]),
		zIndex: 0,
		infoBoxClearance: new google.maps.Size(1, 1),
		isHidden: false,
		pane: "floatPane",
		enableEventPropagation: false
	};

	google.maps.event.addListener(marker, "click", function (e) {
		ib.setOptions(myOptions);
		ib.open(map, this);
		//map.setCenter(marker.getPosition());
	});

	
	ib.open(map, marker);

	// return marker;
}

function setMarkers(map, markers) {
	for (var i = 0; i < markers.length; i++) {
		
	}
}

function sliderBolas(){
	setInterval(function(){
		$('#sessaoFotos .maskFoto').each(function(index, el) {
			var mask = $(this);
			setTimeout(function(){
				mask.find('.fotoImgAtivo').removeClass('fotoImgAtivo').next().addClass('fotoImgAtivo');
				if(mask.find('.fotoImgAtivo').length===0) mask.find('.fotoImg').eq(0).addClass('fotoImgAtivo');
			}, 750*index);
		});
	}, 5000);
}
