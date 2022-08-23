        $(document).ready(function() {
            $(".SalesDropdown img.flag").addClass("flagvisibility");

            $(".SalesDropdown dt a").click(function() {
                $(".SalesDropdown dd ul").toggle();
            });
                        
            $(".SalesDropdown dd ul li a").click(function() {
                var text = $(this).html();
                $(".SalesDropdown dt a span").html(text);
                $(".SalesDropdown dd ul").hide();
                $("#result").html("Selected value is: " + getSelectedValue("sample"));
            });
                        
            function getSelectedValue(id) {
                return $("#" + id).find("dt a span.value").html();
            }

            $(document).bind('click', function(e) {
                var $clicked = $(e.target);
                if (! $clicked.parents().hasClass("SalesDropdown"))
                    $(".SalesDropdown dd ul").hide();
            });


            $("#flagSwitcher").click(function() {
                $(".SalesDropdown img.flag").toggleClass("flagvisibility");
            });
        });