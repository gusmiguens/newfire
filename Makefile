ifeq ($(APP_ENV), stg)
-include .env.stg
export
endif

ifeq ($(APP_ENV),)
APP_ENV := dev
endif

.PHONY: clean
clean: ## Removes node modules for fresh install
	rm -rf node_modules/

.PHONY: install
install: ## Installs all npm packages 
	npm install

.PHONY: open
open: ## Opens the cypress UI with the provided APP_ENV environment
	npx cypress open

.PHONY: run
run: ## Runs Cypress tests headless with the provided APP_ENV environment
	npx cypress run ; npm run test:mochawesome
