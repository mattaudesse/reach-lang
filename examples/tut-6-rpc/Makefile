REACH = ../../reach

.PHONY: clean
clean:
	rm -rf server/build/*.main.mjs

server/build/%.main.mjs: server/%.rsh
	$(REACH) compile $^ main

.PHONY: build
build: server/build/index.main.mjs
	cd server    && docker build -f Dockerfile --tag=reachsh/reach-app-tut-6-rpc-server:latest    .
	cd client-js && docker build -f Dockerfile --tag=reachsh/reach-app-tut-6-rpc-client-js:latest .
	cd client-py && docker build -f Dockerfile --tag=reachsh/reach-app-tut-6-rpc-client-py:latest .

.PHONY: run
run: build
	docker-compose -f "docker-compose.yml" up --remove-orphans reach-app-tut-6-rpc-server reach-app-tut-6-rpc
