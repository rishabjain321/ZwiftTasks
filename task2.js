var assert = require("assert");
const { Console } = require("console");
var webdriver = require("selenium-webdriver");
var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();


async function initiate(){
    await driver.get("http://zwift.com");
    await driver.manage().window().maximize();
}

function wait(){
    driver.wait(function() {
        return driver.executeScript('return document.readyState').then(function(readyState) {
          return readyState === 'complete';
        });
      });
}

async function title(){
    console.log("Page Verification started"); 
      await driver.getTitle().then(function(title) {
        console.log("Title is "+ title);
        assert(title === "Zwift | Events on Zwift" );
        });
        console.log("Page Verification completed.");
}

async function selectText(text){
    console.log("selectText started");
    await driver.findElement(webdriver.By.xpath("(//*[contains(text(), '"+ text +"')])[1]"))
    .then(function(webElement){
    webElement.click();
    });
    console.log("selectText completed.");
}

async function selectFromDropdown(i,value){
    console.log("selectFromDropdown started");
    const selected_value = webdriver.By.xpath("//*[contains (text(), '"+ value +"')]");
    await driver.findElement(webdriver.By.xpath("(//*[@id='filter-location'])["+i+"]")).click();
    await driver.findElement(selected_value).click();
    console.log("selectFromDropdown completed");
    }

async function eventUpdate() {
        console.log("trying to scroll down");
            element = (await driver).findElement(webdriver.By.xpath("(//*[@class = 'tab-header'])[1]"));
            await driver.executeScript("arguments[0].scrollIntoView()", element);
            preEvent = (await driver).findElement(webdriver.By.xpath("(//*[@class = 'header-title'])[1]"))
            .getText().then(function(preEvent){
                console.log(preEvent);
                selectFromDropdown(1,"Cycling");
                selectFromDropdown(3,"E (Open)");
                selectFromDropdown(4,"Evening");
                postEvent = driver.findElement(webdriver.By.xpath("(//*[@class = 'header-title'])[1]")).getText();
                if(postEvent === "No results."){
                console.log("No Event available.");
                }else if(postEvent != preEvent){
                    console.log("Event changed.");
                }else{
                    console.log("Change parameters to check.");
                };
            });
    };

    function countOfEvents(){
       let array = driver.findElements(webdriver.By.xpath("//*[@class='tab-listing']"));
       const count = array.length;
       console.log(count);
    }

    
initiate()
.then (selectText("Events"))
.then (wait)
.then (title)
.then (eventUpdate);