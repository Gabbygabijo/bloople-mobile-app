import { useRouter } from 'expo-router';
import { useState } from 'react';

import { FitDnaDraft, toFitDnaDraft } from '@/api/bloople';
import { AboutYouStep } from '@/components/onboarding/AboutYouStep';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { YourFitStep1 } from '@/components/onboarding/YourFitStep1';
import { YourFitStep2 } from '@/components/onboarding/YourFitStep2';
import { YourFitStep3 } from '@/components/onboarding/YourFitStep3';
import { YourLifestyleStep1 } from '@/components/onboarding/YourLifestyleStep1';
import { YourLifestyleStep2 } from '@/components/onboarding/YourLifestyleStep2';
import { YourLifestyleStep3 } from '@/components/onboarding/YourLifestyleStep3';
import { YourLifestyleStep4 } from '@/components/onboarding/YourLifestyleStep4';
import { YourStyleStep1 } from '@/components/onboarding/YourStyleStep1';
import { YourStyleStep2 } from '@/components/onboarding/YourStyleStep2';
import { YourStyleStep3 } from '@/components/onboarding/YourStyleStep3';
import { useBloopleApi } from '@/state/BloopleApiContext';

const isUncertainAboutSize = (status?: string) => status === "I'm not sure" || status === "I've never been properly fitted";

export default function OnboardingScreen() {
  const router = useRouter();
  const { profile, saveFitDna } = useBloopleApi();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [onboardingData, setOnboardingData] = useState<Record<string, any>>(() => (profile ? toFitDnaDraft(profile) : {}));
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isSkippingSize =
    onboardingData.skippedSize || isUncertainAboutSize(onboardingData.fitStatus);

  const handleNextStep = async (stepData: any) => {
    const nextData = { ...onboardingData, ...stepData };
    setOnboardingData(nextData);
    setSubmitError(null);

    const shouldSkipSize =
      stepData?.skippedSize || isUncertainAboutSize(stepData?.fitStatus);

    if (currentStep === 2 && shouldSkipSize) {
      setCurrentStep(4);
    } else if (currentStep < 11) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsSaving(true);
      try {
        await saveFitDna(nextData as FitDnaDraft);
        router.replace('/(tabs)');
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'Could not save your Fit-DNA. Please try again.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 4 && isSkippingSize) {
      setCurrentStep(2);
    } else if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      router.back();
    }
  };

  let StepComponent;
  let stepTitle = '';
  let progressStep = 1;

  switch (currentStep) {
    case 1:
      StepComponent = <AboutYouStep onContinue={handleNextStep} />;
      stepTitle = 'About You';
      progressStep = 1;
      break;
    case 2:
      StepComponent = (
        <YourFitStep1
          onContinue={handleNextStep}
          initialSelection={onboardingData.fitStatus}
        />
      );
      stepTitle = isSkippingSize ? 'Your fit (1/2)' : 'Your fit (1/3)';
      progressStep = 2;
      break;
    case 3:
      StepComponent = <YourFitStep2 onContinue={handleNextStep} />;
      stepTitle = 'Your fit (2/3)';
      progressStep = 2;
      break;
    case 4:
      StepComponent = <YourFitStep3 onContinue={handleNextStep} />;
      stepTitle = isSkippingSize ? 'Your fit (2/2)' : 'Your fit (3/3)';
      progressStep = 2;
      break;
    case 5:
      StepComponent = (
        <YourLifestyleStep1
          onContinue={handleNextStep}
          initialSelections={onboardingData.biggestStruggles}
        />
      );
      stepTitle = 'Your lifestyle (1/4)';
      progressStep = 3;
      break;
    case 6:
      StepComponent = (
        <YourLifestyleStep2
          onContinue={handleNextStep}
          initialSelections={onboardingData.shoppingCategories}
        />
      );
      stepTitle = 'Your lifestyle (2/4)';
      progressStep = 3;
      break;
    case 7:
      StepComponent = (
        <YourLifestyleStep3
          onContinue={handleNextStep}
          initialSelections={onboardingData.clothesWorkFor}
        />
      );
      stepTitle = 'Your lifestyle (3/4)';
      progressStep = 3;
      break;
    case 8:
      StepComponent = (
        <YourLifestyleStep4
          onContinue={handleNextStep}
          initialSelections={onboardingData.mattersMost}
        />
      );
      stepTitle = 'Your lifestyle (4/4)';
      progressStep = 3;
      break;
    case 9:
      StepComponent = (
        <YourStyleStep1
          onContinue={handleNextStep}
          initialSelections={onboardingData.preferredStyles}
        />
      );
      stepTitle = 'Your style (1/3)';
      progressStep = 4;
      break;
    case 10:
      StepComponent = (
        <YourStyleStep2
          onContinue={handleNextStep}
          initialSelections={onboardingData.braStyles}
        />
      );
      stepTitle = 'Your style (2/3)';
      progressStep = 4;
      break;
    case 11:
      StepComponent = (
        <YourStyleStep3
          onContinue={handleNextStep}
          initialSelection={onboardingData.pricePreference}
        />
      );
      stepTitle = 'Your style (3/3)';
      progressStep = 4;
      break;
    default:
      StepComponent = <AboutYouStep onContinue={handleNextStep} />;
      stepTitle = 'About You';
      progressStep = 1;
  }

  return (
    <OnboardingLayout 
      currentStep={currentStep} 
      totalSteps={totalSteps} 
      stepTitle={stepTitle}
      progressStep={progressStep}
      onBack={handleBack}
    >
      {StepComponent}
    </OnboardingLayout>
  );
}
