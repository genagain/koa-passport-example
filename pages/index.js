import 'react'

const Index = () => (
  <form action="/login" method="post">
    <p>
      <label>Username:
        <input type="text" name="username" value="test" />
      </label>
    </p>
    <p>
      <label>Password:
        <input type="password" name="password" value="test" />
      </label>
    </p>
    <p>
      <button type="submit">Log In</button>
    </p>
  </form>
)

export default Index
