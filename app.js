//API variables:
const api_url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
var exchangeRate;

//UI variables:
var titleText
var firstTime = true;
var inputWidth;
var inputHeight;

function setup()
{
    getRate();
    setInterval(getRate, 1000);

    //API call function
    async function getRate()
    {
        response = await fetch (api_url);
        data = await response.json();
        rate = data.bpi.USD.rate;
        var exchangeRate = Number(rate.replace(',',''));

        drawCanvas();
        setInterval(drawCanvas, 100);

        //Draws canvas
        function drawCanvas()
        {
            clear();
            createCanvas(windowWidth, windowHeight);
            background(51);
            textAlign(CENTER, CENTER);
            textSize(width/32);
            fill(255);
            textFont('Oswald');

            inputWidth = width/10;
            inputHeight = inputWidth/3;

            titleText = text(`ONE BTC IS $${rate} USD`, width/2, height/12);
       

            if (firstTime) {
                btcInput = createInput('BTC').addClass('input').id('btcInput');
                swcInput = createInput('SwC').addClass('input').id('swcInput');
                usdInput = createInput('USD').addClass('input').id('usdInput');

                //Position and size buttons
                btcInput.position(width/2 - inputWidth*2, height/2 - inputHeight)
                .size(inputWidth, inputHeight);
                swcInput.position(width/2 - inputWidth/2, height/2 - inputHeight)
                .size(inputWidth, inputHeight);
                usdInput.position(width/2 + inputWidth, height/2 - inputHeight)
                .size(inputWidth, inputHeight);

                btcInput.changed(convertFromBTC)
                swcInput.changed(convertFromSWC)
                usdInput.changed(convertFromUSD)

                firstTime = false;
            }

            function convertFromBTC() {
                var btcValue = Number(document.getElementById("btcInput").value);
                var swcValue = btcValue * 1000000;
                var usdValue = round(btcValue * exchangeRate);

                document.getElementById('swcInput').value = swcValue;
                document.getElementById('usdInput').value = usdValue;

            }

            function convertFromSWC() {
                var swcValue = Number(document.getElementById("swcInput").value);
                var btcValue = swcValue / 1000000;
                var usdValue = btcValue * exchangeRate;

                document.getElementById('btcInput').value = btcValue;
                document.getElementById('usdInput').value = usdValue;

            }

            function convertFromUSD() {
                var usdValue = Number(document.getElementById("usdInput").value);
                var btcValue = usdValue / exchangeRate;
                var swcValue = round(btcValue * 1000000);

                document.getElementById('btcInput').value = btcValue;
                document.getElementById('swcInput').value = swcValue;

            }


            

        }
    
    }
    
}

function windowResized()
{
    btcInput.remove();
    swcInput.remove();
    usdInput.remove();

    firstTime = true;

}







