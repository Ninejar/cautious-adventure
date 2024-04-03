const {describe, test, it, before, after} = require("node:test")
const assert = require("node:assert")
const path = require("path")
const fs = require("fs")
const dotenv = require("dotenv")
const mongo = require("mongodb")

const compose = require("docker-compose/dist/v2")

before(()=>{
    
})

describe("Integration tests for our server, GET", async()=> {
    it("should return 5 journal entries", async()=>{
        
    })
})