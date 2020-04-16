import React from "react";
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Job from "./Job";

export default function Jobs({jobs}) {
  const numJobs = jobs.length;
  const numPages = Math.ceil(numJobs / 50);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isVisible = {
    display: numPages ? 'flex' : 'none'
  };

  console.log('job is', jobs[0]);

  return(
    <div className="jobs">
      <Typography variant="h4" component="h1">
        Entry Level Software Jobs
      </Typography>
      <Typography variant="h6" component="h2">
        {numJobs === 0 ? 'Jobs not found' : `Found ${numJobs} Jobs`}
      </Typography>
      {
        jobs.map(
          job => <Job job={job} />
        )
      }
      <div style={isVisible}>
        Page {activeStep + 1} of {numPages}
      </div>
      <MobileStepper
        style={isVisible}
        variant="progress"
        steps={numPages}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === numPages-1}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  )
}
