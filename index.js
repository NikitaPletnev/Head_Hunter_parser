const {Builder,By, Key, until} = require("selenium-webdriver");
const excel = require('excel4node');
const workbook = new excel.Workbook();
const worksheet = workbook.addWorksheet('Resume Links');

async function HRHelper(){

  let driver  = await new Builder().forBrowser("firefox").build();
  await driver.get("https://hh.ru/search/resume?L_is_autosearch=false&age_from=18&age_to=30&area=1&clusters=true&exp_period=all_time&experience=between1And3&items_on_page=100&label=only_with_age&language=eng.b2&logic=normal&no_magic=false&order_by=relevance&pos=full_text&text=Analyst+Developer&page=7");

 setTimeout(function () {
        driver.findElement(By.className("HH-Supernova-RegionClarification-Confirm")).click();
    }, 2000);

setTimeout(function(){
    driver.findElement(By.partialLinkText("Войти")).click();
},3000);

setTimeout(function(){
    driver.findElement(By.name("username")).sendKeys("");
},4500);
setTimeout(function(){
    driver.findElement(By.name("password")).sendKeys("" ,Key.RETURN);
},4700);

setTimeout(function InvitePeople(){
    driver.findElements(By.className("blok-link bloko-link_dimmed"))
    .then(found => {       
            let ticker = 0;
                let interval = setInterval(function(){
                    if(ticker == found.length){
                        clearInterval(interval);
                    }else{ 
                    found[ticker].sendKeys(Key.CONTROL,Key.RETURN);          
                    found[ticker].getAttribute("href").then(data => {
                    worksheet.cell(ticker+1,1).string(data);
                    workbook.write('links.xlsx'); 
                   ticker++;
                  });  
                }
         },3000) 
    });
    
},28800);

setTimeout(function(){
        driver.getAllWindowHandles().then(handles => {
            let tic = 1;
           let intervalId = setInterval(function(){
               if(tic == handles.length){
               clearInterval(intervalId)
               }else{
                      driver.switchTo().window(handles[tic]);
                        setTimeout(() => {
                            driver.findElement(By.className("bloko-custom-select__select")).click();
                            setTimeout(() => {
                                driver.findElement(By.className("Bloko-CustomSelect-Search")).sendKeys("Analyst Developer",Key.RETURN); 
                            },1000) 
                        },2500)
                        setTimeout(() => {
                            driver.findElement(By.className("bloko-button bloko-button_primary HH-ChangeTopicForm-Submit HH-Form-SubmitButton")).click();
                        },6000)
                     tic++;
                    }
           },10000);
        });
},340000);

setTimeout(() => {
    driver.quit()
},1380000)

}

HRHelper();


