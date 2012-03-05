VERSION = "0.6.1"
PRIMARY_ADAPTER = "dom"
SECONDARY_ADAPTER = "window-name"

default: clean build test
release: clean build min

clean: 
	rm -rf ./lib
	rm -rf ./test/lib/deckchair*

build:
	# generates ./lib/deckchair.js with dom and window-name adapters by default
	mkdir -p ./lib && touch ./lib/deckchair-$(VERSION).js
	cat ./src/deckchair.js > ./lib/deckchair-$(VERSION).js
	cat ./src/adapters/$(PRIMARY_ADAPTER).js >> ./lib/deckchair-$(VERSION).js
	cat ./src/adapters/$(SECONDARY_ADAPTER).js >> ./lib/deckchair-$(VERSION).js
	cp ./lib/deckchair-$(VERSION).js ./lib/deckchair.js # copied for tests in site
	# plugins business	
	cp ./src/plugins/aggregation.js ./lib/deckchair-aggregation-$(VERSION).js
	cp ./src/plugins/callbacks.js   ./lib/deckchair-callbacks-$(VERSION).js
	cp ./src/plugins/pagination.js  ./lib/deckchair-pagination-$(VERSION).js
	cp ./src/plugins/query.js       ./lib/deckchair-query-$(VERSION).js
	# copy plugins in clean for tests,,, 
	cp ./lib/deckchair-aggregation-$(VERSION).js ./lib/deckchair-aggregation.js
	cp ./lib/deckchair-callbacks-$(VERSION).js ./lib/deckchair-callbacks.js
	cp ./lib/deckchair-pagination-$(VERSION).js ./lib/deckchair-pagination.js
	cp ./lib/deckchair-query-$(VERSION).js ./lib/deckchair-query.js
	# build adapters 
	cp ./src/adapters/blackberry-persistent-storage.js ./lib/deckchair-adapter-blackberry-persistent-storage-$(VERSION).js
	cp ./src/adapters/gears-sqlite.js 				   ./lib/deckchair-adapter-gears-sqlite-$(VERSION).js
	cp ./src/adapters/ie-userdata.js                   ./lib/deckchair-adapter-ie-userdata-$(VERSION).js
	cp ./src/adapters/indexed-db.js                    ./lib/deckchair-adapter-indexed-db-$(VERSION).js
	cp ./src/adapters/webkit-sqlite.js                 ./lib/deckchair-adapter-webkit-sqlite-$(VERSION).js
	# copy in adaptors for testing...
	cp ./src/adapters/blackberry-persistent-storage.js ./lib/deckchair-adapter-blackberry-persistent-storage.js
	cp ./src/adapters/gears-sqlite.js 				   ./lib/deckchair-adapter-gears-sqlite.js
	cp ./src/adapters/ie-userdata.js                   ./lib/deckchair-adapter-ie-userdata.js
	cp ./src/adapters/indexed-db.js                    ./lib/deckchair-adapter-indexed-db.js
	cp ./src/adapters/webkit-sqlite.js                 ./lib/deckchair-adapter-webkit-sqlite.js


min:
	java -jar ./util/compiler.jar --js ./lib/deckchair-$(VERSION).js > ./lib/deckchair-$(VERSION).min.js

test:
	cp ./lib/deckchair-$(VERSION).js ./test/lib/deckchair.js
	cp ./lib/deckchair-$(VERSION).js ./test/lib/deckchair-aggregation.js
	cp ./lib/deckchair-$(VERSION).js ./test/lib/deckchair-callbacks.js
	cp ./lib/deckchair-$(VERSION).js ./test/lib/deckchair-pagination.js
	cp ./lib/deckchair-$(VERSION).js ./test/lib/deckchair-query.js
	
	cat ./src/plugins/aggregation.js >> ./test/lib/deckchair-aggregation.js
	cat ./src/plugins/callbacks.js 	 >> ./test/lib/deckchair-callbacks.js
	cat ./src/plugins/pagination.js  >> ./test/lib/deckchair-pagination.js
	cat ./src/plugins/query.js 		 >> ./test/lib/deckchair-query.js
	
	open ./test/index.html
	#open ./test/plugin/aggregation.html
	#open ./test/plugin/callbacks.html
	#open ./test/plugin/pagination.html
	#open ./test/plugin/query.html

doc:
	./util/build-docs

.PHONY: clean build min test doc
