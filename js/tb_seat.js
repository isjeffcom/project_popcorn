$(document).ready(function() {

    //Seat Chart function
    var sc = $('#cinema-seats').seatCharts({
        map: [
            '___aa___aa___',
            '__aaaaaaaaa__',
            '__aaaaaaaaa__',
            'aaaaaaaaaaaaa',
            '_aaaaaaaaaaa_',
            '__aaaaaaaaa__'
        ],
        seats: {
            a: {
                price   : 12,
                classes : 'front-seat' //your custom CSS class
            }

        },
        click: function () {
            if (this.status() == 'available') {



                if($(".price_single").length>5){

                  $("#seat_alert_text").text("You can only book 6 tickets per order");
                  return 'available';

                }else{
                  var finalPrice = 0;

                  var val = this.node().attr("id");
                  var seat_row = getRow(val.charAt(0));
                  var seat_column = val.substring(val.search('_')+1, val.length);
                  $("#seat_to_ticket").append("<ul class='seat_ticket_single' id='stt_"+val+"'><li><a>SEAT</a><a class='tk_position'> "+seat_row + seat_column+"</a></li><li>&#163;<a style='color:#A6792C;font-size:1.1em;' class='price_single'>"+this.data().price+"</a></li></ul>");
                  if($(".price_single")){
                    $(".price_single").each(function(){
                      finalPrice = finalPrice + parseInt($(this).text());
                    })
                  }
                  $("#seat_final_price").html("&#163;" + finalPrice);
                  return 'selected';
                }
                //console.log($("#cinema-seats").find('.seatCharts-row:eq(0) .seatCharts-cell:eq(3)').text(), 'III', '3rd column header has correct label.');

            } else if (this.status() == 'selected') {
                var finalPrice = 0;
                var sid = this.node().attr("id");
                $("#stt_"+sid).remove();
                if($(".price_single")){
                  $(".price_single").each(function(){
                    finalPrice = finalPrice + parseInt($(this).text());
                  })
                }
                $("#seat_final_price").html("&#163;" + finalPrice);
                //seat has been vacated
                return 'available';
            } else if (this.status() == 'unavailable') {

                //seat has been already booked
                return 'unavailable';
            } else {
                return this.style();
            }
        },
        naming: {
            getLabel: () => '',

        },
    });

    // get taken seats from server and update seating
    sc.get(['1_4', '3_8']).status('unavailable');

    //Make all available 'c' seats unavailable
    sc.find('c.available').status('unavailable');

    /*
    Get seats with ids 2_6, 1_7 (more on ids later on),
    put them in a jQuery set and change some css
    */
    sc.get(['2_6', '1_7']).node().css({
        color: '#ffcfcf'
    });

    //console.log('Seat 1_4 costs ' + sc.get('1_4').data().price + ' and is currently ' + sc.status('1_4'));
    function getRow(i){
      var getRow_n = [1, 2, 3, 4, 5, 6];
      var getRow_c = ['A', 'B', 'C', 'D', 'E', 'F'];
      return getRow_c[getRow_n.indexOf(parseInt(i))];
    }



});
