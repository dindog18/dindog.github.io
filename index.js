// array with texts to type in typewriter
var dataText1 = ["Hi!", "I'm Aladin Yu.", "What's your name?"];
var dataText2 = ["Nice to meet you", "Welcome to my pages!"];

// type one text in the typwriter
// keeps calling itself until the text is finished
function typeWriter(text, i, fnCallback) {
    // check if text isn't finished yet
    if (i < (text.length)) {
        // add next character to h1
        document.querySelector(".introduce").innerHTML = text.substring(0, i + 1) + '<span class="intro_lines" aria-hidden="true"></span>';

        // wait for a while and call this function again for next character
        setTimeout(function () {
            typeWriter(text, i + 1, fnCallback)
        }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
        // call callback after timeout
        setTimeout(fnCallback, 700);
    }
}

document.addEventListener('DOMContentLoaded', function (event) {

    document.querySelector(".homemain").style.display = 'none';
    function Block() {
        document.querySelector(".form").style.display = 'block';
    }

    // start a typewriter animation for a text in the dataText1 array
    function StartTextAnimation(i) {
        if (typeof dataText1[i] == 'undefined') {
            Block();
        }
        // check if dataText1[i] exists
        else if (i <= dataText1[i].length) {
            // text exists! start typewriter animation
            typeWriter(dataText1[i], 0, function () {
                // after callback (and whole text has been animated), start next text
                if (i < dataText1[i].length) {
                    StartTextAnimation(i + 1);
                }
            });
        }
    }
    // start the text animation
    StartTextAnimation(0);
});

document.addEventListener('keypress', function (event) {
    function Unblock() {
        document.querySelector(".form").style.display = 'none';
    }

    function StartTextAnimation2(i, name) {
        if (typeof dataText2[i] == 'undefined') {
            document.querySelector(".introduction").style.display = 'none';
            document.querySelector(".homemain").style.display = 'block';
        }
        // check if dataText1[i] exists
        else if (i <= dataText2[i].length) {
            // text exists! start typewriter animation
            if (name === undefined) {
                typeWriter(dataText2[i], 0, function () {
                    // after callback (and whole text has been animated), start next text
                    if (i < dataText2[i].length) {
                        StartTextAnimation2(i + 1);
                    }
                });
            } else if (name === "") {
                typeWriter(dataText2[i].concat("!"), 0, function () {
                    // after callback (and whole text has been animated), start next text
                    if (i < dataText2[i].length + name.length) {
                        StartTextAnimation2(i + 1);
                    }
                });
            } else {
                typeWriter(dataText2[i].concat(" ", name, "!"), 0, function () {
                    // after callback (and whole text has been animated), start next text
                    if (i < dataText2[i].length + name.length) {
                        StartTextAnimation2(i + 1);
                    }
                });
            }
        }
    }

    if (event.key === "Enter") {
        Unblock();
        person_name = document.querySelector('.user_name').value;
        StartTextAnimation2(0, person_name);
    }
})