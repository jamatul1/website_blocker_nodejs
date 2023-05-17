
# Websites Blocker Using Node.js

A Simple Node.js API that blocks and unblocks Websites from the operating system. Works in all browsers 👌.




## Platform

- Windows
- Mac
- Linux



## Documentation

```
### Methods

addSites(...sites) 
input -> takes strings which are separated using ,
         examples: addSites('www.facebook.com','www.google.com')
job -> it processes websites which will be later block or unblock

blockSites() 
input -> none - no parameter
job -> it will blocks all the websites that has been added using addSites method

blockSite(site) 
input -> site - type String 
         Example: blockSite('www.google.com')
job -> it will block the site given in the input

unBlockSite(site) 
input -> site - type String
         Example: unBlockSite('www.google.com')
job -> it will unblock the site given in the input

unBlockSites()
input -> none - no parameter
         Example: unBlockSites()
job -> it will unBlocks all the websites that has been blocked


### How to use it:

write those codes in the app.js 

// first create the siteBlcoker object using class SiteBlocker
let siteBlocker = new SiteBlocker()

// now add the sites that you want to blocks
siteBlocker.addSites('www.facebook.com', 'www.pornhub.com')
// now blocks them
siteBlocker.blockSites()

// you can use other methods for your purpose


// now open the command prompt in administration mode
// write commnand - node [scriptlocation]/app.js
example: 
node C:\Users\jamat\OneDrive\Desktop\website_blocker\app.js
```


## License

[MIT](https://choosealicense.com/licenses/mit/)

