(function ($) {

    $('#show').hide();
    $('#homeLink').hide();

    $('#dt_language').hide();
    $('#dt_genre').hide();
    $('#dt_rating').hide();
    $('#dt_network').hide();
    $('#dt_summary').hide();
    $('#image').hide();

    $('#name').hide();
    $('#language').hide();
    $('#genre').hide();
    $('#rating').hide();
    $('#network').hide();
    $('#summary').hide();

    $('#homeLink').click(function () {
        location.reload();
    });

    var searchForm = $('#searchForm'),
        searchInput = $('#search_term');

    const errorContainer = document.getElementById('error-container');
    const errorTextElement = errorContainer.getElementsByClassName(
        'text-goes-here'
    )[0];

    searchForm.submit(function (event) {
        event.preventDefault();
        var search = searchInput.val().trim();
        if (search) {
            errorContainer.classList.add('hidden');

            $.ajax({
                url: 'http://api.tvmaze.com/search/shows?q=' + search,
                type: 'GET',

                success: function (result) {
                    $('#showList').empty()
                    $('#show').hide();

                    $('#showList').show();

                    $('#dt_language').hide();
                    $('#dt_genre').hide();
                    $('#dt_rating').hide();
                    $('#dt_network').hide();
                    $('#dt_summary').hide();
                    $('#image').hide();

                    $('#name').hide();
                    $('#language').hide();
                    $('#genre').hide();
                    $('#rating').hide();
                    $('#network').hide();
                    $('#summary').hide();

                    $('#homeLink').show();

                    $.each(result, function (index, el) {
                        $('#showList').append("<li><a href=" + el.show._links.self.href + ">" + el.show.name + "</a></li>");
                    });

                    $("#search_term").val('');
                    $("#search_term").focus();


                    $('a').click(function (event) {
                        $('#showList').hide();

                        $('#show').show();

                        $('#dt_language').show();
                        $('#dt_genre').show();
                        $('#dt_rating').show();
                        $('#dt_network').show();
                        $('#dt_summary').show();
                        $('#image').show();

                        $('#name').show();
                        $('#language').show();
                        $('#genre').show();
                        $('#rating').show();
                        $('#network').show();
                        $('#summary').show();

                        $('#homeLink').show();

                        event.preventDefault();

                        $.ajax({
                            url: $(this).attr('href'),
                            success: function (response) {
                                $("#name").text(response.name);

                                if (response.image) {
                                    var url = response.image.medium;
                                    $.ajax({
                                        url: url,
                                        cache: true,
                                        processData: false,
                                    }).always(function () {
                                        $("#image").attr("src", url).fadeIn();
                                    });
                                } else {
                                    $("#image").attr("src", "public/image/no_image.jpeg")
                                }

                                if (response.language) {
                                    $("#language").text(response.language);
                                } else {
                                    $("#language").text("N/A");
                                }

                                $('#genre').empty()
                                if (response.genres.length > 0) {
                                    $.each(response.genres, function (index, gen) {
                                        $('#genre').append("<li>" + gen + "</li>");
                                    });
                                } else {
                                    $('#genre').append("<li>" + "N/A" + "</li>");
                                }

                                if (response.rating.average) {
                                    $("#rating").text(response.rating.average);
                                } else {
                                    $("#rating").text("N/A");
                                }

                                if (response.network) {
                                    $("#network").text(response.network.name);
                                } else {
                                    $("#network").text("N/A");
                                }

                                if (response.summary) {
                                    var text = response.summary
                                    text = text.replace(/<[^>]*>?/gm, '');
                                    $("#summary").text(text);
                                } else {
                                    $("#summary").text("N/A");
                                }
                            }
                        });
                        return false;
                    });


                },

                error: function (request, error) {
                    alert("Request: " + JSON.stringify(request));
                }
            });

        } else {
            errorContainer.classList.remove('hidden');
            errorTextElement.textContent = 'You must enter a value';
            $("#search_term").val('');
            $("#search_term").focus();
        }
    });

})(window.jQuery);

$(window).on('load', function () {
    $('#showList').hide();

    $('#show').hide();
    $('#homeLink').hide();

    $('#dt_language').hide();
    $('#dt_genre').hide();
    $('#dt_rating').hide();
    $('#dt_network').hide();
    $('#dt_summary').hide();
    $('#image').hide();

    $('#name').hide();
    $('#language').hide();
    $('#genre').hide();
    $('#rating').hide();
    $('#network').hide();
    $('#summary').hide();


    $.ajax({
        url: 'http://api.tvmaze.com/shows',
        type: 'GET',
        success: function (result) {

            $('#showList').empty()
            $('#show').hide();
            $('#showList').show();

            $('#homeLink').hide();

            $.each(result, function (index, el) {
                $('#showList').append("<li><a href=" + el._links.self.href + ">" + el.name + "</a></li>");
            });

            $('a').click(function (event) {

                $('#showList').hide();

                $('#show').show();

                $('#dt_language').show();
                $('#dt_genre').show();
                $('#dt_rating').show();
                $('#dt_network').show();
                $('#dt_summary').show();
                $('#image').show();

                $('#name').show();
                $('#language').show();
                $('#genre').show();
                $('#rating').show();
                $('#network').show();
                $('#summary').show();

                $('#homeLink').show();

                event.preventDefault();

                $.ajax({
                    url: $(this).attr('href'),
                    success: function (response) {
                        $("#name").text(response.name);
                        if (response.image) {
                            var url = response.image.medium;
                            $.ajax({
                                url: url,
                                cache: true,
                                processData: false,
                            }).always(function () {
                                $("#image").attr("src", url).fadeIn();
                            });
                        } else {
                            $("#image").attr("src", "public/image/no_image.jpeg")
                        }

                        if (response.language) {
                            $("#language").text(response.language);
                        } else {
                            $("#language").text("N/A");
                        }

                        $('#genre').empty()
                        if (response.genres.length > 0) {
                            $.each(response.genres, function (index, gen) {
                                $('#genre').append("<li>" + gen + "</li>");
                            });
                        } else {
                            $('#genre').append("<li>" + "N/A" + "</li>");
                        }


                        if (response.rating.average) {
                            $("#rating").text(response.rating.average);
                        } else {
                            $("#rating").text("N/A");
                        }

                        if (response.network) {
                            $("#network").text(response.network.name);
                        } else {
                            $("#network").text("N/A");
                        }

                        if (response.summary) {
                            var text = response.summary
                            text = text.replace(/<[^>]*>?/gm, '');
                            $("#summary").text(text);
                        } else {
                            $("#summary").text("N/A");
                        }
                    }
                });
                return false;
            });

        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });

});