import { expect } from "chai"
import {
  initializeTestDb,
  insertTestUser,
  getToken
} from "./helper/test.js"

// Tests for the basic task API functionality
describe("Testing basic database functionality", () => {
  let token = null

  const testUser = {
    email: "foo@foo.com",
    password: "password123"
  }

  // Reset the test database and create a JWT token
  // before running the task tests
  before(async () => {
    await initializeTestDb()
    token = getToken(testUser.email)
  })

  // Test that all tasks can be retrieved
  it("should get all tasks", async () => {
    const response = await fetch("http://localhost:3001/tasks")
    const data = await response.json()

    expect(response.status).to.equal(200)
    expect(data).to.be.an("array").that.is.not.empty
    expect(data[0]).to.include.all.keys(["id", "description"])
  })

  // Test creating a new task using an authenticated request
  it("should create a new task", async () => {
    const newTask = { description: "Test task" }

    const response = await fetch("http://localhost:3001/tasks", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ task: newTask })
    })

    const data = await response.json()

    expect(response.status).to.equal(201)
    expect(data).to.include.all.keys(["id", "description"])
    expect(data.description).to.equal(newTask.description)
  })

  // Test deleting a task using an authenticated request
  it("should delete task", async () => {
    const response = await fetch("http://localhost:3001/tasks/1", {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    expect(response.status).to.equal(200)
    expect(data).to.include.all.keys("id")
  })

  // Test validation by trying to create a task without a description
  it("should not create a new task without description", async () => {
    const response = await fetch("http://localhost:3001/tasks", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ task: null })
    })

    const data = await response.json()

    expect(response.status).to.equal(400)
    expect(data).to.include.all.keys("error")
  })
})

// Tests for user registration and authentication
describe("Testing user management", () => {
  const user = {
    email: "foo2@test.com",
    password: "password123"
  }

  // Insert a test user before running the authentication tests
  before(async () => {
    await insertTestUser(user)
  })

  // Test registering a new user
  it("should sign up", async () => {
    const newUser = {
      email: "foo@test.com",
      password: "password123"
    }

    const response = await fetch("http://localhost:3001/users/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: newUser })
    })

    const data = await response.json()

    expect(response.status).to.equal(201)
    expect(data).to.include.all.keys(["id", "email"])
    expect(data.email).to.equal(newUser.email)
  })

  // Test login with valid credentials
  it("should log in", async () => {
    const response = await fetch("http://localhost:3001/users/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user })
    })

    const data = await response.json()

    expect(response.status).to.equal(200)
    expect(data).to.include.all.keys(["id", "email", "token"])
    expect(data.email).to.equal(user.email)
  })

  // Test that login fails when the password is incorrect
  it("should not log in with wrong password", async () => {
    const wrongUser = {
      email: user.email,
      password: "wrongpassword"
    }

    const response = await fetch("http://localhost:3001/users/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: wrongUser })
    })

    const data = await response.json()

    expect(response.status).to.equal(401)
    expect(data).to.include.all.keys("error")
  })
})