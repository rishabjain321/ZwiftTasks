var assert = require("assert");
var webdriver = require("selenium-webdriver");
var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();


async function initiate(){
    await driver.get("http://zwift.com");
    await driver.manage().window().maximize();
}

function title(){
      driver.getTitle().then(function(title) {
        console.log("Page Verification started");  
        console.log("Title is "+ title);
        assert(title === "The at Home Cycling & Running Virtual Training App" );
        console.log("Page Verification completed");
        });
}


function presence(){
    console.log("Check for Presence started");
    driver.findElement(webdriver.By.xpath("(//*[contains(text(), 'Events')])[1]")).then(function(webElement){
        console.log("Element exists.");
    },function(err){
        if(err.state && err.state === 'no such element'){
            console.log("Element not found.");
        }else{
            webdriver.promise.rejected(err);
        }
    }) 
    console.log("Check for Presence completed");
}


function closeBrowser(){
    console.log("Browser Closed");
    driver.quit()
}
initiate()
.then (title)
.then (presence)
.then (closeBrowser);