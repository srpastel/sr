/* ============
   FUNCOES GERAIS
   ============ */
function linkExterno(){
	$('a[rel=blank]').click(function(){
		window.open(this.href);
		return false;
	});
}

function placeHolder(){
	$('.input, .textarea').on('keyup',function(){
		if($(this).val()===''){ $(this).prev().show(); }
	}).on('keydown',function(){
		$(this).prev().hide();
	}).on('change',function(){
		if ($(this).val()===''){ $(this).prev().show(); } else { $(this).prev().hide(); }
	}).on('focusout',function(){
		$(this).prev().fadeTo(0,1);
		if ($(this).val()===''){ $(this).prev().show(); $(this).parent().find('.erro').show(); } else { $(this).prev().hide(); $(this).parent().find('.erro').hide(); }
	}).on('focusin',function(){
		if ($(this).val()===''){ $(this).prev().show(); $(this).prev().fadeTo(0,0.3); } else { $(this).prev().hide(); }
	}).each(function(){
		if ($(this).val()===''){ $(this).prev().show(); } else { $(this).prev().hide(); }
	});
}

function linguagem(){
	$('.btLang').on('click', function(){
		// <a href="javascript:;" class="btLang en" data-idioma="en">EN</a>
		var lang = $(this).attr('data-idioma');
		$.cookie($CLIENTE+'_linguagem', lang, { expires: 365, path: '/' });
		window.location.reload();
	});
}

function selectPersonalizado(){
	$('.selectPrs').css('opacity', 0).on('change', function(){
		var ele = $(this);
		var val = ele.find('option:selected').text();
		ele.prev().text(val);
	});
}

function radioPersonalizado(){
	$('.radioPrs').css('opacity', 0).on('change', function(){
		var ele = $(this);
		var eleName = ele.attr('name');
		if(ele.is(':checked')){
			$('input[name="'+eleName+'"]').parent().removeClass('checked');
			ele.parent().addClass('checked');
		} else {
			ele.parent().removeClass('checked');
		}
	});

	$('.labelRadio').on('click', function(e){
		e.preventDefault();
		$(this).children('input').trigger('click');
	});
}

function checkboxPersonalizado(){
	$('.checkPrs').css('opacity', 0).on('change', function(){
		var ele = $(this);
		if(ele.is(':checked')){
			ele.parent().addClass('checked');
		} else {
			ele.parent().removeClass('checked');
		}
	});

	$('.labelCheck').on('click', function(e){
		e.preventDefault();
		$(this).children('input').trigger('click');
	});
}

function filePersonalizado(){
	$('.filePrs').css('opacity', 0).on('change', function(){
		var ele = $(this);
		var val = ele.val();
		ele.prev().text(val);
	});
}

var $window = $(window);
var windowHeight = $window.height();
var windowWidth = $window.width();


/* ============
   FUNCOES PROJETO
   ============ */
function init(){
	placeHolder();
	showErros();
	imgRetina();
	selectPersonalizado();
	abrirMenu();
	menuFixo();

	if (isiPhone){
		$window.scrollTop(1);
	}

	if (!isiPad && !isiPhone && !isiAndroid){
		//$('.scroll').jScrollPane({autoReinitialise: true});
	}
}

$(window).on('resize', function(){
	windowHeight = $window.height();
	windowWidth = $window.width();
	menuFixo();
});


/* ============
   PAGINA DE ERROS
   ============ */
function showErros(){
	$('#boxErro').stop().animate({
		height: 220
	}, 500, 'linear');

	$('.btClose').on('click', function(){
		$('#boxErro').stop().animate({
			height: 0
		}, 200, 'linear');

		$('.containerErro').delay(50).hide();
	});

	$('.btFade').hover(function(){
		$(this).children('span').stop().fadeTo(200,1);
	}, function(){
		$(this).children('span').stop().fadeTo(200,0);
	});

	$('.boxAtualize').stop().animate({
		marginLeft: 0,
		opacity: 1
	}, 500, 'easeOutElastic');

	$('.boxTxtAtualize').stop().delay(220).animate({
		opacity: 1
	}, 500, 'linear');

	$('.btDownload').stop().delay(220).animate({
		right: 0,
		opacity: 1
	}, 500, 'easeInOutBack');

	$('.btClose').stop().delay(220).animate({
		top: 10,
		opacity: 1
	}, 500, 'easeInOutBack');
}



/* ============
   RETINA
   ============ */
function imgRetina(){
	Retina = function() {
		return {
			init: function(){
				var pixelRatio = !!window.devicePixelRatio ? window.devicePixelRatio : 1;
				if (pixelRatio > 1) {
					$("img").each(function(idx, el){
						el = $(el);
						if (el.attr("data-src2x")) {
							el.attr("src", el.attr("data-src2x"));
						}
					});
				}
			}
		};
	}();
	Retina.init();
}



/* ============
   MENU MOBILE
   ============ */
function abrirMenu(){
	var divMenu = $('.menu');
	
	$('.btMenu').on('click', function() {
		var ele = $(this);
		ele.toggleClass('btMenuAberto');
		
		if (divMenu.is(":hidden")) {
			divMenu.show();
			$("html, body").animate({ scrollTop: "1px" });
		}  else {
			divMenu.hide();
		}
	});
}



/* ============
   MENU FIXO
   ============ */
function menuFixo(){
	if (!isiPad && !isiPhone && !isiAndroid) {
		var menuFixo = $('.menuFixo'),
			posInicialMenuFixo = $('.blocoBolhas').offset().top;

		if (windowWidth > 1023 ){ menuFixo.show(); } else { menuFixo.hide();}

		$(window).on('scroll',function() {
			var scr = $(window).scrollTop();
			if (scr >= posInicialMenuFixo) {
				menuFixo.addClass('menuFixoShow');
			} else {
				menuFixo.removeClass('menuFixoShow');
			}
		});

		// var top = 0;
		// $window.on('scroll load', function() {
		// 	var sections = [];
		// 	var sectionsTop = [];
		// 	$('.sessao').each(function(i){
		// 		var $ele = $(this);
		// 		sections.push('#'+$ele.attr('id'));
		// 		sectionsTop.push($ele.offset().top - 100);
		// 	});

		// 	sections.push('#');
		// 	sectionsTop.push($('#wrapper').height());

		// 	top = $window.scrollTop();

		// 	for (var i = 0; i < sections.length; i++) {
		// 		if(top>=sectionsTop[i] && top<sectionsTop[i+1]){
		// 			$('.menuFixo .menuLink').removeClass('menuLinkAtivo');
		// 			$('.menuFixo').find('.menuLink[href$="'+sections[i]+'"]').addClass('menuLinkAtivo');
		// 		}
		// 	}
		// });
	};
}


/* ============
   MODAL
   ============ */
function modal(){
	$(".btModal").fancybox({
		maxWidth	: 620,
		minWidth    : 270,
		fitToView	: false,
		width		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',

		autoScale         : false,
		autoDimensions    : false,
		helpers : {
			overlay : {
				css : { 'overflow' : 'auto' }
			}
		}
	});
}


