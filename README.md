## CORS Proxy

#IMPORTANT!!!
``` 
You can use it for simple api requests dont use it for real websites it cannot 
work well as you think.
```

This simple Node.js-based proxy allows your JavaScript application to call services that are hosted on a different domain and that don't support [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing). 

## Installation

There are different options to get your own instance of the CORS proxy up and running:

1. Deploy to Heroku (easiest): click the 'Deploy to Heroku' button at the top of this page

1. Install a local version
    - Clone this repository
    - Install the server dependencies
    
        ```
        npm install
        ```
    
    - Start the server
         
         ```
         node server
         ```

## Usage

When making an API call :

1. Substitute the actual service URL with the Proxy URL 

1. Set the request method, query parameters, and body as usual

1. Set the actual service URL in a query named 'url'

1. Send the request as usual