import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card} from 'material-ui/Card';

const cardStyle = {
  width: '100%', 
  maxWidth: 700,
  margin: '5em auto',
  padding:20,
  h1:{
    marginBottom: 0,
  }
}

class HorizontalNonLinearStepper extends React.Component {

  state = {
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleSignUp = () => {
    
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
            <div>
            This React App is built with Firebase and styled by Material UI. I use the latest version of React to better explore all the new features. The main node packages are <strong>React 16, React Router 4, Firebase 4</strong>.
            </div>)
      case 1:
        return (
        <div>
          <p>This project is mainly focusing on user authentication. Only authorized users are allowed to visit Home and Account page, otherwise anonymous users will be redirect to Sign In page.</p>
          <p>There’s a list of users shown on the Home page which fetches data from a real-time database provided by Firebase. Any new users will be updated to the page without refreshing.</p>
      </div>);
      case 2:
        return (
          <div>
            <p>When user sign up, they will be asked to choose a role. This is another feature I will add in the future, that is to show different page based on user’s role. </p>
            <p>At this stage, users are allowed to update their password in the account page and view a real-time list of users shown on the home page. Click <strong>start button</strong> to have a try!</p>
        </div>);
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const {stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <Card style={cardStyle}>
      <h1 style={ {textAlign: 'center'} }>Welcome to My React App</h1>
        <Stepper linear={false} activeStep={stepIndex}>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 0})}>
              React App &amp; Material UI
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 1})}>
              User Authentication
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 2})}>
              Have A Try
            </StepButton>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          <p>{this.getStepContent(stepIndex)}</p>
          <div style={{marginTop: '2em', textAlign: 'center',}}>
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onClick={this.handlePrev}
              style={{marginRight: 12}}
            />
            { stepIndex === 2 ? 
            <Link to={routes.SIGN_UP}>
            <RaisedButton
              label="Start"
              primary={true}
            /></Link> 
            :
            <RaisedButton
            label="Next"
            primary={true}
            onClick={this.handleNext}
          />
            }
          </div>
        </div>
      </Card>
    );
  }
}

export default HorizontalNonLinearStepper;