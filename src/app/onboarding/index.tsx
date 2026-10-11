import { useRouter } from 'expo-router';
import { useState } from 'react';

import { AboutYouStep } from '@/components/onboarding/AboutYouStep';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { YourFitStep1 } from '@/components/onboarding/YourFitStep1';
import { YourFitStep2 } from '@/components/onboarding/YourFitStep2';
import { YourFitStep3 } from '@/components/onboarding/YourFitStep3';

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [onboardingData, setOnboardingData] = useState({});

  const handleNextStep = (stepData: any) => {
    setOnboardingData(prev => ({ ...prev, ...stepData }));
    
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      router.replace('/');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      router.back();
    }
  };

  let StepComponent;
  let stepTitle = '';

  switch (currentStep) {
    case 1:
      StepComponent = <AboutYouStep onContinue={handleNextStep} />;
      stepTitle = 'About You';
      break;
    case 2:
      StepComponent = <YourFitStep1 onContinue={handleNextStep} />;
      stepTitle = 'Your fit (1/3)';
      break;
    case 3:
      StepComponent = <YourFitStep2 onContinue={handleNextStep} />;
      stepTitle = 'Your fit (2/3)';
      break;
    case 4:
      StepComponent = <YourFitStep3 onContinue={handleNextStep} />;
      stepTitle = 'Your fit (3/3)';
      break;
    default:
      StepComponent = <AboutYouStep onContinue={handleNextStep} />;
      stepTitle = 'About You';
  }

  return (
    <OnboardingLayout 
      currentStep={currentStep} 
      totalSteps={totalSteps} 
      stepTitle={stepTitle}
      onBack={handleBack}
    >
      {StepComponent}
    </OnboardingLayout>
  );
}

