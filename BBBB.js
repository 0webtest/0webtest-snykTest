$(document).ready(function() {
	$('.terms').click(function() {
		$('.overlay').fadeIn();
	});

	$('.terms1').click(function() {
		$('.overlay1').fadeIn();
	});

	$('.terms2').click(function() {
		$('.overlay2').fadeIn();
	});

	$('.terms3').click(function() {
		$('.overlay3').fadeIn();
	});

	$('.terms4').click(function() {
		$('.overlay4').fadeIn();
	});
	
	$('.closeButton').click(function() {
		$('.overlay').fadeOut();
		$('.overlay1').fadeOut();
		$('.overlay2').fadeOut();
		$('.overlay3').fadeOut();
	    $('.overlay4').fadeOut();
	});

	$('.uyelikClose').click(function() {
		$('.uyelikSonAdim').fadeOut();
	});

	$('.uyelikClose2').click(function() {
		$('.uyelikDogrulamaEkran').fadeOut();
	});

	$('.uyelikClose3').click(function() {
		$('.uyelikDogrulamaEkranHata').fadeOut();
	});

	$('.uyelikDogrulamaEkranHata').click(function() {
		$('.uyelikDogrulamaEkranHata').fadeOut();
	});
	
	$('.hesapBasariliClose').click(function() {
		$('.hesapBasarili').fadeOut();
	});

	//$("#kurumsalForm").validate();

	$("#ceptel").mask("(0) 999 999 99 99");

	$("#ceptel").on("blur", function() {
	    var last = $(this).val().substr( $(this).val().indexOf("-") + 1 );
	    
	    if( last.length == 3 ) {
	        var move = $(this).val().substr( $(this).val().indexOf("-") - 1, 1 );
	        var lastfour = move + last;
	        
	        var first = $(this).val().substr( 0, 9 );
	        
	        $(this).val( first + '-' + lastfour );
	    }
	});

	$('[data-toggle="datepicker"]').datepicker({
		format: 'dd.mm.yyyy'
	});

	$.validator.addMethod("valueNotEquals", function(value, element, arg){
		return arg !== value;
	}, "Value must not equal arg.");

	$("#kurumsalForm").validate({
		rules: {
			ad: "required",
			soyad: "required",
			dtarihi: "required",
			eposta: {
				required: true,
				email: true
			},
			cinsiyet: "required",
			adres: "required",
			ceptel: "required",
			/*firma: "required",
			unvan: { 
				valueNotEquals: "Lütfen Ünvanınızı Seçiniz"
			},*/
			il: { 
				valueNotEquals: "Lütfen Il Seçiniz"
			},
			ilce: { 
				valueNotEquals: "Lütfen Ilçe Seçiniz"
			}
		},
		messages: {
			ad: "Lütfen adınızı giriniz.",
			soyad: "Lütfen soyadınızı giriniz.",
			dtarihi: "Lütfen doğum tarihinizi giriniz.",
			eposta: "Lütfen geçerli eposta adresi giriniz.",
			cinsiyet: "Lütfen cinsiyetinizi belirtiniz.",
			adres: "Lütfen adresinizi giriniz.",
			ceptel: "Lütfen cep telefonunuzu giriniz.",
			il: { 
				valueNotEquals: "Lütfen seçim yapınız." 
			},
			ilce: { 
				valueNotEquals: "Lütfen seçim yapınız." 
			}
			/*firma: "Lütfen firma adınızı giriniz.",
			unvan: { 
				valueNotEquals: "Lütfen seçim yapınız." 
			}*/
		}
	});

	$("#onayKoduForm").validate({
		rules: {
			onay: {
				required: true,
				maxlength: 8
			}

		},
		messages: {
			onay: "Lütfen kodu giriniz."
		}
	});

	$("#vKeyboard").mask("99999999");

	$('.vKeyboard .row div').not('.notShuffle').click(function(){
		var value = $(this).text();
	    var input = $('#vKeyboard');
	    if(input.val().length < 8) {
	    	input.val(input.val() + value);
	    }
	    return false;
	});

	$("#shuffle").click(function(){
		$('.vKeyboard .row div').not('.notShuffle').shuffle();
	});


	$('#backspace').click(function(){
        $('#vKeyboard').val('');
    });


	setFillCities(34);
        setCityChange(34,0);

});


function setFillCities(selectcityid) {

    if($('.city').length > 0) {
        $.getJSON( "kurumsal/js/Turkiye-Il-Ilce.json", function( data ) {
            $('.city').html('<option value="" disabled selected>Lütfen seçim yapınız.</option>');
            cities = data.sort(function(a,b){ return a.il.localeCompare(b.il);});
            for(var i = 0; i < cities.length;i++){
                $('.city').append('<option value="'+ cities[i].plaka +'" '  + (selectcityid == cities[i].plaka  ? ' selected ' : '') +  ' >' + cities[i].il + '</option>');
            }
        });
        $('.city').change(function(){
            setCityChange($(this).val(),0);
        });
    }

}

function setCityChange(value,selectdistrictid){
   
    $('.county').html('<option value="" disabled selected>Lütfen seçim yapınız.</option>');
    $.getJSON( "kurumsal/js/ililce.json", function( data ) {
            districts = data.sort(function(a,b){ return a.il.localeCompare(b.il);});
            for(var i = 0; i < districts.length;i++){
                if (districts[i].plaka == value)
                 $('.county').append('<option value="'+ districts[i].id +'" '  + (selectdistrictid == districts[i].id  ? ' selected ' : '') +  '>'+districts[i].ilce+'</option>');
            }
        });
     
}

(function($){
 
    $.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };
 
})(jQuery);
