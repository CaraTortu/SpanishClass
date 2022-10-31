// Sets completion percentage
function SetPercentage() {
    $.ajax({
        type: "POST",
        url: "/api/progress",
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(r) { 
            allValues = JSON.parse(r);
            $("#principiante").html("Principiante - " + allValues.p + "%");
            $("#intermedio").html("Intermedio - " + allValues.m + "%");
            $("#avanzado").html("Avanzado - " + allValues.a + "%");
        }
    });
}

// Fills the website's links
function GenerateLinks() {

    var colours = ["btn-secondary", "btn-dark"]
    var Principiante = '<div class="row">';
    var Medio = '<div class="row">';
    var Avanzado = '<div class="row">';

    for (var i = 1; i<51; i++) {
        if (i<16) {
            Principiante += '<a class="btn ' + colours[i%2] + '" data-bs-toggle="collapse" href="#unit' + i + '" role="button" aria-expanded="false" aria-controls="unit' + i + '">Unidad ' + i + '</a>';
            Principiante += '<div class="collapse row" id="unit' + i + '"><div class="col-2 container">';    
        } else if (i < 31 && i > 15) {
            Medio += '<a class="btn ' + colours[i%2] + '" data-bs-toggle="collapse" href="#unit' + i + '" role="button" aria-expanded="false" aria-controls="unit' + i + '">Unidad ' + i + '</a>';
            Medio += '<div class="collapse row" id="unit' + i + '"><div class="col-2 container">';    
        } else {
            Avanzado += '<a class="btn ' + colours[i%2] + '" data-bs-toggle="collapse" href="#unit' + i + '" role="button" aria-expanded="false" aria-controls="unit' + i + '">Unidad ' + i + '</a>';
            Avanzado += '<div class="collapse row" id="unit' + i + '"><div class="col-2 container">';    
        }

        for (var j = 1; j<10; j++) {
            if (i<16) {
                Principiante += '<div class="row my-1"><input type="checkbox" class="col-2" id="unit' + i + '-' + j + '"><div class="col-1"></div><a class="btn btn-success col-8" href="#unit' + i + '-' + j + '" role="button" id="unit' + i + '-' + j + '">' + i + '.' + j + '</a></div>';   
            } else if (i < 31 && i > 15) {
                Medio += '<div class="row my-1"><input type="checkbox" class="col-2" id="unit' + i + '-' + j + '"><div class="col-1"></div><a class="btn btn-success col-8" href="#unit' + i + '-' + j + '" role="button" id="unit' + i + '-' + j + '">' + i + '.' + j + '</a></div>';  
            } else {
                Avanzado += '<div class="row my-1"><input type="checkbox" class="col-2" id="unit' + i + '-' + j + '"><div class="col-1"></div><a class="btn btn-success col-8" href="#unit' + i + '-' + j + '" role="button" id="unit' + i + '-' + j + '">' + i + '.' + j + '</a></div>';  
            }
        }

        if (i<16) {
            Principiante += '</div><div class="col-10 container mt-1">';
            Principiante += '<div class="collapse mx-auto" id="ContentManager-' + i + '">';
            Principiante += '<video id="Video-unit' + i + '" controls></video>';
            Principiante += '<h3 class="mt-2">PDF para la clase</h3>';
            Principiante += '<a id="PDF-unit' + i + '">Link para el PDF</a>';
            Principiante += '<h3 class="mt-2">Audiolibro</h3>';
            Principiante += '<audio class="my-2" id="Audiolibro-unit' + i + '" controls></audio>';
            Principiante += '</div></div></div>'; 
        } else if (i < 31 && i > 15) {
            Medio += '</div><div class="col-10 container mt-1">';
            Medio += '<div class="collapse mx-auto" id="ContentManager-' + i + '">';
            Medio += '<video id="Video-unit' + i + '" controls></video>';
            Medio += '<h3 class="mt-2">PDF para la clase</h3>';
            Medio += '<a id="PDF-unit' + i + '">Link para el PDF</a>';
            Medio += '<h3 class="mt-2">Audiolibro</h3>';
            Medio += '<audio class="my-2" id="Audiolibro-unit' + i + '" controls></audio>';
            Medio += '</div></div></div>';        
        } else {
            Avanzado += '</div><div class="col-10 container mt-1">';
            Avanzado += '<div class="collapse mx-auto" id="ContentManager-' + i + '">';
            Avanzado += '<video id="Video-unit' + i + '" controls></video>';
            Avanzado += '<h3 class="mt-2">PDF para la clase</h3>';
            Avanzado += '<a id="PDF-unit' + i + '">Link para el PDF</a>';
            Avanzado += '<h3 class="mt-2">Audiolibro</h3>';
            Avanzado += '<audio class="my-2" id="Audiolibro-unit' + i + '" controls></audio>';
            Avanzado += '</div></div></div>';
        }
    }

    $("#p").html(Principiante);
    $("#i").html(Medio);
    $("#a").html(Avanzado);
}

// Sets HTML button progress
function SetCheckboxes() {
    $.ajax({
        type: "GET",
        url: "/api/progress",
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(r) { 
            allValues = JSON.parse(r);
            
            for (var unit in allValues) {
                if (allValues[unit] == "true") { $("#"+unit).prop('checked', true); }
            }
        }
    });
}

// Update DB progress value
function UpdateValue(unit, status) {
    $.ajax({
        type: "PUT",
        url: "/api/progress",
        contentType: 'application/json',
        data: JSON.stringify({"unit": unit, "action": status}),
        success: function(r) { 
            allValues = JSON.parse(r);
            $("#principiante").html("Principiante - " + allValues.p + "%");
            $("#intermedio").html("Intermedio - " + allValues.m + "%");
            $("#avanzado").html("Avanzado - " + allValues.a + "%");
        }
    });
}

// Changes viewer value
function ContentManager(id) {
    if (id.length == 7) {
        var trueid = id.substring(4,5)
    } else {
        var trueid = id.substring(4,6)
    }

    $.ajax({
        type: "POST",
        url: "/api/content",
        contentType: 'application/json',
        data: JSON.stringify({"unit": id}),
        success: function(r) { 
            allValues = JSON.parse(r);
            $("#Video-unit"+trueid).attr("src", allValues.video);
            $("#PDF-unit"+trueid).attr("href", allValues.pdf);
            $("#Audiolibro-unit"+trueid).attr("src", allValues.audio);
            $("#ContentManager-"+trueid).collapse()
        }
    });
}

// Set completion percentage
SetPercentage();

// Fill HTML
GenerateLinks();

// Set checkboxes
SetCheckboxes();

// Check when checkbox status is changed
$('input:checkbox').change(
    function(){
        if ($(this).is(':checked')) {
            UpdateValue(this.id, "true")
        } else {
            UpdateValue(this.id, "false")
        }
    });

// Check when any "a" tag is clicked and do actions accordingly
$("a").click( function() {
    if (this.id.substring(0,4) == "unit") {
        ContentManager(this.id);
    }
});