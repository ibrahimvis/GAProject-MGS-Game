let box1 = $('#items-1');
let box2 = $('#items-2');
let box3 = $('#items-3');

let box4 = $('#items-4');
let box5 = $('#items-5');
let box6 = $('#items-6');

let box7 = $('#items-7');
let box8 = $('#items-8');
let box9 = $('#items-9');

let winCases = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

let flag = true; // true means x
let counter = 0;

for (let index = 1; index <= 9; index++) {

    var box = $('#items-' + index);

    box.click(function (e) {

        let tmp = $(e.target);

        if (flag) {
            if (tmp.attr('value') == undefined) {
                tmp.css('background-color', 'red');
                tmp.attr('value', 'red');
                flag = !flag;
                counter++;
            } else {
                alert('you cant play in the same place');
            }
        } else {
            if (tmp.attr('value') == undefined) {
                tmp.css('background-color', 'green');
                tmp.attr('value', 'green');
                counter++;
                flag = !flag;
            }

            else {
                alert('you cant play in the same place');
            }
        }

        for (let j = 0; j < winCases.length; j++) {
            if ($('#items-' + winCases[j][0]).attr('value') == 'green' && $('#items-' + winCases[j][1]).attr('value') == 'green' && $('#items-' + winCases[j][2]).attr('value') == 'green') {
                console.log($('#items-' + winCases[j][0]).attr('value') + $('#items-' + winCases[j][1]).attr('value') + $('#items-' + winCases[j][2]).attr('value'));
                
                alert('asjdhjkashdkjah');
            }

            else if ($('#items-' + winCases[j][0]).attr('value') == 'red' && $('#items-' + winCases[j][1]).attr('value') == 'red' && $('#items-' + winCases[j][2]).attr('value') == 'red') {
                console.log($('#items-' + winCases[j][0]).attr('value') + $('#items-' + winCases[j][1]).attr('value') + $('#items-' + winCases[j][2]).attr('value'));
                
                alert('asjdhjkashdkjah');
            }
        }

    });

}
