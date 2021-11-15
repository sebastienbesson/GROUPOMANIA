

class ConnectForm extends Component {

    handleFormSubmit(e) {
      e.preventDefault();
  
      console.log("FORM SUBMIT!");
  
    }
  
    render() {
      return (
        <div className="gpm-connectFrom">
          <Panel>
            <Form horizontal className="LoginForm" id="loginForm">
              <FormGroup controlId="formEmail">
                <FormControl type="email" placeholder="Email Address" />
              </FormGroup>
              <FormGroup controlId="formPassword">
                <FormControl type="password" placeholder="Password" />
              </FormGroup>
              <FormGroup style={buttonStyle} controlId="formSubmit">
                <Button bsStyle="primary" type="submit" onClick={this.handleFormSubmit}>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </Panel>
        </div>
      )
    }
  }
  
  export default ConnectForm;