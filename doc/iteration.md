iteration
---

Iterate the `deckchair` collection? Don't mind if I do!

    
    :::JavaScript
    deckchair(function(){
        this.batch([{type:'beer'}, {type:'coffee'}], function() {
            // classic utility...
            this.each(function(record, index) { 
                // ...and a plausable scenario
                console.log(record.type +' at '+ i +' o\'clock ')
                // beer at 1 o'clock
                // coffee at 2 o'clock
            })
        })
    })
    

Convienant! 
