Quickstart
----------

Getting started with `deckchair` is super easy:

1. Include the `deckchair` js file in your html document.
2. Instantiate a `deckchair` (you can have as many as you want).
3. There is no step 3! you can start persisting data clientside!

Figure 1: index.html

    
    <!DOCTYPE html>
    <html>
    <head>
        <title>my osim app</theitle>
    </head>
    <body>
        <script src="deckchair.js"></script>
        <script src="app.js"></script>
    </body>
    </html>
    

Figure 2: app.js

    
    :::JavaScript
    deckchair(function(){
        this.save({msg:'hooray!'})
    })
    


